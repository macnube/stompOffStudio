import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_CARD,
    UPDATE_CARD,
    REMOVE_CARD_PARTICIPATION,
    MARK_PRIVATE_LESSON_USED,
    CARD_DETAIL_CARD_FRAGMENT,
} from './graphql';
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

const markPrivateLessonUsed = ({ render }) => (
    <Mutation
        mutation={MARK_PRIVATE_LESSON_USED}
        update={(cache, { data: { markPrivateLessonUsed } }) => {
            const card = cache.readFragment({
                id: `Card:${markPrivateLessonUsed.id}`,
                fragment: CARD_DETAIL_CARD_FRAGMENT,
                fragmentName: 'CardDetailCardFragment',
            });
            cache.writeFragment({
                id: `Card:${card.id}`,
                fragment: CARD_DETAIL_CARD_FRAGMENT,
                fragmentName: 'CardDetailCardFragment',
                data: {
                    ...card,
                    privateLessonUseDate:
                        markPrivateLessonUsed.privateLessonUseDate,
                },
            });
        }}
    >
        {(mutation, result) => render({ mutation, result })}
    </Mutation>
);

const mapper = {
    getCard,
    updateCard,
    removeCardParticipation,
    markPrivateLessonUsed,
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
                    markPrivateLessonUsed: {
                        mutation: markPrivateLessonUsedMutation,
                    },
                }) => {
                    if (loading) return null;
                    if (error) {
                        console.log('error is: ', error);
                    }
                    if (data && data.card) {
                        return (
                            <CardDetail
                                card={data.card}
                                updateCard={updateCardMutation}
                                removeCardParticipation={
                                    removeCardParticipationMutation
                                }
                                markPrivateLessonUsed={
                                    markPrivateLessonUsedMutation
                                }
                            />
                        );
                    }
                    return (
                        <Redirect
                            to={{
                                pathname: '/studentManagement',
                            }}
                        />
                    );
                }}
            </Adopt>
        );
    }
};

export default CardDetailContainer;
