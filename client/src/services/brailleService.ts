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


export const brailleToText = (braille: string): string => {
  if (braille.length === 0) return "";

  const [currentBrailleCharacter, restOfBraille] =
    splitOutNextBrailleCharacter(braille);
  const currentTextCharacter = textLookup[currentBrailleCharacter];

  if (currentBrailleCharacter.length === 2) {
    if (symbolIndicators.includes(currentTextCharacter)) {
      if (currentTextCharacter.includes("italic")) {
        if (braille.length < 3) return "";

        const nextSymbol = braille.substring(2, 3); // assumes single charater follows

        return (
          "<italic>" +
          brailleToText(nextSymbol) +
          "</italic>" +
          braille.substring(3)
        );
      }
    } else {
      return currentTextCharacter + brailleToText(restOfBraille);
    }
  }

  // length of 1 implied
  if (symbolIndicators.includes(currentTextCharacter)) {
    if (currentTextCharacter.includes("capital")) {
      if (braille.length < 2) return "";

      const nextSymbol = braille.substring(1, 2);
      return (
        brailleToText(nextSymbol).toUpperCase() +
        brailleToText(braille.substring(2))
      );
    }
  }

  return currentTextCharacter + brailleToText(braille.substring(1));

};

const splitOutNextBrailleCharacter = (braille: string) => {
  const brailleThreeCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 3
  );
  const brailleTwoCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 2
  );
  const brailleOneCharacters = Object.keys(textLookup).filter(
    (k) => k.length === 1
  );

  const isTwoCharacterBraille =
    braille.length > 1 &&
    brailleTwoCharacters.includes(braille.substring(0, 2));

  if (isTwoCharacterBraille)
    return [braille.substring(0, 2), braille.substring(3)];

  return [braille.substring(0, 1), braille.substring(2)];
};
