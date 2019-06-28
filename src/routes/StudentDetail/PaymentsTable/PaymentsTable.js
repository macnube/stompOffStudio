import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import MUIDataTable from 'mui-datatables';

import {
    CustomAddToolbar,
    SelectedDeleteToolbar,
    PaymentDialog,
} from 'components';
import { parsePaymentsToTableData } from '../parse';
import { PAYMENT_TYPE } from 'constants/gql';

const columns = [
    {
        name: 'ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'CARD_ID',
        options: {
            display: 'false',
        },
    },
    {
        name: 'Amount',
    },
    {
        name: 'Payment Date',
    },
    {
        name: 'Reason',
    },
];

const PaymentsTable = ({
    student,
    deletePayment,
    unpayCard,
    createPayment,
    updatePayment,
    payCard,
    clearReferralBonus,
}) => {
    const [open, setOpen] = useState(false);
    const [payment, setPayment] = useState(null);
    const handleOnDeletePress = ids => {
        forEach(ids, id => {
            deletePayment({
                variables: { id },
            });
            const card = find(student.cards, { payment: { id } });
            if (card) {
                unpayCard({
                    variables: {
                        id: card.id,
                    },
                });
            }
        });
    };

    const handleCreatePayment = payment => {
        createPayment({
            variables: {
                ...payment,
            },
        });
        if (payment.type === PAYMENT_TYPE.CARD && payment.cardId) {
            payCard({
                variables: {
                    id: payment.cardId,
                },
            });
        }

        handleClose();
    };

    const handleUpdatePayment = payment => {
        updatePayment({
            variables: {
                ...payment,
            },
        });

        if (payment.type === PAYMENT_TYPE.CARD && payment.cardId) {
            payCard({
                variables: {
                    id: payment.cardId,
                },
            });
        }

        handleClose();
    };

    const handleClearBonus = id => {
        clearReferralBonus({
            variables: {
                id,
            },
        });
    };

    const handleClose = onClose => {
        if (onClose) {
            onClose();
        }
        setOpen(false);
        setPayment(null);
    };

    const handleOnPaymentClick = rowData => {
        const payment = find(student.payments, { id: rowData[0] });
        setPayment({ ...payment, student });
        setOpen(true);
    };

    const handleOnAddClick = () => setOpen(true);

    const renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeletePress}
        />
    );

    const renderToolbar = () => (
        <CustomAddToolbar
            title={'Add Payment'}
            handleAddPress={handleOnAddClick}
        />
    );

    const options = {
        responsive: 'scroll',
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
        onRowClick: handleOnPaymentClick,
    };
    return (
        <Fragment>
            <MUIDataTable
                title={'Payments'}
                data={parsePaymentsToTableData(student.payments)}
                columns={columns}
                options={options}
            />
            <PaymentDialog
                open={open}
                handleCreate={handleCreatePayment}
                handleUpdate={handleUpdatePayment}
                handleClearBonus={handleClearBonus}
                handleClose={handleClose}
                student={student}
                payment={payment}
            />
        </Fragment>
    );
};

PaymentsTable.propTypes = {
    student: PropTypes.object.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    updatePayment: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
};

export default React.memo(PaymentsTable);
