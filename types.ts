export interface Question {
  label: string;
  type: string;
  language: string;
  isRequired: boolean;
  testId?: string;
  doNotDisplay?: string[];
  shouldBeCheckboxes?: string[];
  setValue?: (input: any)=>void,
  actualValue?: any;
  isValid?: {};
  setIsValid?: ({}) =>void;
  invalidInputMessage?: string;
  validatorMethod?: (input: any) => boolean;
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
  excludeFromDetailList: string[];
}
