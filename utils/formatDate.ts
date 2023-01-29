// Useful functions for formatting Date as a string

// Take a Date object and return it formatted as a string.
const getFormattedDate = (selectedDate: Date | undefined) => {
  if (!selectedDate) {
    return undefined;
  }

  const date = selectedDate.getDate();
  const dateStr = date > 9 ? date.toString() : `0${date.toString()}`;
  const month = selectedDate.getMonth() + 1; // getMonth is 0 based
  const monthStr = month > 9 ? month.toString() : `0${month.toString()}`;
  const yearStr = selectedDate.getFullYear().toString();
  return `${dateStr}/${monthStr}/${yearStr}`;
};

// Take a Date object and return the time formatted as a string.
const getFormattedTime = (selectedTime: Date | undefined) => {
  if (!selectedTime) {
    return undefined;
  }
  // minutes/hours are two digits
  const minutes =
    selectedTime.getMinutes() > 9
      ? selectedTime.getMinutes().toString()
      : `0${selectedTime.getMinutes().toString()}`;
  const hours =
    selectedTime.getHours() > 9
      ? selectedTime.getHours().toString()
      : `0${selectedTime.getHours().toString()}`;
  return `${hours}:${minutes}`;
};

export { getFormattedDate, getFormattedTime };
