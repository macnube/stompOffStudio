import reduce from 'lodash/reduce';
import { getTableDate } from 'utils/date';

export const parseCardsToTableData = cards =>
    reduce(
        cards,
        (acc, card) => {
            const result = [
                card.id,
                card.value,
                getTableDate(card.expirationDate),
            ];
            acc.push(result);
            return acc;
        },
        []
    );
