import { isBeforeExpiration } from './date';

export const isCardActive = card =>
    card.value > 0 && isBeforeExpiration(card.expirationDate);
