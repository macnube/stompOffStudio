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
                courseStudent {
                    id
                }
            }
            course {
                id
                name
                courseStudents {
                    id
                    student {
                        id
                        name
                    }
                    role
                }
            }
        }
    }
`;

export const GET_UNPAID_CARDS = gql`
    query OverviewGetUnpaidCards {
        unpaidCards {
            id
            payment {
                id
            }
            student {
                id
                name
            }
            participationHistory {
                id
            }
            paid
            expirationDate
            value
            originalValue
        }
    }
`;
