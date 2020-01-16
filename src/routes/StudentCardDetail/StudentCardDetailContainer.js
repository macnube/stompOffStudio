import React from 'react';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_CARD } from './graphql';
import StudentCardDetail from './StudentCardDetail';

const getCard = ({ render, id }) => (
    <Query query={GET_CARD} variables={{ id }}>
        {render}
    </Query>
);

const mapper = {
    getCard,
};

const StudentCardDetailContainer = ({ location }) => {
    const params = parse(location.search);
    if (params.id) {
        return (
            <Adopt mapper={mapper} id={params.id}>
                {({ getCard: { data, loading, error } }) => {
                    if (loading) return null;
                    if (error) {
                        console.log('error is: ', error);
                    }
                    if (data && data.card) {
                        return <StudentCardDetail card={data.card} />;
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

export default StudentCardDetailContainer;
