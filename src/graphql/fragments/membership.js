import gql from 'graphql-tag';

export const SMALL_MEMBERSHIP_FRAGMENT = gql`
    fragment SmallMembershipFragment on Membership {
        id
        role
    }
`;

export const MEDIUM_MEMBERSHIP_FRAGMENT = gql`
    fragment MediumMembershipFragment on Membership {
        ...SmallMembershipFragment
        status
        waitlistDate
    }
    ${SMALL_MEMBERSHIP_FRAGMENT}
`;
