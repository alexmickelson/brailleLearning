export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  grade: number;
  secondsToComplete: number;
  submittedText?: string;
  submittedDate: Date;
}
