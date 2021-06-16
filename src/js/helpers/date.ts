import dayjs from 'dayjs';

export const formatDate = (dateTime: any): string => dayjs(dateTime).format('YYYY-MM-DD');

export const CURRENT_DATE = dayjs().format('YYYY-MM-DD');
