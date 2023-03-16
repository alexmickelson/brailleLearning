import { brailleToText } from "./brailleService";

const aboutInBraille = "⠁⠃⠕⠥⠞";
it("Can translate standard braille", () => {
  const actual = brailleToText(aboutInBraille);

  const expected = "about";
  expect(actual).toBe(expected);
});

it("can translate upper case letter braille", () => {
  const braille = "⠠⠁";
  const actual = brailleToText(braille);

  const expected = "A";
  expect(actual).toBe(expected);
});

it("if only given uppercase modifier, return empty string?", () => {
  const braille = "⠠";
  const actual = brailleToText(braille);

  const expected = "";
  expect(actual).toBe(expected);
});

it("can translate single a character", () => {
  const braille = "⠁";
  const actual = brailleToText(braille);
  expect(actual).toBe("a");
});

it("can italicise letter", () => {
  const braille = "⠨⠆⠁";
  const actual = brailleToText(braille);

  const expected = "<italic>a</italic>";
  expect(actual).toBe(expected);
});

it("can italicise word", () => {
  const italisizeWord = "⠨⠂";
  
  const fullBraille = italisizeWord + aboutInBraille + " " + aboutInBraille

  const expected = "<italic>about</italic> about"
  const actual = brailleToText(fullBraille)
  expect(actual).toBe(expected)
});
