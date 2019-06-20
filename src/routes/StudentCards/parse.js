import reduce from 'lodash/reduce';
import { getTableDate } from 'utils/date';

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
