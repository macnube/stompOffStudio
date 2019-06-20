import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.topic,
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
            const result = [absence.id, getTableDate(absence.date)];
            acc.push(result);
            return acc;
        },
        []
    );

export const getInstancesTableDates = instances =>
    instances.map(instance => getTableDate(instance.date));
