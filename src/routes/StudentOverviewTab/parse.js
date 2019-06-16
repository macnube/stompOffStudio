import reduce from 'lodash/reduce';

import { DANCE_ROLE } from 'constants/gql';
import { getTableDate } from 'utils/date';
import { getNumberByRole } from 'routes/CourseDetail/parse';

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.course.name,
                instance.topic,
                getNumberByRole(instance.participants, DANCE_ROLE.LEADER),
                getNumberByRole(instance.participants, DANCE_ROLE.FOLLOWER),
            ];
            acc.push(result);
            return acc;
        },
        []
    );

export const parseCardsToTableData = cards =>
    reduce(
        cards,
        (acc, card) => {
            if (card.paid) {
                return acc;
            }
            const result = [
                card.id,
                card.originalValue,
                getTableDate(card.expirationDate),
                card.value,
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
                payment.student.name,
                payment.amount,
                getTableDate(payment.date),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
