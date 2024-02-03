export function convertTimeToMessage(timeTakenMs) {
  const timeTakenDate = new Date(timeTakenMs);
  if (timeTakenDate.getUTCHours >= 24) return "over a day";

  let hours = timeTakenDate.getUTCHours() + ":";
  if (hours === "0:") hours = "";
  else if (hours.length === 2) hours = "0" + hours;

  let minutes = timeTakenDate.getUTCMinutes() + ":";
  if (minutes === "0:") minutes = "";
  else if (minutes.length === 2) minutes = "0" + minutes;

  let seconds = timeTakenDate.getUTCSeconds() + ":";
  if (seconds === "0:") seconds = "";
  else if (seconds.length === 2) seconds = "0" + seconds;

  let milliseconds = timeTakenDate.getUTCMilliseconds();
  if (milliseconds.toString().length === 1) milliseconds = "00" + milliseconds;
  else if (milliseconds.toString().length === 2) milliseconds = "0" + milliseconds;

  return hours + minutes + seconds + milliseconds;
}
