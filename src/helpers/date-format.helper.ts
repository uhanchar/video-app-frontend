import { formatDistance } from 'date-fns';

export const formatValidDate = (createdAt: Date): string => `${ formatDistance(new Date(createdAt), new Date()) } ago`;
