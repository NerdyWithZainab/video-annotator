import { FormFieldGroup, SingleFormField, Collection } from "../types";
import {
  isNonEmptyString,
  isValidOption,
  isValidUrl,
} from "../utilities/validators";

export const defaultDoNotDisplays: string[] = [
  "testId",
  "doNotDisplay",
  "shouldBeCheckboxes",

  "invalidInputMessage",
  "validatorMethods",
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
  validatorMethods: [isValidUrl],
  shouldBeCheckboxes: ["isRequired"],
};

const secondQuestion: SingleFormField = {
  label: "Tournament Name",
  type: "Autocomplete",
  language: "English",
  isRequired: true,
  testId: "tournament",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  autocompleteOptions: [],
};

const thirdQuestion: SingleFormField = {
  label: "Gi?",
  type: "Checkbox",
  language: "English",
  isRequired: true,
  testId: "isGi",
  doNotDisplay: defaultDoNotDisplays,
  validatorMethods: [],
  shouldBeCheckboxes: ["isRequired"],
};

const fourthQuestion: SingleFormField = {
  label: "Date of match",
  type: "Date",
  language: "English",
  testId: "matchDate",
  doNotDisplay: defaultDoNotDisplays,
  validatorMethods: [],
  shouldBeCheckboxes: ["isRequired"],
};

const fifthQuestion: SingleFormField = {
  label: "Name of Athlete on the Left",
  type: "Autocomplete",
  language: "English",
  isRequired: true,
  testId: "athleteLeftName",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
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
  testId: "age",
  doNotDisplay: defaultDoNotDisplays,
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [],
  invalidInputMessage: "INPUT_INVALID",
  isRequired: false,
};

const seventhQuestion: SingleFormField = {
  label: "mystery string",
  type: "Text",
  language: "English",
  isRequired: true,
  testId: "url",
  doNotDisplay: defaultDoNotDisplays,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  validatorMethods: [isNonEmptyString],
  shouldBeCheckboxes: ["isRequired"],
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
    // fifthQuestion,
    // sixthQuestion,
    // seventhQuestion,
  ],
  excludeFromDetailList: [
    "intakeQuestions",
    "excludeFromDetailList",
    "formFieldGroup",
  ],
  // formFieldGroup: shamFormFieldGroup // gets populated elsewhere now because passing useStates through different components was silly
};
