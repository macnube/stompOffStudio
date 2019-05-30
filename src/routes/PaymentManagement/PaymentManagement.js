import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import reduce from 'lodash/reduce';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import {
    ContentToolbar,
    SelectedDeleteToolbar,
    PaymentDialog,
} from 'src/components';
import PaymentManagementStudentSelectDialog from './PaymentManagementStudentSelectDialog';
import { PAYMENT_TYPE } from 'src/constants/gql';

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

const parsePaymentsToTableData = payments =>
    reduce(
        payments,
        (acc, payment) => {
            const linkedToCard = payment.card ? 'True' : 'False';
            const result = [
                payment.id,
                payment.student.name,
                payment.amount,
                format(parseISO(payment.date), 'MMM do, yyyy'),
                payment.type,
                linkedToCard,
            ];
            acc.push(result);
            return acc;
        },
        []
    );

class PaymentManagement extends Component {
    state = {
        openStudentSelectDialog: false,
        openPaymentDialog: false,
        selectedPaymentId: null,
        student: null,
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
        });
    };

    handleStudentSelect = student => {
        this.setState({
            student,
            openStudentSelectDialog: false,
            openPaymentDialog: true,
        });
    };

    handlePaymentClick = rowData => {
        this.setState({
            selectedPaymentId: rowData[0],
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

    renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={this.handleOnDeletePress}
        />
    );

    render() {
        const { payments } = this.props;
        const {
            openStudentSelectDialog,
            openPaymentDialog,
            student,
        } = this.state;
        const options = {
            responsive: 'scroll',
            onRowClick: this.handlePaymentClick,
            customToolbarSelect: this.renderSelectedToolbar,
        };
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
                {student ? (
                    <PaymentDialog
                        open={openPaymentDialog}
                        handleCreate={this.handleCreate}
                        handleClearBonus={this.handleClearBonus}
                        handleClose={this.handleClose}
                        student={student}
                    />
                ) : null}
                <MUIDataTable
                    title={'Payments'}
                    data={parsePaymentsToTableData(payments)}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

PaymentManagement.propTypes = {
    payments: PropTypes.array.isRequired,
    deletePayment: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(PaymentManagement);
