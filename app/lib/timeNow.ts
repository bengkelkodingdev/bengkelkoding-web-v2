export const timeNow = () => {
  const todayDate = new Date()
    .toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-")
    .replace(",", "");

  const today =
    todayDate.slice(6, 10) +
    "-" +
    todayDate.slice(0, 2) +
    "-" +
    todayDate.slice(3, 5) +
    " " +
    todayDate.slice(11);

  return today;
};
