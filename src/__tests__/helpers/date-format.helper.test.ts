import { formatValidDate } from 'helpers/date-format.helper';

const dateInput = new Date();

describe('test for formatValidDate helper', () => {
  it('should format date properly', () => {
    expect(formatValidDate(dateInput)).toBe('less than a minute ago');
  });
});
