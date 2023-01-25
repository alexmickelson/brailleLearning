import React from "react";
import { FC } from "react";
import { brailleToText } from "../services/brailleService";

export const BrailInEnglish: FC<{ brailleText: string }> = ({
  brailleText,
}) => {
  return <div>{brailleToText(brailleText)}</div>;
};
