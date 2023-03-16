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
  const currentCharacter = textLookup[braille.substring(0, 1)];

  if (symbolIndicators.includes(currentCharacter)) {
    if (currentCharacter.includes("capital")) {
      if (braille.length < 2) return "";

      const nextSymbol = braille.substring(1, 2);
      return (
        brailleToText(nextSymbol).toUpperCase() +
        brailleToText(braille.substring(2))
      );
    }
  }

  return currentCharacter + brailleToText(braille.substring(1));
};

const twoCharacterBraille = (braille: string) => {
  const currentCharacter = textLookup[braille.substring(0, 2)];

  if (symbolIndicators.includes(currentCharacter)) {
    if (currentCharacter.includes("italic")) {
      if (braille.length < 3) return "";

      const nextSymbol = braille.substring(2, 3);

      return (
        "<italic>" +
        brailleToText(nextSymbol) +
        "</italic>" +
        braille.substring(3)
      );
    }
  }

  return textLookup[currentCharacter] + brailleToText(braille.substring(2));
};

export const brailleToText = (braille: string): string => {
  const brailleThreeCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 3
  );
  const brailleTwoCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 2
  );
  const brailleOneCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 1
  );

  if (braille.length === 0) return "";

  const isTwoCharacterBraille =
    braille.length > 1 &&
    brailleTwoCharacters.includes(braille.substring(0, 2));
  // console.log("two character braille", braille, isTwoCharacterBraille);

  if (isTwoCharacterBraille) return twoCharacterBraille(braille);

  return singleCharacterBraille(braille);
  // if (braille.length > 2 && braille.substring(0, 3) in brailleThreeCharacters)
  //   return threeCharacterBraille

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
