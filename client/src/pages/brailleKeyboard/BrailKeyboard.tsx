import React, { FC, useEffect, useState } from "react";
import { keypressesToBraille } from "../../services/brailleService";
import { BrailInEnglish } from "./BrailInEnglish";
import { KeypressVisualization } from "./KeypressVisualization";

export const BrailKeyboard: FC<{ updateBrail: (s: string) => void }> = ({
  updateBrail,
}) => {
  const [persistentKeysPressed, setPersistentKeysPressed] = useState<string[]>(
    []
  );
  const [currentKeysPressed, setCurrentKeysPressed] = useState<string[]>([]);
  const [brailOutput, setBrailOutput] = useState("");

  useEffect(() => {
    if (persistentKeysPressed.length !== 0 && currentKeysPressed.length === 0) {
      setBrailOutput((b) => b + keypressesToBraille(persistentKeysPressed));
      setPersistentKeysPressed([]);
    }
  }, [persistentKeysPressed, currentKeysPressed]);

  useEffect(() => {
    updateBrail(brailOutput);
  }, [brailOutput, updateBrail]);

  const validKeys = [ "s", "d", "f", "j", "k", "l"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Backspace") {
      setBrailOutput((b) => b.slice(0, -1));
      return;
    }
    if (e.key === " ") {
      setBrailOutput((b) => b + " ");
      return;
    }

    if (validKeys.includes(e.key)) {
      const addKeyIfNotPresent = (keys: string[]): string[] => {
        if (keys.includes(e.key)) return keys;
        else return [...keys, e.key];
      };
      setCurrentKeysPressed(addKeyIfNotPresent);
      setPersistentKeysPressed(addKeyIfNotPresent);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (validKeys.includes(e.key)) {
      setCurrentKeysPressed((keys) => {
        const newList = [...keys].filter((k) => k !== e.key);

        return newList;
      });
    }
  };

  return (
    <div>
      <KeypressVisualization keypresses={persistentKeysPressed} />
      <div className=" m-5">
        <textarea
          className="
            w-full 
            rounded-lg 
            p-5
            
            bg-slate-100          
            dark:bg-gray-700
            dark:border-gray-600
          "
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onChange={() => {}}
          value={brailOutput}
          rows={5}
          placeholder="Click here to type braille"
        />
      </div>
      <BrailInEnglish brailleText={brailOutput} />
    </div>
  );
};
