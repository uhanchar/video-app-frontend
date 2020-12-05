import { FILE_FORMATS, MAX_FILE_SIZE } from 'constants/file-uploading';

export const isNotValidFormat = (fileName: string): boolean => FILE_FORMATS
  .some((format: string) => fileName.toLowerCase().endsWith(format));

export const isNotValidFileSize = (fileSize: number): boolean => fileSize <= MAX_FILE_SIZE;
