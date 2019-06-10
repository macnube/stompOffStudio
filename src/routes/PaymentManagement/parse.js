import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parsePaymentsToTableData = payments =>
    reduce(
        payments,
        (acc, payment) => {
            const linkedToCard = payment.card ? 'True' : 'False';
            const result = [
                payment.id,
                payment.student.name,
                payment.amount,
                getTableDate(payment.date),
                payment.type,
                linkedToCard,
            ];
            acc.push(result);
            return acc;
        },
        []
    );
