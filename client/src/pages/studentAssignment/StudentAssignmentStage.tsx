import { FC, useState } from "react";
import { AssignmentStage, AssignmentType } from "../../models/assignmentModel";
import { BrailleKeyboard } from "../brailleKeyboard/BrailleKeyboard";
import { TextInputRow } from "../../sharedComponents/forms/text/TextInputRow";
import { useTextInput } from "../../sharedComponents/forms/text/useTextInput";

export const StudentAssignmentStage: FC<{ stage: AssignmentStage }> = ({
  stage,
}) => {
  const [brailInput, setBrailInput] = useState("");
  const textControl = useTextInput("");
  return (
    <>
    <h3>Stage {stage.index}</h3>
      <div
        className="
              text-center
              rounded-lg
              m-5
              p-2
              bg-slate-200
              border-slate-300

              dark:bg-gray-700
              dark:border-gray-800
            "
      >
        <div className="text-sm">Translate the Following Text:</div>
        <div className="flex justify-center mt-2">
          <pre className="font-mono text-start">
            <strong>{stage.text}</strong>
          </pre>
        </div>
      </div>

      {stage.type === AssignmentType.PRINT_TO_BRAILLE && (
        <BrailleKeyboard updateBrail={setBrailInput} />
      )}
      {stage.type === AssignmentType.BRAILLE_TO_PRINT && (
        <>
          <TextInputRow
            label="Text Translation"
            control={textControl}
            isTextArea={true}
          />
        </>
      )}

      {stage.showReferenceBraille && (
        <>
          <div>Reference: {stage.referenceBraille}</div>
        </>
      )}
    </>
  );
};
