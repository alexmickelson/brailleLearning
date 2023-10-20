import {
  symbolIndicators,
  symbols,
  textLookup,
} from "./braillePrimitives";

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

  const isSymbol = Object.values(symbols).includes(currentTextCharacter);

  const splitFunction = symbolIndicators.includes(currentTextCharacter)
    ? splitOutNextBrailleCharacter
    : splitOutNextBrailleWord;

  if (isSymbol) {
    const [nestedCurrentBrailleCharacter, nestedRestOfBraille] =
      splitFunction(restOfBraille);

    if (currentTextCharacter.includes("italic"))
      return (
        "<italic>" +
        brailleToText(nestedCurrentBrailleCharacter) +
        "</italic>" +
        brailleToText(nestedRestOfBraille)
      );

    if (currentTextCharacter.includes("capital"))
      return (
        brailleToText(nestedCurrentBrailleCharacter).toUpperCase() +
        brailleToText(nestedRestOfBraille)
      );
    console.log(
      "is symbol, but braille translation hot handled like symbol: " +
        currentBrailleCharacter +
        " " +
        currentTextCharacter
    );
  }

  return currentTextCharacter + brailleToText(restOfBraille);
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
    return [braille.substring(0, 2), braille.substring(2)];

  return [braille.substring(0, 1), braille.substring(1)];
};

const splitOutNextBrailleWord = (braille: string) => {
  const wordArray = braille.split(" ");

  return [wordArray[0], " " + wordArray.slice(1).join(" ")];
};
