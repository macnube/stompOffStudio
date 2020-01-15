import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';

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

export const parsePaymentsToChartData = (p, year) => {
    const payments = filter(p, payment => getYear(payment.date) === year);
    if (payments.length === 0) {
        return [];
    }
    let previousMonthYear = getChartMonthYear(payments[0].date);
    let currentMonthYear;
    let index = 0;
    const result = reduce(
        payments,
        (acc, payment) => {
            currentMonthYear = getChartMonthYear(payment.date);
            if (currentMonthYear === previousMonthYear) {
                acc[index].amount += payment.amount;
                return acc;
            }
            index++;
            acc.push({ time: currentMonthYear, amount: payment.amount });
            previousMonthYear = currentMonthYear;
            return acc;
        },
        [{ time: previousMonthYear, amount: 0 }]
    );
    return reverse(result);
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
