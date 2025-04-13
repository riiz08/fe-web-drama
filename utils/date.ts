function formatDateToMonthYear(dateStr: string): string {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth: 0-11
  const year = date.getFullYear();
  return `${month}/${year}`;
}
