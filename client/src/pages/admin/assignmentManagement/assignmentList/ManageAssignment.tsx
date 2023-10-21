import React, { FC, useState } from "react";
import { Assignment } from "../../../../models/assignmentModel";
import {
  useTextInput,
  TextInputRow,
} from "../../../../sharedComponents/forms/TextInputRow";
import { useUpdateAssignmentMutation } from "../../adminHooks";
import {
  CheckInputRow,
  useCheckInput,
} from "../../../../sharedComponents/forms/CheckInputRow";
import { BrailleKeyboard } from "../../../brailleKeyboard/BrailleKeyboard";
import DatePicker from "react-datepicker";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const updateAssignmentMutation = useUpdateAssignmentMutation(assignment.id);
  const nameControl = useTextInput(assignment.name);
  const textControl = useTextInput(assignment.text);
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
      })
      .then(() => onSaveCallback());
  };

  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form onSubmit={submitHandler}>
        <TextInputRow label="Assignment Name" control={nameControl} />
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
          <button className="m-3">Save</button>
        </div>
      </form>
    </div>
  );
};
