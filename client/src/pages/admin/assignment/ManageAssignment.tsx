import { FC, useState } from "react";
import { Assignment, AssignmentType } from "../../../models/assignmentModel";
import { TextInputRow } from "../../../sharedComponents/forms/text/TextInputRow";
import { useTextInput } from "../../../sharedComponents/forms/text/useTextInput";
import { CheckInputRow } from "../../../sharedComponents/forms/check/CheckInputRow";
import { useCheckInput } from "../../../sharedComponents/forms/check/useCheckInput";
import { BrailleKeyboard } from "../../brailleKeyboard/BrailleKeyboard";
import DatePicker from "react-datepicker";
import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from "../adminAssignmentHooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useNumberInput } from "../../../sharedComponents/forms/number/useNumberInput";
import { NumberInputRow } from "../../../sharedComponents/forms/number/NumberInputRow";
import { useRadioInput } from "../../../sharedComponents/forms/select/useRadioInput";
import { RadioInputRow } from "../../../sharedComponents/forms/select/RadioInputRow";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const navigate = useNavigate();
  const updateAssignmentMutation = useUpdateAssignmentMutation(assignment.id);
  const deleteAssignmentMutation = useDeleteAssignmentMutation(assignment.id);
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);

  const typeToText = (i: AssignmentType) =>
    i === AssignmentType.PRINT_TO_BRAILLE
      ? "Print to Braille"
      : "Braille to Print";

  const typeControl = useRadioInput({
    initialValue: assignment.type,
    options: [AssignmentType.PRINT_TO_BRAILLE, AssignmentType.BRAILLE_TO_PRINT],
    getKey: typeToText,
    required: true,
    onChange: () => textControl.setValue(""),
  });
  const pointsControl = useNumberInput(assignment.points);
  const livePreviewControl = useCheckInput(assignment.showLivePreview);
  const showReferenceBrailleControl = useCheckInput(
    assignment.showReferenceBraille
  );
  const [referenceBrailleInput, setReferenceBrailleInput] = useState("");
  const [availableDate, setAvailableDate] = useState<Date | undefined>(
    assignment.availableDate
  );
  const [closedDate, setClosedDate] = useState<Date | undefined>(
    assignment.closedDate
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateAssignmentMutation
      .mutateAsync({
        ...assignment,
        name: nameControl.value,
        text: textControl.value,
        showLivePreview: livePreviewControl.value,
        showReferenceBraille: showReferenceBrailleControl.value,
        referenceBraille: referenceBrailleInput,
        availableDate: availableDate,
        closedDate: closedDate,
        points: pointsControl.value,
        type: typeControl.value ?? AssignmentType.PRINT_TO_BRAILLE,
      })
      .then(() => onSaveCallback());
  };

  console.log(assignment);
  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form onSubmit={submitHandler}>
        <TextInputRow label="Assignment Name" control={nameControl} />
        <RadioInputRow label="Assignment Type" control={typeControl} />
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
                    startingBraille={assignment.referenceBraille}
                    updateBrail={setReferenceBrailleInput}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        <NumberInputRow label={"Points"} control={pointsControl} />
        <div className="w-100 mt-3">
          <label>Available Date</label>
          <DatePicker
            showIcon
            selected={availableDate}
            onChange={(date) => setAvailableDate(date ? date : undefined)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>
        <div className="w-100 mt-3">
          <label>Closed Date</label>
          <DatePicker
            showIcon
            selected={closedDate}
            onChange={(date) => setClosedDate(date ? date : undefined)}
            showTimeSelect
            dateFormat="Pp"
          />
        </div>

        <hr />

        <div className="flex justify-center">
          <button
            className="m-3"
            type="button"
            disabled={
              deleteAssignmentMutation.isPending ||
              updateAssignmentMutation.isPending
            }
            onClick={() =>
              deleteAssignmentMutation
                .mutateAsync()
                .then(() => navigate("/admin"))
            }
          >
            Delete
          </button>
          <button
            className="m-3"
            disabled={
              deleteAssignmentMutation.isPending ||
              updateAssignmentMutation.isPending
            }
          >
            Save
          </button>
          {deleteAssignmentMutation.isPending && <Spinner />}
          {updateAssignmentMutation.isPending && <Spinner />}
        </div>
      </form>
    </div>
  );
};
