import reduce from 'lodash/reduce';

import { getTableDate } from '~/utils/date';

export const parseCourseStudentsToTableData = courseStudents =>
    reduce(
        courseStudents,
        (acc, courseStudent) => {
            const result = [
                courseStudent.id,
                courseStudent.course.name,
                courseStudent.role,
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
