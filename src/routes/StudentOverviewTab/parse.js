import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parseCardToTableData = card =>
    card && [[card.id, card.value, getTableDate(card.expirationDate)]];

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
