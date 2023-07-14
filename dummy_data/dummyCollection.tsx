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

// const fifthQuestion: SingleFormField = { // deprecated. Individuals are getting attached to each video directly as a separate step in video intake.
//   label: "Name of Athlete on the Left",
//   type: "Autocomplete",
//   language: "English",
//   isRequired: true,
//   testId: "athleteLeftName",
//   doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
//   shouldBeCheckboxes: ["isRequired"],
//   validatorMethods: [isNonEmptyString],
//   invalidInputMessage: "INPUT_INVALID",
//   autocompleteOptions: [
//     "Fisher, Mark",
//     "Deodara, Dirt",
//     "Ziegler, Eddie",
//     "Diggins, John",
//   ],
//   usersCanAddCustomOptions: true,
// };

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

const lastNameIndividualQuestion: SingleFormField = {
  label: "Last Name",
  type: "Text",
  language: "English",
  isRequired: true,
  testId: "url",
  doNotDisplay: defaultDoNotDisplays,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  validatorMethods: [isNonEmptyString],
  shouldBeCheckboxes: ["isRequired"],
};

const firstNameIndividualQuestion: SingleFormField = {
  label: "First Name",
  type: "Text",
  language: "English",
  isRequired: true,
  testId: "url",
  doNotDisplay: defaultDoNotDisplays,
  invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
  validatorMethods: [isNonEmptyString],
  shouldBeCheckboxes: ["isRequired"],
};

const genderIndividualQuestion: SingleFormField = {
  label: "Gender",
  type: "Autocomplete",
  language: "English",
  isRequired: false,
  testId: "gender",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
  autocompleteOptions: [
    "Male",
    "Female",
    "Trans Male",
    "Trans Female",
    "Non-binary",
  ],
  usersCanAddCustomOptions: false,
};

const giRankIndividualQuestion: SingleFormField = {
  label: "Gi Rank",
  type: "Autocomplete",
  language: "English",
  isRequired: false,
  testId: "giRank",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
  autocompleteOptions: ["White", "Blue", "Purple", "Brown", "Black"],
  usersCanAddCustomOptions: true,
};

const noGiRankIndividualQuestion: SingleFormField = {
  label: "No Gi Rank",
  type: "Autocomplete",
  language: "English",
  isRequired: false,
  testId: "noGiRank",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
  autocompleteOptions: ["Novice", "Intermediate", "Advanced", "Elite"],
  usersCanAddCustomOptions: true,
};

const weightClassIndividualQuestion: SingleFormField = {
  label: "Weight Class",
  type: "Autocomplete",
  language: "English",
  isRequired: false,
  testId: "weightClass",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
  autocompleteOptions: [
    "+60 kg",
    "+99 kg",
    "-60 kg",
    "-66 kg",
    "-88 kg",
    "-99 kg",
    "Absolute; Open Class",
    "Bantam",
    "Catchweight",
    "Feather",
    "Heavy",
    "Light",
    "Light-feather",
    "Medium-heavy",
    "Middle",
    "Rooster",
    "Welterweight",
    "Unknown",
  ],
  usersCanAddCustomOptions: true,
};

const ageClassIndividualQuestion: SingleFormField = {
  label: "Age Class",
  type: "Autocomplete",
  language: "English",
  isRequired: false,
  testId: "ageClass",
  doNotDisplay: [...defaultDoNotDisplays, "autocompleteOptions"],
  shouldBeCheckboxes: ["isRequired"],
  validatorMethods: [isNonEmptyString],
  invalidInputMessage: "INPUT_INVALID",
  autocompleteOptions: [
    "Adult",
    "Juvenile 1",
    "Juvenile 2",
    "Master 1",
    "Master 2",
    "Master 3",
    "Master 4",
    "Master 5",
    "Master 6",
    "Unknown",
    "Youth",
  ],
  usersCanAddCustomOptions: true,
};

export const shamCollection: Collection = {
  name: "Brazilian Jiu Jitsu",
  nameOfVideo: "Match",
  nameOfEvent: "Move",
  isPrivate: false,
  language: "English",
  videoIntakeQuestions: [
    firstQuestion,
    secondQuestion,
    thirdQuestion,
    fourthQuestion,
    // fifthQuestion,
    sixthQuestion,
    // seventhQuestion,
  ],
  individualIntakeQuestions: [
    lastNameIndividualQuestion,
    firstNameIndividualQuestion,
    genderIndividualQuestion,
    giRankIndividualQuestion,
    noGiRankIndividualQuestion,
    weightClassIndividualQuestion,
    ageClassIndividualQuestion,
  ],
  excludeFromDetailList: [
    "videoIntakeQuestions",
    "individualIntakeQuestions",
    "excludeFromDetailList",
    "videoQuestionsFormFieldGroup",
    "individualQuestionsFormFieldGroup",
  ],
  // formFieldGroup: shamFormFieldGroup // gets populated elsewhere now because passing useStates through different components was silly
};
