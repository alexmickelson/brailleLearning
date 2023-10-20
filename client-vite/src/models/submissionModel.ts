export interface Submission {
  id: string;
  assignmentId: string;
  userId: string;
  grade: number;
  submittedText?: string;
  submittedDate: Date;
}
