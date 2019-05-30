import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_CARD, UPDATE_CARD, REMOVE_CARD_PARTICIPATION } from './graphql';
import { LOG_PARTICIPANT_STATUS } from 'src/routes/CourseInstance/graphql';
import CardDetail from './CardDetail';

const getCard = ({ render, id }) => (
    <Query query={GET_CARD} variables={{ id }}>
        {render}
    </Query>
);

const updateCard = ({ render }) => (
    <Mutation mutation={UPDATE_CARD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const removeCardParticipation = ({ render }) => (
    <Mutation mutation={REMOVE_CARD_PARTICIPATION}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const logParticipantStatus = ({ render }) => (
    <Mutation mutation={LOG_PARTICIPANT_STATUS}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCard,
    updateCard,
    removeCardParticipation,
    logParticipantStatus,
};

const CardDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getCard: { data, loading, error },
                    updateCard: { mutation: updateCardMutation },
                    removeCardParticipation: {
                        mutation: removeCardParticipationMutation,
                    },
                    logParticipantStatus: {
                        mutation: logParticipantStatusMutation,
                    },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <CardDetail
                            card={data.card}
                            updateCard={updateCardMutation}
                            removeCardParticipation={
                                removeCardParticipationMutation
                            }
                            logParticipantStatus={logParticipantStatusMutation}
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

export default CardDetailContainer;
