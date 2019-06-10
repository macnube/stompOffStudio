import gql from 'graphql-tag';

export const SMALL_PAYMENT_FRAGMENT = gql`
    fragment SmallPaymentFragment on Payment {
        id
        amount
        date
        type
    }
`;
