import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { TextInputRow } from "../../../sharedComponents/forms/text/TextInputRow";
import { useTextInput } from "../../../sharedComponents/forms/text/useTextInput";
import { Spinner } from "../../../sharedComponents/Spinner";
import { useCreateAssignmentMutation } from "../adminAssignmentHooks";

export const NewAssignment = () => {
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  return (
    <>
      {!showNewAssignment && (
        <button onClick={() => setShowNewAssignment(true)}>
          Add Assignment?
        </button>
      )}
      {showNewAssignment && (
        <>
          <button className="" onClick={() => setShowNewAssignment(false)}>
            Hide New Assignment
          </button>
          <NewAssignmentForm onSubmit={() => setShowNewAssignment(false)} />
        </>
      )}
    </>
  );
};

const NewAssignmentForm: FC<{ onSubmit: () => void }> = ({ onSubmit }) => {
  const createMutation = useCreateAssignmentMutation();
  const nameControl = useTextInput("", {
    min: 3,
    max: 30,
    required: true,
  });
  return (
    <div
      className="
        m-3
        p-3
        border-4 
        rounded-xl

        bg-slate-200 
        text-slate-700
        dark:bg-gray-700
        dark:text-gray-50
      "
    >
      <h5 className="text-center">Create a New Assignment</h5>
      <hr />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (nameControl.error) {
            toast.error("Cannot create assignment, form is invalid");
            return;
          }
          createMutation
            .mutateAsync({
              name: nameControl.value,
            })
            .then(onSubmit);
        }}
      >
        <div className="grid grid-cols-3">
          <div className="col-start-2">
            <TextInputRow label="Name" control={nameControl} />
          </div>
        </div>
        <div className="flex justify-center m-3">
          <button disabled={createMutation.isPending}>Submit</button>
          {createMutation.isPending && <Spinner />}
        </div>
      </form>
    </div>
  );
};
