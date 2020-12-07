import { isValidFileSize, isValidFormat } from 'helpers/file-format-validation.helper';

const validFile = 'validFile.mpeg4';
const invalidFile = 'invalidFile.someFormat';
const validFileSize = 234343;
const invalidFileSize = 1073741825;

describe('test for file format validation helper', () => {
  it('should return true in case valid format', () => {
    expect(isValidFormat(validFile)).toBe(true);
  });

  it('should return false in case invalid file format', () => {
    expect(isValidFormat(invalidFile)).toBe(false);
  });

  it('should return true in case valid file size', () => {
    expect(isValidFileSize(validFileSize)).toBe(true);
  });

  it('should return false in case invalid file size', () => {
    expect(isValidFileSize(invalidFileSize)).toBe(false);
  });
});
