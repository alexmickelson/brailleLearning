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
}
