import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import endOfDay from 'date-fns/endOfDay';

export const getTableDate = date => format(parseISO(date), 'MMM do, yyyy');

export const isExpired = date => isBefore(parseISO(date), endOfDay(new Date()));
