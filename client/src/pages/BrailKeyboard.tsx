import React, { useEffect, useState } from "react";

const keypressesToBraille = (keypresses: string[]) => {
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

export const BrailKeyboard = () => {
  const [lastKeysPressed, setLastKeysPressed] = useState<string[]>([]);
  const [currentKeysPressed, setCurrentKeysPressed] = useState<string[]>([]);
  const [brailOutput, setBrailOutput] = useState("");

  useEffect(() => {
    if (lastKeysPressed.length !== 0 && currentKeysPressed.length === 0) {
      setBrailOutput((b) => b + keypressesToBraille(lastKeysPressed));
      setLastKeysPressed([]);
    }
  }, [lastKeysPressed, currentKeysPressed]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    const addKeyIfNotPresent = (keys: string[]): string[] => {
      if (keys.includes(e.key)) return keys;
      else return [...keys, e.key];
    };
    setCurrentKeysPressed(addKeyIfNotPresent);
    setLastKeysPressed(addKeyIfNotPresent);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    setCurrentKeysPressed((keys) => {
      const newList = [...keys].filter((k) => k !== e.key);

      return newList;
    });
  };

  return (
    <div>
      <div className=" m-5">
        <textarea
          className="bg-slate-100 w-full rounded-lg p-5"
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          value={brailOutput}
          rows={5}
        />
      </div>
      <div>
        Current Keys pressed:{" "}
        {currentKeysPressed.map((k, i) => (
          <span key={i + k}>{k}</span>
        ))}
      </div>
      <div>
        Last Keys pressed:{" "}
        {lastKeysPressed.map((k, i) => (
          <span key={i + k}>{k}</span>
        ))}
      </div>
      {/* <div>
        Last Braille:{" "}
        <span className="outline">
          {brailOutput}
        </span>
      </div> */}
    </div>
  );
};
