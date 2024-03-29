import { FC, useEffect, useState } from "react";
import { keypressesToBraille } from "../../services/brailleService";
import { BrailleInEnglish } from "./BrailleInEnglish";
import { KeypressVisualization } from "./KeypressVisualization";

export const BrailleKeyboard: FC<{
  startingBraille?: string;
  updateBrail: (s: string) => void;
  showText?: boolean;
}> = ({ startingBraille, updateBrail, showText = false }) => {
  const [persistentKeysPressed, setPersistentKeysPressed] = useState<string[]>(
    []
  );
  const [currentKeysPressed, setCurrentKeysPressed] = useState<string[]>([]);
  const [brailOutput, setBrailOutput] = useState(startingBraille ?? "");

  useEffect(() => {
    if (persistentKeysPressed.length !== 0 && currentKeysPressed.length === 0) {
      setBrailOutput((b) => b + keypressesToBraille(persistentKeysPressed));
      setPersistentKeysPressed([]);
    }
  }, [persistentKeysPressed, currentKeysPressed]);

  useEffect(() => {
    updateBrail(brailOutput);
  }, [brailOutput, updateBrail]);

  const validKeys = ["s", "d", "f", "j", "k", "l"];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Backspace") {
      setBrailOutput((b) => b.slice(0, -1));
      return;
    }
    if (e.key === "Enter") {
      setBrailOutput((b) => b + "\n");
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
            font-mono
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
      {showText && <BrailleInEnglish brailleText={brailOutput} />}
    </div>
  );
};
