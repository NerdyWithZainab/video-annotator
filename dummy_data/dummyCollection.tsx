import { FormFieldGroup, SingleFormField, Collection } from "../types";
import { isNonEmptyString, isValidUrl } from "../utilities/validators";

const firstQuestion: SingleFormField = {
  label: "URL",
  type: "URL",
  language: "English",
  isRequired: true,
  testId: "url",
  doNotDisplay: [],
  invalidInputMessage: "MUST_BE_VALID_URL",
  validatorMethod: isValidUrl,
  shouldBeCheckboxes: ["isRequired"]
};

const secondQuestion: SingleFormField = {
  label: "Tournament Name",
  type: "Text",
  language: "English",
  isRequired: true,
  testId: "tournament",
  doNotDisplay: [],
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  validatorMethod: isNonEmptyString,
  shouldBeCheckboxes: ["isRequired"]
};

export const shamCollection: Collection = {
  name: "Brazilian Jiu Jitsu",
  nameOfVideo: "Match",
  nameOfEvent: "Move",
  isPrivate: false,
  language: "English",
  intakeQuestions: [firstQuestion, secondQuestion],
  excludeFromDetailList: ["intakeQuestions", "excludeFromDetailList", "formFieldGroup"],
  // formFieldGroup: shamFormFieldGroup
};
