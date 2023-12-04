import { FC, useEffect, useState } from "react";
import {
  Assignment,
  AssignmentStage,
  AssignmentType,
} from "../../../models/assignmentModel";
import { useCheckInput } from "../../../sharedComponents/forms/check/useCheckInput";
import { useNumberInput } from "../../../sharedComponents/forms/number/useNumberInput";
import { useRadioInput } from "../../../sharedComponents/forms/select/useRadioInput";
import { useTextInput } from "../../../sharedComponents/forms/text/useTextInput";
import { CheckInputRow } from "../../../sharedComponents/forms/check/CheckInputRow";
import { NumberInputRow } from "../../../sharedComponents/forms/number/NumberInputRow";
import { TextInputRow } from "../../../sharedComponents/forms/text/TextInputRow";
import { BrailleKeyboard } from "../../brailleKeyboard/BrailleKeyboard";
import { RadioInputRow } from "../../../sharedComponents/forms/select/RadioInputRow";

export const ManageAssignmentStage: FC<{
  assignment: Assignment;
  stage: AssignmentStage;
  updateStage: (s: AssignmentStage) => void;
  removeStage: () => void;
}> = ({ stage, removeStage, updateStage }) => {
  const textControl = useTextInput(stage.text);

  const typeToText = (i: AssignmentType) =>
    i === AssignmentType.PRINT_TO_BRAILLE
      ? "Print to Braille"
      : "Braille to Print";

  const typeControl = useRadioInput({
    initialValue: stage.type,
    options: [AssignmentType.PRINT_TO_BRAILLE, AssignmentType.BRAILLE_TO_PRINT],
    getKey: typeToText,
    required: true,
    onChange: () => textControl.setValue(""),
  });
  const pointsControl = useNumberInput(stage.points);
  const livePreviewControl = useCheckInput(stage.showLivePreview);
  const showReferenceBrailleControl = useCheckInput(stage.showReferenceBraille);
  const [referenceBrailleInput, setReferenceBrailleInput] = useState("");

  useEffect(() => {
    const newStage: AssignmentStage = {
      id: stage.id,
      assignmentId: stage.assignmentId,
      index: stage.index,
      text: textControl.value,
      points: pointsControl.value,
      showLivePreview: livePreviewControl.value,
      showReferenceBraille: showReferenceBrailleControl.value,
      referenceBraille: referenceBrailleInput,
      type: typeControl.value ?? AssignmentType.PRINT_TO_BRAILLE,
    };
    updateStage(newStage);
  }, [
    livePreviewControl.value,
    pointsControl.value,
    referenceBrailleInput,
    showReferenceBrailleControl.value,
    stage.id,
    stage.assignmentId,
    textControl.value,
    updateStage,
    typeControl.value,
    stage.index,
  ]);

  return (
    <div
      className="
        p-5 
        m-3
        rounded-lg
        dark:bg-warmGray-900
        dark:border-gray-600
      "
    >
      <h4 className="text-center">Stage</h4>
      <RadioInputRow label="Stage Type" control={typeControl} />
      {typeControl.value === AssignmentType.PRINT_TO_BRAILLE && (
        <TextInputRow label="Text" control={textControl} isTextArea={true} />
      )}

      {typeControl.value === AssignmentType.BRAILLE_TO_PRINT && (
        <BrailleKeyboard
          startingBraille={textControl.value}
          updateBrail={(b) => textControl.setValue(b)}
        />
      )}

      <hr />
      <h4 className="text-center">Assignment Options</h4>

      {typeControl.value === AssignmentType.PRINT_TO_BRAILLE && (
        <div className="flex flex-col justify-center align-center">
          <div>
            <CheckInputRow
              label="show live reference"
              control={livePreviewControl}
            />
            <CheckInputRow
              label="show reference braille"
              control={showReferenceBrailleControl}
            />
          </div>
          <div>
            {showReferenceBrailleControl.value && (
              <div>
                <BrailleKeyboard
                  startingBraille={stage.referenceBraille}
                  updateBrail={setReferenceBrailleInput}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <NumberInputRow label={"Points"} control={pointsControl} />
      <button type="button" onClick={removeStage}>
        Remove Stage
      </button>
    </div>
  );
};
