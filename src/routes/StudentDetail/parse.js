import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';
import { MEMBERSHIP_STATUS } from 'constants/gql';

export const parseMembershipsToTableData = memberships =>
    reduce(
        memberships,
        (acc, membership) => {
            if (membership.status === MEMBERSHIP_STATUS.ACTIVE) {
                const result = [
                    membership.id,
                    membership.course.name,
                    membership.role,
                ];
                acc.push(result);
                return acc;
            }
            return acc;
        },
        []
    );

export const parseCardsToTableData = cards =>
    reduce(
        cards,
        (acc, card) => {
            const result = [
                card.id,
                card.originalValue,
                getTableDate(card.expirationDate),
                card.value,
                card.active ? 'Active' : 'Expired',
                card.paid && card.payment
                    ? `Paid on ${getTableDate(card.payment.date)}`
                    : 'Unpaid',
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parsePaymentsToTableData = payments =>
    reduce(
        payments,
        (acc, payment) => {
            const result = [
                payment.id,
                payment.card && payment.card.id,
                payment.amount,
                getTableDate(payment.date),
                payment.type,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
