import { FormFieldGroup, SingleFormField, Collection } from "../types";
import { isValidUrl } from "../utilities/validators";

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

export const shamCollection: Collection = {
  name: "Brazilian Jiu Jitsu",
  nameOfVideo: "Match",
  nameOfEvent: "Move",
  isPrivate: false,
  language: "English",
  intakeQuestions: [firstQuestion],
  excludeFromDetailList: ["intakeQuestions", "excludeFromDetailList", "formFieldGroup"],
  // formFieldGroup: shamFormFieldGroup
};
