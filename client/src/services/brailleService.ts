import { symbolIndicators, textLookup } from "./braillePrimitives";

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

const singleCharacterBraille = (braille: string) => {

  const brailleArray = braille.split("");

  const currentCharacter = textLookup[brailleArray[0]];

  if (symbolIndicators.includes(currentCharacter)) {
    if (currentCharacter.includes("capital")) {
      if (brailleArray.length < 2) return "";

      const nextSymbol = brailleArray[1];
      const currentCharacter = textLookup[nextSymbol!];
      const restOfArray = brailleArray.slice(2);
      return (
        currentCharacter.toUpperCase() + brailleToText(restOfArray.join(""))
      );
    }

  }

  const restOfArray = brailleArray.slice(1);
  return textLookup[currentCharacter] + brailleToText(restOfArray.join(""));
}

export const brailleToText = (braille: string): string => {
  const brailleThreeCharacters = Object.keys(textLookup).filter(k => k.length === 3);
  const brailleTwoCharacters = Object.keys(textLookup).filter(k => k.length === 2);
  const brailleOneCharacters = Object.keys(textLookup).filter(k => k.length === 1);

  if (braille.length === 0) return "";





    // if (currentCharacter.includes("italic")) {
    //   if (brailleArray.length < 3) return "";

    //   const nextSymbol = brailleArray[2];
    //   const currentCharacter = textLookup[nextSymbol!];
    //   const restOfArray = brailleArray.slice(3);
    //   return (
    //     "<italic/>" +
    //     currentCharacter +
    //     "</italic>" +
    //     brailleToText(restOfArray.join(""))
    //   );
    // }
};


