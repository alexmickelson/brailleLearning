export interface Submission {
  id: string;
  assignmentId: string;
  userSub: string;
  grade: number;
  secondsToComplete: number;
  submittedText?: string;
  submittedDate: Date;
  gradedByUserName?: string;
}
