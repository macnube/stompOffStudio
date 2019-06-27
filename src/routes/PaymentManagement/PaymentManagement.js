import React, { Component, Fragment } from 'react';
import compose from 'recompose/compose';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import {
    ContentToolbar,
    SelectedDeleteToolbar,
    PaymentDialog,
} from 'components';
import PaymentManagementStudentSelectDialog from './PaymentManagementStudentSelectDialog';
import { PAYMENT_TYPE } from 'constants/gql';
import {
    parsePaymentsToTableData,
    parsePaymentsToChartData,
    getTotalFromPayments,
} from './parse';
import Chart from './Chart';
import ChartSelector from './ChartSelector';
import styles from './styles';
import { getCurrentYear } from 'utils/date';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Student Name',
    },
    {
        name: 'Amount',
    },
    {
        name: 'Date',
    },
    {
        name: 'Type',
    },
    {
        name: 'Linked to Card',
    },
];

class PaymentManagement extends Component {
    state = {
        openStudentSelectDialog: false,
        openPaymentDialog: false,
        student: null,
        payment: null,
        year: getCurrentYear(),
    };

    handleClickOpen = () => {
        this.setState({ openStudentSelectDialog: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({
            openStudentSelectDialog: false,
            openPaymentDialog: false,
            student: null,
            payment: null,
        });
    };

    handleStudentSelect = student => {
        this.setState({
            student,
            openStudentSelectDialog: false,
            openPaymentDialog: true,
        });
    };

    handleCreate = payment => {
        const { createPayment, payCard } = this.props;
        createPayment({ variables: { ...payment } });
        if (payment.type === PAYMENT_TYPE.CARD && payment.cardId) {
            payCard({
                variables: {
                    id: payment.cardId,
                },
            });
        }
        this.handleClose();
    };

    handleUpdate = payment => {
        const { updatePayment, payCard } = this.props;
        updatePayment({ variables: { ...payment } });
        if (payment.type === PAYMENT_TYPE.CARD && payment.cardId) {
            payCard({
                variables: {
                    id: payment.cardId,
                },
            });
        }
        this.handleClose();
    };

    handleOnDeletePress = ids => {
        const { deletePayment, payments, unpayCard } = this.props;

        forEach(ids, id => {
            const payment = find(payments, { id });
            deletePayment({ variables: { id } });
            if (payment.card) {
                unpayCard({
                    variables: { id: payment.card.id },
                });
            }
        });
    };

    handleClearBonus = id => {
        const { clearReferralBonus } = this.props;
        clearReferralBonus({
            variables: {
                id,
            },
        });
    };

    handleOnPaymentClick = rowData => {
        const payment = find(this.props.payments, { id: rowData[0] });
        this.setState({
            openPaymentDialog: true,
            payment,
        });
    };
    handleOnChangeYear = event => {
        this.setState({
            year: event.target.value,
        });
    };

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
        />
    );

    render() {
        const { payments, classes } = this.props;
        const {
            openStudentSelectDialog,
            openPaymentDialog,
            student,
            payment,
            year,
        } = this.state;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: this.renderSelectedToolbar,
            onRowClick: this.handleOnPaymentClick,
        };
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        return (
            <Fragment>
                <ContentToolbar>
                    <Fab
                        color="primary"
                        aria-label="Add"
                        onClick={this.handleClickOpen}
                    >
                        <AddIcon />
                    </Fab>
                </ContentToolbar>
                <PaymentManagementStudentSelectDialog
                    open={openStudentSelectDialog}
                    handleStudentSelect={this.handleStudentSelect}
                />
                {student || payment ? (
                    <PaymentDialog
                        open={openPaymentDialog}
                        handleCreate={this.handleCreate}
                        handleUpdate={this.handleUpdate}
                        handleClearBonus={this.handleClearBonus}
                        handleClose={this.handleClose}
                        student={student || payment.student}
                        payment={payment}
                    />
                ) : null}

                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/* Chart Selection*/}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <ChartSelector
                                    total={getTotalFromPayments(payments, year)}
                                    handleOnChangeYear={this.handleOnChangeYear}
                                    year={year}
                                />
                            </Paper>
                        </Grid>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Chart
                                    data={parsePaymentsToChartData(
                                        payments,
                                        year
                                    )}
                                    year={year}
                                />
                            </Paper>
                        </Grid>

                        {/* Payments Table */}
                        <Grid item xs={12}>
                            <MUIDataTable
                                title={'Payments'}
                                data={parsePaymentsToTableData(payments)}
                                columns={columns}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

PaymentManagement.propTypes = {
    payments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
    deletePayment: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    updatePayment: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default compose(
    withRouter,
    withStyles(styles)
)(PaymentManagement);
