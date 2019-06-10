import gql from 'graphql-tag';

export const SMALL_MEMBERSHIP_FRAGMENT = gql`
    fragment SmallMembershipFragment on Membership {
        id
        role
    }
`;
