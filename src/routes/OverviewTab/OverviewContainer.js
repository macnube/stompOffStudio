import React from 'react';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import {
    GET_OVERVIEW_INSTANCES,
    GET_UNPAID_CARDS,
    GET_UNLINKED_PAYMENTS,
} from './graphql';
import Overview from './Overview';

const getOverviewInstances = ({ render }) => (
    <Query query={GET_OVERVIEW_INSTANCES}>{render}</Query>
);

const getUnpaidCards = ({ render }) => (
    <Query query={GET_UNPAID_CARDS}>{render}</Query>
);

const getUnlinkedCardPayments = ({ render }) => (
    <Query query={GET_UNLINKED_PAYMENTS}>{render}</Query>
);

const mapper = {
    getOverviewInstances,
    getUnpaidCards,
    getUnlinkedCardPayments,
};

const OverviewContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getOverviewInstances: {
                data: overviewInstancesData,
                error: overviewInstancesError,
                loading: overviewLoading,
            },
            getUnpaidCards: {
                data: cardsData,
                error: cardsError,
                loading: cardsLoading,
            },
            getUnlinkedCardPayments: { data: paymentsData },
        }) => {
            if (overviewLoading || cardsLoading) return null;
            if (overviewInstancesError)
                return `Error: ${overviewInstancesError}`;
            if (cardsError) return `Error: ${cardsError}`;
            if (overviewInstancesData && cardsData) {
                return (
                    <Overview
                        instances={overviewInstancesData.overviewInstances}
                        unpaidCards={cardsData.unpaidCards}
                        unlinkedPayments={paymentsData.unlinkedCardPayments}
                    />
                );
            }
        }}
    </Adopt>
);

export default OverviewContainer;
