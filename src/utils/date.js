import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

export const getTableDate = date => format(parseISO(date), 'MMM do, yyyy');
