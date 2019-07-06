import reduce from 'lodash/reduce';

import { getTableDate } from 'utils/date';

export const parseCardDataToArray = card =>
    reduce(
        card.participationHistory,
        (acc, participant) => {
            const result = [
                participant.courseInstance.id,
                participant.courseInstance.topic,
                getTableDate(participant.courseInstance.date),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
