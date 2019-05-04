import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_CARD, UPDATE_CARD } from './graphql';
import CardDetail from './CardDetail';

const getCard = ({ render, id }) => (
    <Query query={GET_CARD} variables={{ id }}>
        {render}
    </Query>
);

const updateCard = ({ render, id }) => (
    <Mutation mutation={UPDATE_CARD}>
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCard,
    updateCard,
};

const CardDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({
                    getCard: { data, loading, error },
                    updateCard: { mutation: updateCardMutation },
                }) => {
                    if (loading) return null;
                    if (error) return `Error: ${error}`;
                    return (
                        <CardDetail
                            card={data.card}
                            updateCard={updateCardMutation}
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
