export const formatDateToLocaleTime = (date: Date) => {
  const receivedDate = new Date(date);

  const year = receivedDate.getFullYear();
  const month = String(receivedDate.getMonth() + 1).padStart(2, '0');
  const day = String(receivedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
