import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.course.name,
                instance.topic,
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

export const parseAbsencesToTableData = absences =>
    reduce(
        absences,
        (acc, absence) => {
            const result = [
                absence.course.id,
                getTableDate(absence.date),
                absence.course.name,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
