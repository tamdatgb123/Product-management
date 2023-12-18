export const formatNumber = (num) => {
  const numberString = Math.abs(num).toString();
  let formatedNumber = "";
  for (let i = 0; i < numberString.length; i++) {
    formatedNumber =
      numberString.charAt(numberString.length - 1 - i) + formatedNumber;
    if (i > 0 && (i + 1) % 3 === 0 && i !== numberString.length - 1) {
      formatedNumber = "," + formatedNumber;
    }
  }

  return formatedNumber;
};
