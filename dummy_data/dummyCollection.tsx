import { FormFieldGroup, SingleFormField, Collection } from "../types";
import { isNonEmptyString, isValidUrl } from "../utilities/validators";

export const defaultDoNotDisplays: string[] = [
  "testId",
  "doNotDisplay",
  "shouldBeCheckboxes",
];

const firstQuestion: SingleFormField = {
  label: "URL",
  type: "URL",
  language: "English",
  isRequired: true,
  testId: "url",
  doNotDisplay: defaultDoNotDisplays,
  invalidInputMessage: "MUST_BE_VALID_URL",
  validatorMethod: isValidUrl,
  shouldBeCheckboxes: ["isRequired"],
};

const secondQuestion: SingleFormField = {
  // @TODO make autocomplete
  label: "Tournament Name",
  type: "Text",
  language: "English",
  isRequired: true,
  testId: "tournament",
  doNotDisplay: defaultDoNotDisplays,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  validatorMethod: isNonEmptyString,
  shouldBeCheckboxes: ["isRequired"],
};

const thirdQuestion: SingleFormField = {
  label: "Gi?",
  type: "Checkbox",
  language: "English",
  isRequired: true,
  testId: "isGi",
  doNotDisplay: defaultDoNotDisplays,
  shouldBeCheckboxes: ["isRequired"],
};

const fourthQuestion: SingleFormField = {
  label: "Date of match",
  type: "Date",
  language: "English",
  testId: "matchDate",
  doNotDisplay: defaultDoNotDisplays,
  shouldBeCheckboxes: ["isRequired"],
};

const fifthQuestion: SingleFormField = {
  label: "Name of Athlete on the Left",
  type: "Autocomplete",
  language: "English",
  isRequired: true,
  testId: "athleteLeftName",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteExtras"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethod: isNonEmptyString,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  autocompleteOptions: [
    "Fisher, Mark",
    "Deodara, Dirt",
    "Ziegler, Eddie",
    "Diggins, John",
  ],
  usersCanAddCustomOptions: true,
};

const sixthQuestion: SingleFormField = {
  label: "Age",
  type: "Number",
  language: "English",
  // isRequired: true,
  testId: "age",
  doNotDisplay: defaultDoNotDisplays,
  shouldBeCheckboxes: ["isRequired"],
  // validatorMethod: isNonEmptyString,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  isRequired: false,
};

export const shamCollection: Collection = {
  name: "Brazilian Jiu Jitsu",
  nameOfVideo: "Match",
  nameOfEvent: "Move",
  isPrivate: false,
  language: "English",
  intakeQuestions: [
    // firstQuestion,
    // secondQuestion,
    // thirdQuestion,
    // fourthQuestion,
    fifthQuestion,
    // sixthQuestion,
  ],
  excludeFromDetailList: [
    "intakeQuestions",
    "excludeFromDetailList",
    "formFieldGroup",
  ],
  // formFieldGroup: shamFormFieldGroup // gets populated elsewhere now because passing useStates through different components was silly
};
