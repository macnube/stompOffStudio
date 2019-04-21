import gql from 'graphql-tag';

export const GET_STUDIOS = gql`
    query CourseManagementGetStudios {
        studios {
            id
            name
            rooms {
                id
                name
                capacity
                studio {
                    id
                    name
                }
            }
        }
    }
`;
