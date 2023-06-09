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
  title: string;
  setValues?: (input: any) => void;
  actualValues?: any;
  isInvalids?: any;
  setIsInvalids?: (input: any) => void;
}

export interface SingleFormField {
  label: string;
  type: string;
  language: string;
  isRequired?: boolean;
  testId?: string;
  doNotDisplay?: string[];
  invalidInputMessage?: string;
  validatorMethods: ((input: any, optionalInput?: any) => boolean)[];
  shouldBeCheckboxes: string[];
  autocompleteOptions?: string[];
  usersCanAddCustomOptions?: boolean;
  autocompleteExtras?: {};
}

export interface QuestionValidity {
  label: boolean;
  type: boolean;
  language: boolean;
}
