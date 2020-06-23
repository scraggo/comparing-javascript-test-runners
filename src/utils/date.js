const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const getDateTime = (inputDate = new Date()) => {
  const date = inputDate.toLocaleDateString(undefined, options);
  const time = `${inputDate.getHours()}:${inputDate.getMinutes()}:${inputDate.getSeconds()}`;
  return `${date} ${time}`;
};

module.exports = {
  getDateTime,
};
