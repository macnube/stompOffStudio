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
