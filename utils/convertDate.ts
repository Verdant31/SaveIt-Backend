export function convertDate(date: Date) {
  return new Date(date)
    .toLocaleDateString(undefined, {          
      month: "2-digit", day: "2-digit", year: '2-digit'
    });
}