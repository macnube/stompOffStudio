import gql from 'graphql-tag';

export const SMALL_PARTICIPANT_FRAGMENT = gql`
    fragment SmallParticipantFragment on Participant {
        id
        status
    }
`;
