import { FILE_FORMATS } from 'constants/file-formats';

const getFileFormat = (fileType: string): string => fileType.split('/').pop()!;

export const isNotValidFormat = (fileType: string): boolean => {
  const fileFormat = getFileFormat(fileType);

  return FILE_FORMATS.includes(fileFormat);
};
