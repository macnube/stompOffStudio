import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import forEach from 'lodash/forEach';
import find from 'lodash/find';

import { CustomAddToolbar, SelectedDeleteToolbar, FlatTable } from 'components';
import StudentDetailPaymentDialog from './StudentDetailPaymentDialog';
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
    open,
    handleAdd,
    deletePayment,
    unpayCard,
    createPayment,
    payCard,
    handleClose,
    clearReferralBonus,
}) => {
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

    const handleClearBonus = id => {
        clearReferralBonus({
            variables: {
                id,
            },
        });
    };

    const renderSelectedToolbar = (selectedRows, displayData) => (
        <SelectedDeleteToolbar
            selectedRows={selectedRows}
            displayData={displayData}
            handleOnDeletePress={handleOnDeletePress}
        />
    );

    const renderToolbar = () => (
        <CustomAddToolbar title={'Add Payment'} handleAddPress={handleAdd} />
    );

    const options = {
        responsive: 'scroll',
        customToolbar: renderToolbar,
        customToolbarSelect: renderSelectedToolbar,
    };
    return (
        <Fragment>
            <FlatTable
                title={'Payments'}
                data={parsePaymentsToTableData(student.payments)}
                columns={columns}
                options={options}
            />
            <StudentDetailPaymentDialog
                open={open}
                handleCreate={handleCreatePayment}
                handleClearBonus={handleClearBonus}
                handleClose={handleClose}
                student={student}
            />
        </Fragment>
    );
};

PaymentsTable.propTypes = {
    student: PropTypes.object.isRequired,
    handleAdd: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    clearReferralBonus: PropTypes.func.isRequired,
    createPayment: PropTypes.func.isRequired,
    deletePayment: PropTypes.func.isRequired,
    payCard: PropTypes.func.isRequired,
    unpayCard: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default React.memo(PaymentsTable);
