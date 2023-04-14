export interface Collection {
  name: string;
  nameOfVideo: string;
  nameOfEvent: string;
  isPrivate: boolean;
  language: string;
  intakeQuestions?: Question[];
  excludeFromDetailList: string[];
}
export interface Question {
  label: string;
  type: string;
  language: string;
  isRequired: boolean;
  testId?: string;
  doNotDisplay?: string[];
  shouldBeCheckboxes?: string[]; // @TODO this should be  a formGroup-level attribute
  setValue?: (input: any)=>void, // @TODO this should be  a formGroup-level attribute
  actualValue?: any; // @TODO this should be  a formGroup-level attribute
  isValid?: {}; // @TODO this should be  a formGroup-level attribute
  setIsValid?: ({}) =>void; // @TODO this should be  a formGroup-level attribute
  invalidInputMessage?: string;
  validatorMethod?: (input: any) => boolean;
}

export interface QuestionValidity {
  label: boolean;
  type: boolean;
  language: boolean;
}
