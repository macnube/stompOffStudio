import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import endOfDay from 'date-fns/endOfDay';
import addWeeks from 'date-fns/addWeeks';
import { default as dateFnsGetYear } from 'date-fns/getYear';

export const getTableDate = date => format(parseISO(date), 'MMM do, yyyy');
export const getTableTime = date => format(parseISO(date), 'HH:mm');
export const getChartMonthYear = date => format(parseISO(date), 'MMM, yyyy');
export const getCurrentYear = () => dateFnsGetYear(new Date());
export const getYear = date => dateFnsGetYear(parseISO(date));

export const getDayFromCalendarPicker = date =>
    format(parseISO(new Date(date).toISOString()), 'ddd');

export const getTableDateFromCalendarPicker = date =>
    format(parseISO(new Date(date).toISOString()), 'MMM do, yyyy');

export const isPastExpiration = date =>
    isBefore(parseISO(date), endOfDay(new Date()));

export const isBeforeExpiration = date =>
    isBefore(endOfDay(new Date()), parseISO(date));

export const expiresNextWeek = date =>
    isBefore(parseISO(date), addWeeks(new Date(), 1));
