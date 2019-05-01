import React from 'react';
import { Query } from 'react-apollo';
import { Adopt } from 'react-adopt';

import { GET_OVERVIEW_INSTANCES, GET_PAYMENTS } from './graphql';
import Overview from './Overview';

const getOverviewInstances = ({ render }) => (
    <Query query={GET_OVERVIEW_INSTANCES}>{render}</Query>
);

const getPayments = ({ render }) => (
    <Query query={GET_PAYMENTS}>{render}</Query>
);

const mapper = {
    getOverviewInstances,
    getPayments,
};

const OverviewContainer = () => (
    <Adopt mapper={mapper}>
        {({
            getOverviewInstances: {
                data: overviewInstancesData,
                error: overviewInstancesError,
                loading: overviewLoading,
            },
            getPayments: {
                data: paymentsData,
                error: paymentsError,
                loading: paymentsLoading,
            },
        }) => {
            if (overviewLoading || paymentsLoading) return null;
            if (overviewInstancesError)
                return `Error: ${overviewInstancesError}`;
            if (paymentsError) return `Error: ${paymentsError}`;
            return (
                <Overview
                    instances={overviewInstancesData.overviewInstances}
                    payments={paymentsData.payments}
                />
            );
        }}
    </Adopt>
);

export default OverviewContainer;
