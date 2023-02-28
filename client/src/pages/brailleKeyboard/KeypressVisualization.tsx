import React from "react";
import { FC } from "react";
import { keypressesToBraille } from "../../services/brailleService";

export const KeypressVisualization: FC<{
  keypresses: string[];
  eightKeys?: boolean;
}> = ({ keypresses, eightKeys = false }) => {
  const keys1 = eightKeys ? ["a", "s", "d", "f"] : ["s", "d", "f"];
  const keys2 = eightKeys ? ["j", "k", "l", ";"] : ["j", "k", "l"];
  return (
    <div>
      <div className={eightKeys ? "grid grid-cols-9" : "grid grid-cols-7"}>
        {keys1.map((k, i) => (
          <KeyVisualization k={k} index={3 - i} keypresses={keypresses} />
        ))}
        <div className="text-5xl rounded-xl m-auto p-3 bg-slate-900 text-white">
          {keypressesToBraille(keypresses)}
        </div>
        {keys2.map((k, i) => (
          <KeyVisualization
            k={k}
            index={eightKeys ? 5 : 4 + i}
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
    ? " bg-slate-800 text-white "
    : " bg-slate-200 ";

  const numberStyle = keypresses.includes(k)
    ? " text-gray-400 "
    : " text-gray-600 ";

  return (
    <div
      key={k}
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
