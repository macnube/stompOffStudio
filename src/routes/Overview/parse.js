import reduce from 'lodash/reduce';

import { PARTICIPANT_STATUS } from 'constants/gql';
import { getTableDate } from 'utils/date';

const getNumberOfParticipants = (participants, status) =>
    reduce(
        participants,
        (result, participant) => {
            if (participant.status === status) {
                return ++result;
            }
            return result;
        },
        0
    );

export const parseInstancesToTableData = instances =>
    reduce(
        instances,
        (acc, instance) => {
            const result = [
                instance.id,
                getTableDate(instance.date),
                instance.topic,
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.PRESENT
                ),
                getNumberOfParticipants(
                    instance.participants,
                    PARTICIPANT_STATUS.ABSENT
                ),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
