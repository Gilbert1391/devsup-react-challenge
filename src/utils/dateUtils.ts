export const formatISOToddmmyyyy = (inputDate: string): string => {
  const date = new Date(inputDate);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
};

export const formatISODateToyyyymmdd = (inputDate: string) => {
  const date = new Date(inputDate);
  const utcDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000,
  );
  const year = utcDate.getUTCFullYear();
  const month = String(utcDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(utcDate.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
