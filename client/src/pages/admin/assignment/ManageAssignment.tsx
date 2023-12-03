import { FC, useCallback, useState } from "react";
import {
  Assignment,
  AssignmentStage,
  AssignmentType,
} from "../../../models/assignmentModel";
import { TextInputRow } from "../../../sharedComponents/forms/text/TextInputRow";
import { useTextInput } from "../../../sharedComponents/forms/text/useTextInput";
import DatePicker from "react-datepicker";
import {
  useAddStageMutation,
  useDeleteAssignmentMutation,
  useUpdateAssignmentMutation,
} from "../adminAssignmentHooks";
import { useNavigate } from "react-router-dom";
import { Spinner } from "../../../sharedComponents/Spinner";
import { ManageAssignmentStage } from "./ManageAssignmentStage";

export const ManageAssignment: FC<{
  assignment: Assignment;
  onSaveCallback: () => void;
}> = ({ assignment, onSaveCallback }) => {
  const navigate = useNavigate();
  const updateAssignmentMutation = useUpdateAssignmentMutation(assignment.id);
  const deleteAssignmentMutation = useDeleteAssignmentMutation(assignment.id);
  const addStageMutation = useAddStageMutation(assignment.id);
  const nameControl = useTextInput(assignment.name);

  const [availableDate, setAvailableDate] = useState<Date | undefined>(
    assignment.availableDate
  );
  const [closedDate, setClosedDate] = useState<Date | undefined>(
    assignment.closedDate
  );

  console.log(assignment.stages)
  const [inProgressStages, setInProgressStages] = useState(assignment.stages);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    updateAssignmentMutation
      .mutateAsync({
        ...assignment,
        name: nameControl.value,
        availableDate: availableDate,
        closedDate: closedDate,
        stages: inProgressStages,
      })
      .then(() => onSaveCallback());
  };

  const updateStage = useCallback((s: AssignmentStage) => {
    setInProgressStages((oldStages) =>
      oldStages.map((oldStage) => (oldStage.id === s.id ? s : oldStage))
    );
  }, []);
  return (
    <div className="m-auto">
      <h3 className="text-center">Update Assignment</h3>
      <form onSubmit={submitHandler}>
        <TextInputRow label="Assignment Name" control={nameControl} />

        {inProgressStages.map((stage) => (
          <ManageAssignmentStage
            key={stage.id}
            assignment={assignment}
            stage={stage}
            updateStage={updateStage}
            removeStage={() => {
              setInProgressStages((stageList) =>
                stageList.filter((s) => s.id !== stage.id)
              );
            }}
          />
        ))}
        <button
          onClick={() =>
            addStageMutation
              .mutateAsync()
              .then((d) => setInProgressStages((list) => [...list, d]))
          }
          disabled={addStageMutation.isPending}
          type="button"
        >
          Add Stage
        </button>
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
