
import { FC } from "react";
import { brailleToText } from "../../services/brailleService";

export const BrailleInEnglish: FC<{ brailleText: string }> = ({
  brailleText,
}) => {
  return <div>{brailleToText(brailleText)}</div>;
};
