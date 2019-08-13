import { DateTime } from 'luxon';

/** Retrieve the current UTC date in the correct format */
export const getCurrentDateTime = () => DateTime.utc().toISO();

/** Format the date time into the correct format */
export const formatDateTime = (value: string) =>
  DateTime.fromISO(value, { zone: 'utc', setZone: false }).toLocaleString(DateTime.DATETIME_SHORT);

/** Format the ISO date to a local date */
export const toLocalDate = (value: string) =>
DateTime.fromISO(value, { zone: 'utc', setZone: false }).toLocal().toISODate();

/** Format the ISO date to a local time  */
export const toLocalTime = (value: string) =>
DateTime.fromISO(value, { zone: 'utc', setZone: false }).toLocal().toFormat('HH:ss');

/** Format the date time into the iso format for easy storing */
export const toISO = (value: string) =>
DateTime.fromISO(value, { zone: 'local', setZone: false }).toUTC().toISO();
