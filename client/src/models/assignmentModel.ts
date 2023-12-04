export interface Assignment {
  id: string;
  name: string;
  availableDate?: Date;
  closedDate?: Date;
  prereqAssignmentIds: string[];
  stages: AssignmentStage[];
}

export interface AssignmentStage {
  id: string;
  assignmentId: string;
  text: string;
  points: number;
  showLivePreview: boolean;
  showReferenceBraille: boolean;
  referenceBraille?: string;
  type: AssignmentType;
  index: number;
}

export enum AssignmentType {
  BRAILLE_TO_PRINT = "braille_to_print",
  PRINT_TO_BRAILLE = "print_to_braille",
}
