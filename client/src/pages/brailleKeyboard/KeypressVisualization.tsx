import React from "react";
import { FC } from "react";
import { keypressesToBraille } from "../../services/brailleService";

const KeyVisualization: FC<{ k: string; keypresses: string[] }> = ({
  k,
  keypresses,
}) => {
  if (keypresses.includes(k))
    return (
      <div key={k} className="m-5 p-5 bg-slate-800 text-white rounded-lg">
        {k}
      </div>
    );
  return (
    <div key={k} className="m-5 p-5 bg-slate-200 rounded-lg">
      {k}
    </div>
  );
};
export const KeypressVisualization: FC<{
  keypresses: string[];
  eightKeys?: boolean;
}> = ({ keypresses, eightKeys = false }) => {
  const keys1 = eightKeys ? ["a", "s", "d", "f"] : ["s", "d", "f"];
  const keys2 = eightKeys ? ["j", "k", "l", ";"] : ["j", "k", "l"];
  return (
    <div>
      <div className={eightKeys ? "grid grid-cols-9" : "grid grid-cols-7"}>
        {keys1.map((k) => (
          <KeyVisualization k={k} keypresses={keypresses} />
        ))}
        <div className="text-5xl rounded-xl m-auto p-3 bg-slate-900 text-white">
          {keypressesToBraille(keypresses)}
        </div>
        {keys2.map((k) => (
          <KeyVisualization k={k} keypresses={keypresses} />
        ))}
      </div>
      <div className="flex flex-row place-content-center "></div>
    </div>
  );
};
