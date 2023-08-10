import { formatISOToddmmyyyy, formatISODateToyyyymmdd } from './dateUtils';

describe('Date formatting functions', () => {
  it('formatISOToddmmyyyy formats ISO date to dd/mm/yyyy', () => {
    const inputDate = '2023-08-11T00:00:00.000+00:00';
    const formattedDate = formatISOToddmmyyyy(inputDate);
    expect(formattedDate).toBe('11/08/2023');
  });

  it('formatISODateToyyyymmdd formats ISO date to yyyy-mm-dd', () => {
    const inputDate = '2023-08-11T00:00:00.000+00:00';
    const formattedDate = formatISODateToyyyymmdd(inputDate);
    expect(formattedDate).toBe('2023-08-11');
  });
});
