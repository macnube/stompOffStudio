import reduce from 'lodash/reduce';

import { getTableDate, getChartMonthYear, getYear } from 'utils/date';

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

export const parsePaymentsToChartData = (payments, year) => {
    let previousMonthYear = getChartMonthYear(payments[0].date);
    let currentMonthYear;
    let amount = 0;
    return reduce(
        payments,
        (acc, payment) => {
            if (getYear(payment.date) === year) {
                console.log('here');
                currentMonthYear = getChartMonthYear(payment.date);
                if (currentMonthYear === previousMonthYear) {
                    amount += payment.amount;
                    return acc;
                }
                acc.push({ time: currentMonthYear, amount });
                amount = payment.amount;
                previousMonthYear = currentMonthYear;
                return acc;
            }
            return acc;
        },
        []
    );
};

export const getTotalFromPayments = (payments, year) => {
    return reduce(
        payments,
        (acc, payment) => {
            if (getYear(payment.date) === year) {
                acc += payment.amount;
                return acc;
            }
            return acc;
        },
        0
    );
};
