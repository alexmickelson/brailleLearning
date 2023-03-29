export const printDate = (datestring: string | Date) => {
  const d = new Date(datestring);
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = pad(d.getFullYear() % 100);
  const hour = d.getHours() % 12;
  const minute = pad(d.getMinutes());
  const suffix = d.getHours() > 12 ? "PM" : "AM";
  return `${month}/${day}/${year} ${hour}:${minute} ${suffix}`;
};

function pad(num: number) {
  var s = "00" + num;
  return s.substr(s.length - 2);
}
