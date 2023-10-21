export const printTime = (seconds: number) => {
  const secondsNoDecimal = Math.floor(seconds);
  const secondsNumber = secondsNoDecimal % 60;
  const minNumber = Math.floor(secondsNoDecimal / 60);

  const minText =
    minNumber > 0
      ? minNumber.toString() + " min"
      : "";
  const secondsText = secondsNumber.toString().padStart(2, "0") + " s";

  return `${minText} ${secondsText}`;
};
