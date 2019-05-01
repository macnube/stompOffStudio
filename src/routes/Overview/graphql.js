import gql from 'graphql-tag';

export const GET_OVERVIEW_INSTANCES = gql`
    query OverviewGetOverviewInstances {
        overviewInstances {
            id
            date
            topic
            notes
            recapUrl
            participants {
                id
                status
            }
        }
    }
`;

export const GET_PAYMENTS = gql`
    query OverviewGetPayments {
        payments {
            id
            type
            date
            amount
            student {
                id
                name
            }
            card {
                id
            }
        }
    }
`;
