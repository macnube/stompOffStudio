import gql from 'graphql-tag';

import { MEDIUM_STUDIO_FRAGMENT } from 'graphql';

export const GET_STUDIOS = gql`
    query CourseManagementGetStudios {
        studios {
            ...MediumStudioFragment
        }
    }
    ${MEDIUM_STUDIO_FRAGMENT}
`;
