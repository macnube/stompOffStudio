import React from 'react';
import filter from 'lodash/filter';
import find from 'lodash/find';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_STUDENT,
    DELETE_COURSE_STUDENT,
    UPDATE_STUDENT,
    CREATE_CARD,
    DELETE_CARD,
    CREATE_PAYMENT,
    DELETE_PAYMENT,
    PAY_CARD,
    UNPAY_CARD,
    GET_CARD_FRAGMENT,
} from './graphql';
import { GET_PAYMENTS } from 'routes/PaymentManagement/graphql';
import StudentDetail from './StudentDetail';

const getStudent = ({ render, id }) => (
    <Query query={GET_STUDENT} variables={{ id }}>
        {render}
    </Query>
);

const updateStudent = ({ render }) => (
    <Mutation mutation={UPDATE_STUDENT}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const createCard = ({ render, id }) => (
    <Mutation
        mutation={CREATE_CARD}
        update={(cache, { data: { createCard } }) => {
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
                        cards: student.cards.concat([createCard]),
                    },
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deleteCard = ({ render, id }) => (
    <Mutation
        mutation={DELETE_CARD}
        update={(cache, { data: { deleteCard } }) => {
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
                        cards: filter(
                            student.cards,
                            card => card.id !== deleteCard.id
                        ),
                    },
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deleteCourseStudent = ({ render, id }) => (
    <Mutation
        mutation={DELETE_COURSE_STUDENT}
        update={(cache, { data: { deleteCourseStudent } }) => {
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
                        courses: filter(
                            student.courses,
                            course => course.id !== deleteCourseStudent.id
                        ),
                    },
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const deletePayment = ({ render, id }) => (
    <Mutation
        mutation={DELETE_PAYMENT}
        update={(cache, { data: { deletePayment } }) => {
            const { student } = cache.readQuery({
                query: GET_STUDENT,
                variables: { id },
            });
            const payment = find(student.payments, { id: deletePayment.id });
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
                variables: { id },
                data: {
                    student: newStudent,
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
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

export const payCard = ({ render }) => (
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

export const unpayCard = ({ render }) => (
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

const mapper = {
    getStudent,
    deleteCourseStudent,
    updateStudent,
    createCard,
    deleteCard,
    createPayment,
    deletePayment,
    payCard,
    unpayCard,
};

const StudioDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getStudent: { data, loading, error },
                    deleteCourseStudent: {
                        mutation: deleteCourseStudentMutation,
                    },
                    updateStudent: { mutation: updateStudentMutation },
                    deleteCard: { mutation: deleteCardMutation },
                    createCard: { mutation: createCardMutation },
                    createPayment: { mutation: createPaymentMutation },
                    deletePayment: { mutation: deletePaymentMutation },
                    payCard: { mutation: payCardMutation },
                    unpayCard: { mutation: unpayCardMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    if (!data.student) return `Error: 404`;
                    return (
                        <StudentDetail
                            student={data.student}
                            deleteCourseStudent={deleteCourseStudentMutation}
                            updateStudent={updateStudentMutation}
                            deleteCard={deleteCardMutation}
                            createCard={createCardMutation}
                            createPayment={createPaymentMutation}
                            deletePayment={deletePaymentMutation}
                            payCard={payCardMutation}
                            unpayCard={unpayCardMutation}
                        />
                    );
                }}
            </Adopt>
        );
    }
    return (
        <Redirect
            to={{
                pathname: '/studentManagement',
            }}
        />
    );
};

export default StudioDetailContainer;
