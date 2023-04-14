export interface Collection {
  name: string;
  nameOfVideo: string;
  nameOfEvent: string;
  isPrivate: boolean;
  language: string;
  intakeQuestions?: SingleFormField[];
  excludeFromDetailList: string[];
  formFieldGroup?: FormFieldGroup;
}

export interface FormFieldGroup {
  // shouldBeCheckboxes?: string[]; // @TODO this should be  a formGroup-level attribute
  setValues?: (input: any)=>void, // @TODO this should be  a formGroup-level attribute
  actualValues?: {}; // @TODO this should be  a formGroup-level attribute
  isInvalids?: {}; // @TODO this should be  a formGroup-level attribute
  setIsInvalids?: ({}) =>void; // @TODO this should be  a formGroup-level attribute
}

export interface SingleFormField {
  label: string;
  type: string;
  language: string;
  isRequired: boolean;
  testId?: string;
  doNotDisplay?: string[];
  invalidInputMessage?: string;
  validatorMethod?: (input: any) => boolean;
  shouldBeCheckboxes: string[];
}

export interface QuestionValidity {
  label: boolean;
  type: boolean;
  language: boolean;
}
