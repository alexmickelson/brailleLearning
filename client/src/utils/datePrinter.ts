export const printDate = (datestring: string | Date) => {
  const d = new Date(datestring);
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = pad(d.getFullYear() % 100);
  const rawHour = d.getHours() % 12;
  const hour = rawHour === 0 ? 12 : rawHour;
  const minute = pad(d.getMinutes());
  const suffix = d.getHours() >= 12 ? "PM" : "AM";
  return `${month}/${day}/${year} ${hour}:${minute} ${suffix}`;
};

function pad(num: number) {
  return num.toString().padStart(2, "0");
}
