export interface Assignment {
  id: string;
  name: string;
  text: string;
  points: number;
  showLivePreview: boolean;
  showReferenceBraille: boolean;
  referenceBraille?: string;
  availableDate?: Date;
  closedDate?: Date;
  type: AssignmentType;
}

export enum AssignmentType {
  BRAILLE_TO_PRINT = "braille_to_print",
  PRINT_TO_BRAILLE = "print_to_braille",
}
