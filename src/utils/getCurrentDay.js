export const getCurrentDay = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = parseInt(date.getMonth()) + 1;
  const day = date.getDate();

  return `${day}/${month}/${year}`;
};
