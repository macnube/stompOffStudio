import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_CARD, UPDATE_CARD, REMOVE_CARD_PARTICIPATION } from './graphql';
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

const mapper = {
    getCard,
    updateCard,
    removeCardParticipation,
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
                }) => {
                    if (loading) return null;
                    return (
                        <CardDetail
                            card={data.card}
                            updateCard={updateCardMutation}
                            removeCardParticipation={
                                removeCardParticipationMutation
                            }
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
