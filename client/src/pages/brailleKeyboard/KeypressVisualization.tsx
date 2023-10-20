import React from "react";
import { FC } from "react";
import { keypressesToBraille } from "../../services/brailleService";

export const KeypressVisualization: FC<{
  keypresses: string[];
}> = ({ keypresses }) => {
  const keys1 = ["s", "d", "f"];
  const keys2 = ["j", "k", "l"];
  return (
    <div>
      <div className={"grid grid-cols-7"}>
        {keys1.map((k, i) => (
          <KeyVisualization
            key={k}
            k={k}
            index={3 - i}
            keypresses={keypresses}
          />
        ))}
        <div
          className="
            text-5xl 
            rounded-xl 
            m-auto 
            p-3 
            bg-slate-900 
            text-white
            dark:bg-theme-900
          "
        >
          {keypressesToBraille(keypresses)}
        </div>
        {keys2.map((k, i) => (
          <KeyVisualization
            key={k}
            k={k}
            index={4 + i}
            keypresses={keypresses}
          />
        ))}
      </div>
      <div className="flex flex-row place-content-center "></div>
    </div>
  );
};

const KeyVisualization: FC<{
  k: string;
  keypresses: string[];
  index?: number;
}> = ({ k, keypresses, index }) => {
  const colorStyle = keypresses.includes(k)
    ? ` 
        bg-slate-800 
        text-white 

        dark:bg-gray-800
        dark:border-gray-700 
        dark:text-black 
        dark:border-2
      `
    : ` bg-slate-200 
        dark:bg-gray-700 
        dark:border-2
        dark:border-gray-800
        
      `;

  const numberStyle = keypresses.includes(k)
    ? ` text-gray-400 dark:text-gray-400 `
    : ` text-gray-600 `;

  return (
    <div
      className={
        `transition-all ease-linear
        m-5 p-5 
        rounded-lg 
        text-center ` + colorStyle
      }
    >
      <div>{k}</div>
      <div className={numberStyle}>{index && index}</div>
    </div>
  );
};
