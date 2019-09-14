import { isValidCardDate } from './date';

export const isCardActive = card =>
    card.value > 0 && isValidCardDate(card.expirationDate);
