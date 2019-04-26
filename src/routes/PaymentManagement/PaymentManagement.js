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

import { ContentToolbar, SelectedDeleteToolbar } from 'components';
import PaymentDialog from './PaymentDialog';

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

class StudioManagement extends Component {
    state = {
        open: false,
        selectedPaymentId: null,
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        this.setState({ open: false });
    };

    handlePaymentClick = rowData => {
        this.setState({ selectedPaymentId: rowData[0], open: true });
    };

    handleCreate = payment => {
        this.props.createPayment({ variables: { ...payment } });
        this.handleClose();
    };

    //Having to delete each studio individually because prisma has a bug
    //where cascading deletes don't work for deleteMany
    //https://github.com/prisma/prisma/issues/3587
    handleOnDeletePress = ids => {
        const { deletePayment } = this.props;

        forEach(ids, id => {
            deletePayment({ variables: { id } });
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
        const { open, selectedPaymentId } = this.state;
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
                <PaymentDialog
                    open={open}
                    payment={find(payments, { id: selectedPaymentId })}
                    handleClose={this.handleClose}
                    handleCreate={this.handleCreate}
                />
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

StudioManagement.propTypes = {
    payments: PropTypes.array.isRequired,
    deletePayment: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
};

export default withRouter(StudioManagement);
