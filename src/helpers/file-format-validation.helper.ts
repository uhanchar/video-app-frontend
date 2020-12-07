import { FILE_FORMATS, MAX_FILE_SIZE } from 'constants/file-uploading';

export const isValidFormat = (fileName: string): boolean => FILE_FORMATS
  .some((format: string) => fileName.toLowerCase().endsWith(format));

export const isValidFileSize = (fileSize: number): boolean => fileSize <= MAX_FILE_SIZE;
