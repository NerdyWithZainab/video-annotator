import { filter, forEach, get, map, reduce } from "lodash-es";
import { IntlShape } from "react-intl";
import formFieldConfig from "../formFieldConfig.json";
import { SingleFormField, Collection, FormFieldGroup } from "../types";
import { isNonEmptyString, isValidEmail, isValidOption } from "./validators";

export function calculateCurrentAttributesToDisplay(question: SingleFormField) {
  const currentTypeConfig = filter(formFieldConfig, (entry) => {
    const matches: boolean = entry?.type === question?.type;
    return matches;
  });
  const currentAttributesToDisplay: string[] = get(
    currentTypeConfig,
    [0, "attributesToDisplay"],
    []
  );
  return currentAttributesToDisplay;
}

export function updateCollection(
  collection: Collection,
  questionIdx: number,
  questionKey: string,
  newVal: any,
  setCollection: (collection: any) => void
) {
  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", questionIdx],
    {}
  );
  const modifiedQuestion: any = {
    ...targetQuestion,
    [questionKey]: newVal,
  };
  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[questionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}

export function updateFormFieldStates(
  currentVal: any,
  defaultValidValue: boolean = false,
  formFieldGroup: FormFieldGroup | undefined,
  question: SingleFormField
) {
  const setVals: any = get(formFieldGroup, ["setValues"], null);
  if (Boolean(setVals)) {
    setVals((prevState: {}) => {
      const returnVal: {} = {
        ...prevState,
        [question.label]: currentVal,
      };
      return returnVal;
    });
  }

  let currentValidatorMethods = question.validatorMethods;
  if (question?.isRequired && question?.type !== "Checkbox") {
    currentValidatorMethods?.push(isNonEmptyString);
  }

  const currentOpts = question?.autocompleteOptions;

  const usersCanAddCustomOptions: boolean | undefined =
    question?.usersCanAddCustomOptions;
  if (!usersCanAddCustomOptions && question?.type === "Autocomplete") {
    currentValidatorMethods?.push(isValidOption);
  }

  const validCounter: number = reduce(
    currentValidatorMethods,
    (memo, validatorMethod) => {
      return memo + Number(validatorMethod(currentVal, currentOpts));
    },
    0
  ); // || defaultValidValue; // @TODO if the map value evaluates to false, will the default give us what we expect?
  const currentFormIsInvalid: boolean =
    validCounter < (currentValidatorMethods?.length || 0);
  // ? !question.validatorMethod(currentVal)
  // : defaultValidValue;

  // @TODO LEFT OFF HERE DECIDING WHETHER YOU WANTED TO SUBFUNCTIONALIZE THE VALIDATION STATE UPDATES

  const validationStateAndLabelExist: boolean = Boolean(
    formFieldGroup?.isInvalids && question?.label
  );

  validationStateAndLabelExist && formFieldGroup?.setIsInvalids
    ? formFieldGroup.setIsInvalids({
        ...formFieldGroup.isInvalids,
        [question.label]: currentFormIsInvalid,
      })
    : undefined;
}

export function clearAllOptionFields(optionFormFieldGroup: FormFieldGroup) {
  const preExistingActualVals = get(optionFormFieldGroup, ["actualValues"]);
  const purgedActualVals = reduce(
    preExistingActualVals,
    (memo, currentVal, currentKey) => {
      if (currentKey.startsWith("Option")) {
        return { ...memo };
      } else {
        return { ...memo, [currentKey]: currentVal };
      }
    },
    {}
  );
  optionFormFieldGroup?.setValues
    ? optionFormFieldGroup.setValues(purgedActualVals)
    : undefined;
}

export function updateOptionFormFieldGroupWithOptionList(
  options: string[],
  optionFormFieldGroup: FormFieldGroup
) {
  //first, remove all existing options
  clearAllOptionFields(optionFormFieldGroup);
  forEach(options, (option, optionIdx) => {
    const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option }; // @TODO somehow shunt part of this to en.json
    optionFormFieldGroup?.setValues
      ? optionFormFieldGroup.setValues((prevState: {}) => {
          return { ...prevState, ...newActualValue };
        })
      : undefined;
  });
}

export function calculateWhetherCustomOptionValuesArePermitted(
  optionFormFieldGroup: FormFieldGroup,
  intl: IntlShape
) {
  const canEndUserAddCustomOptionsValsArr: string[] = filter(
    optionFormFieldGroup?.actualValues || {},
    (_optionFormFieldGroupValue, optionFormFieldGroupKey) => {
      const targetString: string = intl.formatMessage({
        id: "CAN_END_USER_ADD_CUSTOM_OPTIONS_SHORT",
        defaultMessage:
          "Can video annotators in this collection add their own options?",
      });
      return optionFormFieldGroupKey.startsWith(targetString);
    }
  );
  const canEndUserAddCustomOptionsVals = get(
    canEndUserAddCustomOptionsValsArr,
    [0],
    true
  );

  return canEndUserAddCustomOptionsVals;
}

export function updateIsRequiredUnchecked(
  formFieldGroup: FormFieldGroup,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void
) {
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: false, // @TODO this might be too soft-coded. Maybe make explicit that this is the "isRequired" key?
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", intakeQuestionIdx],
    {}
  );
  const currentValidatorMethods: ((input: any) => boolean)[] = get(
    targetQuestion,
    ["validatorMethods"],
    []
  );

  const filteredMethods = filter(
    currentValidatorMethods,
    (currentValidatorMethod) => {
      return (
        currentValidatorMethod !== isNonEmptyString //||
        // currentValidatorMethod !== isValidEmail
      );
    }
  );

  const modifiedQuestion: any = {
    ...targetQuestion,
    [intakeQuestionKey]: !intakeQuestionEl,
    validatorMethods: filteredMethods,
  };

  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}

export function updateIsRequiredChecked(
  formFieldGroup: FormFieldGroup,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void
) {
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: true, // @TODO this might be too soft-coded. Maybe make explicit that this is the "isRequired" key?
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", intakeQuestionIdx],
    {}
  );
  console.log("deleteMe targetQuestion is: ");
  console.log(targetQuestion);
  const currentValidatorMethods: ((input: any) => boolean)[] = get(
    targetQuestion,
    ["validatorMethods"],
    []
  );

  const filteredMethods: ((input: any) => boolean)[] = filter(
    currentValidatorMethods,
    (currentValidatorMethod) => {
      return currentValidatorMethod !== isNonEmptyString;
    }
  );

  const validatorMethodsWithIsNonEmptyStringReinstated: ((
    input: any
  ) => boolean)[] = [...filteredMethods, isNonEmptyString];

  const modifiedQuestion: any = {
    ...targetQuestion,
    [intakeQuestionKey]: !intakeQuestionEl,
    validatorMethods: validatorMethodsWithIsNonEmptyStringReinstated,
  };

  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}

export function updateUsersCanAddCustomOptionsUnchecked(
  formFieldGroup: FormFieldGroup,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void
) {
  console.log("deleteMe updateUsersCanAddCustomOptionsChecked entered");
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    console.log("deleteMe got here a1");
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: true, // @TODO this might be too soft-coded. Maybe make explicit that this is the "isRequired" key?
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", intakeQuestionIdx],
    {}
  );
  console.log("deleteMe targetQuestion is: ");
  console.log(targetQuestion);
  const currentValidatorMethods: ((input: any) => boolean)[] = get(
    targetQuestion,
    ["validatorMethods"],
    []
  );
  console.log("deleteMe currentValidatorMethods are: ");
  console.log(currentValidatorMethods);

  const filteredMethods: ((input: any) => boolean)[] = filter(
    currentValidatorMethods,
    (currentValidatorMethod) => {
      return currentValidatorMethod !== isValidOption;
    }
  );
  console.log("deleteMe filteredMethods are: ");
  console.log(filteredMethods);

  const validatorMethodsWithIsValidOptionReinstated: ((
    input: any,
    opts?: any
  ) => boolean)[] = [...filteredMethods, isValidOption];

  const modifiedQuestion: any = {
    ...targetQuestion,
    [intakeQuestionKey]: !intakeQuestionEl,
    validatorMethods: validatorMethodsWithIsValidOptionReinstated,
  };

  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}

export function updateUsersCanAddCustomOptionsChecked(
  formFieldGroup: FormFieldGroup,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void
) {
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: false, // @TODO this might be too soft-coded. Maybe make explicit that this is the "isRequired" key?
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", intakeQuestionIdx],
    {}
  );
  const currentValidatorMethods: ((input: any) => boolean)[] = get(
    targetQuestion,
    ["validatorMethods"],
    []
  );

  const filteredMethods = filter(
    currentValidatorMethods,
    (currentValidatorMethod) => {
      return currentValidatorMethod !== isValidOption;
    }
  );

  const modifiedQuestion: any = {
    ...targetQuestion,
    [intakeQuestionKey]: !intakeQuestionEl,
    validatorMethods: filteredMethods,
  };

  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}

export function updateCheckboxGeneral(
  formFieldGroup: FormFieldGroup,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  checkVal: boolean,
  vaildatorMethodToFilter: (input: any, optionalInput?: any) => boolean
) {
  const shouldReinstateValidator: boolean = checkVal === true;
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: checkVal,
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", intakeQuestionIdx],
    {}
  );
  const currentValidatorMethods: ((input: any) => boolean)[] = get(
    targetQuestion,
    ["validatorMethods"],
    []
  );

  const filteredMethods = filter(
    currentValidatorMethods,
    (currentValidatorMethod) => {
      return currentValidatorMethod !== vaildatorMethodToFilter;
    }
  );

  const validatorMethodsWithFilteredMethodReinstated: ((
    input: any,
    options?: any
  ) => boolean)[] = [...filteredMethods, vaildatorMethodToFilter];

  const modifiedQuestion: any = {
    ...targetQuestion,
    [intakeQuestionKey]: !intakeQuestionEl,
    validatorMethods: shouldReinstateValidator
      ? validatorMethodsWithFilteredMethodReinstated
      : filteredMethods,
  };

  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
}
