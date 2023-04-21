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
  // shouldBeCheckboxes?: string[]; // @TODO figure out whether this is needed and whether it's part of the FormFieldGroup
  setValues?: (input: any) => void;
  actualValues?: {};
  isInvalids?: {};
  setIsInvalids?: ({}) => void;
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
  autocompleteOptions?: string[];
  autocompleteExtras?: {};
}

export interface QuestionValidity {
  label: boolean;
  type: boolean;
  language: boolean;
}
