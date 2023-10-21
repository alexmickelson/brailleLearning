export interface Assignment {
  id: string;
  name: string;
  text: string;
  showLivePreview: boolean;
  showReferenceBraille: boolean;
  referenceBraille?: string;
  availableDate?: Date;
  closedDate?: Date;
}
