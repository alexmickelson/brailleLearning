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

const textLookup: { [key: string]: string } = {
  // "⠀": " ",
  "⠁": "a",
  "⠃": "b",
  "⠉": "c",
  "⠙": "d",
  "⠑": "e",
  "⠋": "f",
  "⠛": "g",
  "⠓": "h",
  "⠊": "i",
  "⠚": "j",
  "⠅": "k",
  "⠇": "l",
  "⠍": "m",
  "⠝": "n",
  "⠕": "o",
  "⠏": "p",
  "⠟": "q",
  "⠗": "r",
  "⠎": "s",
  "⠞": "t",
  "⠥": "u",
  "⠧": "v",
  "⠺": "w",
  "⠭": "x",
  "⠽": "y",
  "⠵": "z",

  "⠼": "[Numeric]",
  "⠼⠁": "1",
  "⠼⠃": "2",
  "⠼⠉": "3",
  "⠼⠙": "4",
  "⠼⠑": "5",
  "⠼⠋": "6",
  "⠼⠛": "7",
  "⠼⠓": "8",
  "⠼⠊": "9",
  "⠼⠚": "0",

  "⠠": "[capital symbol]",
  "⠠⠠": "[capital word]",
  "⠠⠠⠠": "[capital passage start]",
  "⠠⠄": "[capital passage end]",

  // grade 1
  "⠰": "[symbol]",
  "⠰⠰": "[word]",
  "⠰⠰⠰": "[passage]",
  "⠰⠄ ": "[grade 1 terminator]",

  "⠨⠆": "[italic symbol]",
  "⠨⠂": "[italic word]",
  "⠨⠶": "[italic passage]",
  "⠨⠄": "[italic terminator]",

  "⠘⠆": "[bold symbol]",
  "⠘⠂": "[bold word]",
  "⠘⠶": "[bold passage]",
  "⠘⠄": "[bold terminator]",

  "⠸⠆": "[underline symbol]",
  "⠸⠂": "[underline word]",
  "⠸⠶": "[underline passage]",
  "⠸⠄": "[underline terminator]",

  "⠈⠆": "[underline symbol]",
  "⠈⠂": "[underline word]",
  "⠈⠶": "[underline passage]",
  "⠈⠄": "[underline terminator]",

  //punctuation
  "⠂": ",",
  "⠲": ".",
  "⠄": "'",
  "⠒": ":",
  "⠠⠤": "_",
  "⠐⠠⠤": "__", //long dash?

};
export const brailleToText = (braille: string) => {
  const text = braille
    .split("")
    .map((c) => textLookup[c])
    .join("");
  return text;
};
