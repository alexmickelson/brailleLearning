import React from "react";
import { FC } from "react";
import { keypressesToBraille } from "../services/brailleService";

export const KeypressVisualization: FC<{ keypresses: string[] }> = ({
  keypresses,
}) => {
  const keys = ["a", "s", "d", "f",  "j", "k", "l", ";"];
  return (
    <div>
      <div className="grid grid-cols-8">
        {keys.map((k) => {
          if (keypresses.includes(k))
            return (
              <div
                key={k}
                className="m-5 p-5 bg-slate-800 text-white rounded-lg"
              >
                {k}
              </div>
            );
          return (
            <div key={k} className="m-5 p-5 bg-slate-200 rounded-lg">
              {k}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row place-content-center ">
        <div className="text-5xl border rounded-xl p-5">
          {keypressesToBraille(keypresses)}
        </div>
      </div>
    </div>
  );
};
