export function getDate() {
  const currentDate = new Date();
  const day = currentDate.getDate(); 
  const monthIndex = currentDate.getMonth(); 
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${day}/${monthIndex}/${year}`;

  return [formattedDate, day, month, year];
}
export function getCurrentTime() {
  const currentDate = new Date();
  const hours = currentDate.getHours().toString().padStart(2, "0");
  const minutes = currentDate.getMinutes().toString().padStart(2, "0");
  const seconds = currentDate.getSeconds().toString().padStart(2, "0");
  const currentTime = `${hours}:${minutes}:${seconds}`;

  return currentTime;
}
