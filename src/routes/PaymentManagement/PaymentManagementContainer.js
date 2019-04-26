import React from 'react';
import { Redirect } from 'react-router-dom';
import filter from 'lodash/filter';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_PAYMENTS, DELETE_PAYMENT, CREATE_PAYMENT } from './graphql';
import PaymentManagement from './PaymentManagement';

const getPayments = ({ render }) => (
    <Query query={GET_PAYMENTS}>{render}</Query>
);

//To-do: Figure out how to update card status so that you can add a payment again
//to it.
const deletePayment = ({ render }) => (
    <Mutation
        mutation={DELETE_PAYMENT}
        update={(cache, { data: { deletePayment } }) => {
            const { payments } = cache.readQuery({ query: GET_PAYMENTS });
            cache.writeQuery({
                query: GET_PAYMENTS,
                data: {
                    payments: filter(
                        payments,
                        payment => payment.id !== deletePayment.id
                    ),
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createPayment = ({ render }) => (
    <Mutation
        mutation={CREATE_PAYMENT}
        update={(cache, { data: { createPayment } }) => {
            const { payments } = cache.readQuery({ query: GET_PAYMENTS });
            cache.writeQuery({
                query: GET_PAYMENTS,
                data: { payments: payments.concat([createPayment]) },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getPayments,
    deletePayment,
    createPayment,
};

const PaymentManagementContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getPayments: { data, loading, error },
            deletePayment: { mutation: deletePaymentMutation },
            createPayment: {
                mutation: createPaymentMutation,
                result: createPaymentResult,
            },
        }) => {
            if (loading) return null;
            if (error) return `Error: ${error}`;
            if (!data.payments) return `404: Session not found`;
            // if (createPaymentResult.data) {
            //     return (
            //         <Redirect
            //             to={{
            //                 pathname: '/studioDetail',
            //                 search: `id=${
            //                     createPaymentResult.data.createPayment.id
            //                 }`,
            //             }}
            //         />
            //     );
            // }

            return (
                <PaymentManagement
                    payments={data.payments}
                    deletePayment={deletePaymentMutation}
                    createPayment={createPaymentMutation}
                />
            );
        }}
    </Adopt>
);

export default PaymentManagementContainer;
