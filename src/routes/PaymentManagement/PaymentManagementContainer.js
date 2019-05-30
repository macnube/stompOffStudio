import React from 'react';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_PAYMENTS, DELETE_PAYMENT, CREATE_PAYMENT } from './graphql';
import {
    GET_STUDENT,
    GET_CARD_FRAGMENT,
    UNPAY_CARD,
    PAY_CARD,
    CLEAR_REFERRAL_BONUS,
} from 'src/routes/StudentDetail/graphql';
import PaymentManagement from './PaymentManagement';

const getPayments = ({ render }) => (
    <Query query={GET_PAYMENTS}>{render}</Query>
);

export const deletePayment = ({ render }) => (
    <Mutation
        mutation={DELETE_PAYMENT}
        update={(cache, { data: { deletePayment } }) => {
            const { payments } = cache.readQuery({ query: GET_PAYMENTS });
            const payment = find(payments, { id: deletePayment.id });
            cache.writeQuery({
                query: GET_PAYMENTS,
                data: {
                    payments: filter(
                        payments,
                        payment => payment.id !== deletePayment.id
                    ),
                },
            });
            const { student } = cache.readQuery({
                query: GET_STUDENT,
                variables: { id: payment.student.id },
            });

            if (student) {
                let newStudent = {
                    ...student,
                    payments: filter(
                        student.payments,
                        payment => payment.id !== deletePayment.id
                    ),
                };
                if (payment.card) {
                    const card = find(student.cards, { id: payment.card.id });
                    const cards = filter(
                        student.cards,
                        card => card.id !== payment.card.id
                    );
                    const newCard = { ...card, payment: null, paid: false };
                    const newCards = cards.concat([newCard]);
                    newStudent = { ...newStudent, cards: newCards };
                }
                cache.writeQuery({
                    query: GET_STUDENT,
                    variables: { id: student.id },
                    data: {
                        student: newStudent,
                    },
                });
            }
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

export const createPayment = ({ render }) => (
    <Mutation
        mutation={CREATE_PAYMENT}
        update={(cache, { data: { createPayment } }) => {
            try {
                const { payments } = cache.readQuery({
                    query: GET_PAYMENTS,
                });
                let newPayments;
                if (payments) {
                    newPayments = payments.concat([createPayment]);
                } else {
                    newPayments = [createPayment];
                }
                cache.writeQuery({
                    query: GET_PAYMENTS,
                    data: {
                        payments: newPayments,
                    },
                });
            } catch (error) {
                console.log('error is :', error);
            }
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const payCard = ({ render }) => (
    <Mutation
        mutation={PAY_CARD}
        update={(cache, { data: { payCard } }) => {
            const card = cache.readFragment({
                id: `Card:${payCard.id}`,
                fragment: GET_CARD_FRAGMENT,
            });
            if (card) {
                cache.writeFragment({
                    id: `Card:${card.id}`,
                    fragment: GET_CARD_FRAGMENT,
                    data: {
                        ...card,
                        paid: true,
                    },
                });
            }
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const unpayCard = ({ render }) => (
    <Mutation
        mutation={UNPAY_CARD}
        update={(cache, { data: { unpayCard } }) => {
            const card = cache.readFragment({
                id: `Card:${unpayCard.id}`,
                fragment: GET_CARD_FRAGMENT,
            });
            if (card) {
                cache.writeFragment({
                    id: `Card:${card.id}`,
                    fragment: GET_CARD_FRAGMENT,
                    data: {
                        ...card,
                        paid: false,
                    },
                });
            }
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

export const clearReferralBonus = ({ render, id }) => (
    <Mutation
        mutation={CLEAR_REFERRAL_BONUS}
        update={cache => {
            const { student } = cache.readQuery({
                query: GET_STUDENT,
                variables: {
                    id,
                },
            });
            cache.writeQuery({
                query: GET_STUDENT,
                variables: {
                    id,
                },
                data: {
                    student: {
                        ...student,
                        hasReferralBonus: false,
                    },
                },
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
    payCard,
    unpayCard,
    clearReferralBonus,
};

const PaymentManagementContainer = () => {
    console.log('mapper is: ', mapper);
    return (
        <Adopt mapper={mapper}>
            {({
                getPayments: { data, loading, error },
                deletePayment: { mutation: deletePaymentMutation },
                createPayment: { mutation: createPaymentMutation },
                payCard: { mutation: payCardMutation },
                unpayCard: { mutation: unpayCardMutation },
                clearReferralBonus: { mutation: clearReferralBonusMutation },
            }) => {
                if (loading) return null;
                if (error) return `Error: ${error}`;
                if (!data.payments) return `404: Session not found`;
                return (
                    <PaymentManagement
                        payments={data.payments}
                        deletePayment={deletePaymentMutation}
                        createPayment={createPaymentMutation}
                        payCard={payCardMutation}
                        unpayCard={unpayCardMutation}
                        clearReferralBonus={clearReferralBonusMutation}
                    />
                );
            }}
        </Adopt>
    );
};

export default PaymentManagementContainer;
