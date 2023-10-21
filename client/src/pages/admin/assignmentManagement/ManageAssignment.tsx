import { FC, useState } from "react";
import { Assignment } from "../../../models/assignmentModel";
import { TextInputRow } from "../../../sharedComponents/forms/TextInputRow";
import { useTextInput } from "../../../sharedComponents/forms/useTextInput";
import { CheckInputRow } from "../../../sharedComponents/forms/CheckInputRow";
import { useCheckInput } from "../../../sharedComponents/forms/useCheckInput";
import { BrailleKeyboard } from "../../brailleKeyboard/BrailleKeyboard";
import DatePicker from "react-datepicker";
import {
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from "../adminAssignmentHooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useNumberInput } from "../../../sharedComponents/forms/useNumberInput";
import { NumberInputRow } from "../../../sharedComponents/forms/NumberInputRow";
import { useSelectInput } from "../../../sharedComponents/forms/useSelectInput";
import { SelectInputRow } from "../../../sharedComponents/forms/SelectInputRow";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const navigate = useNavigate();
  const updateAssignmentMutation = useUpdateAssignmentMutation(assignment.id);
  const deleteAssignmentMutation = useDeleteAssignmentMutation(assignment.id);
  const typeControl = useSelectInput({
    options: ["Text to Braille", "Braille to Text"],
    getKey: (i) => i,
    required: true,
  });
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);
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
      })
      .then(() => onSaveCallback());
  };

  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form onSubmit={submitHandler}>
        <TextInputRow label="Assignment Name" control={nameControl} />
        <SelectInputRow label="Assignment Type" control={typeControl} />
        <TextInputRow label="Text" control={textControl} isTextArea={true} />

        <hr />
        <h4 className="text-center">Assignment Options</h4>
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
            <NumberInputRow label={"Points"} control={pointsControl} />
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
