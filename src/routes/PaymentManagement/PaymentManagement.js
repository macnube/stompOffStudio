import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import MUIDataTable from 'mui-datatables';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

import {
    ContentToolbar,
    SelectedDeleteToolbar,
    PaymentDialog,
} from 'components';
import PaymentManagementStudentSelectDialog from './PaymentManagementStudentSelectDialog';
import { PAYMENT_TYPE } from 'constants/gql';
import { parsePaymentsToTableData } from './parse';

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
            payment,
        } = this.state;
        const options = {
            responsive: 'scroll',
            customToolbarSelect: this.renderSelectedToolbar,
            onRowClick: this.handleOnPaymentClick,
        };
        console.log('student is: ', student);
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
    updatePayment: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(PaymentManagement);
