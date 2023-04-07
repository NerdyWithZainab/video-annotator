export interface Question {
  label: string;
  type: string;
  language: string;
  isRequired: boolean;
  testId: string;
}

export interface QuestionValidity {
  label: boolean;
  type: boolean;
  language: boolean;
}

export interface Collection {
  name: string;
  nameOfVideo: string;
  nameOfEvent: string;
  isPrivate: boolean;
  language: string;
  intakeQuestions?: Question[];
}
