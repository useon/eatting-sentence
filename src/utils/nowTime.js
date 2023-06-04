const nowTime = () => {
  const now = new Date();
  const year = String(now.getFullYear()).slice(2, 4);
  let month = String(now.getMonth() + 1);
  let date = String(now.getDate());
  let hours = String(now.getHours());
  let minutes = String(now.getMinutes());
  let seconds = String(now.getSeconds());

  if (Number(month) < 10) month = `0${month}`;
  if (Number(date) < 10) date = `0${date}`;
  if (Number(hours) === 12) hours = '00';
  if (Number(minutes) < 10) minutes = `0${minutes}`;
  if (Number(seconds) < 10) seconds = `0${seconds}`;

  const registeredTime = Number(year + month + date + hours + minutes + seconds);
  return registeredTime;
};

export default nowTime;
