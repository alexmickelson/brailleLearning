import { textLookup } from "./braillePrimitives";

export const keypressesToBraille = (keypresses: string[]) => {
  const array = [
    keypresses.includes(";") ? "1" : "0",
    keypresses.includes("a") ? "1" : "0",
    keypresses.includes("l") ? "1" : "0",
    keypresses.includes("k") ? "1" : "0",
    keypresses.includes("j") ? "1" : "0",
    keypresses.includes("s") ? "1" : "0",
    keypresses.includes("d") ? "1" : "0",
    keypresses.includes("f") ? "1" : "0",
  ];

  const brailOffset = parseInt(array.join(""), 2);
  const decimalBrailStart = 10240;

  const decimalBrailUnicodeNumber = brailOffset + decimalBrailStart;

  return String.fromCharCode(decimalBrailUnicodeNumber);
};



export const brailleToText = (braille: string): string => {
  if (braille.length === 0) return "";

  const brailleArray = braille.split("");

  if (textLookup[brailleArray[0]] === "[capital symbol]") {
    if (brailleArray.length < 2) return "";
    const nextSymbol = brailleArray[1];
    const currentCharacter = textLookup[nextSymbol!].toUpperCase();
    const restOfArray = brailleArray.slice(2);
    return currentCharacter + brailleToText(restOfArray.join(""));
  }

  const restOfArray = brailleArray.slice(1);
  return textLookup[brailleArray[0]] + brailleToText(restOfArray.join(""));
};
