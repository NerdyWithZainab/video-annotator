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
  setCollection: (collection: any) => void,
  whichIntakeQuestions: string
) {
  const targetQuestion: SingleFormField = get(
    collection,
    [whichIntakeQuestions, questionIdx],
    {}
  );
  const modifiedQuestion: any = {
    ...targetQuestion,
    [questionKey]: newVal,
  };
  const newIntakeQuestionSet: SingleFormField[] = get(
    collection,
    [whichIntakeQuestions],
    []
  );
  newIntakeQuestionSet[questionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    // console.log("deleteMe");
    return { ...prevState, [whichIntakeQuestions]: newIntakeQuestionSet };
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

  // @TODO DECIDE WHETHER YOU WANTED TO SUBFUNCTIONALIZE THE VALIDATION STATE UPDATES

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

export function clearAllOptionFields(
  preExistingVals: {},
  optionQueryStr: string
) {
  const purgedActualVals = reduce(
    preExistingVals,
    (memo, currentVal, currentKey) => {
      if (currentKey.startsWith(optionQueryStr)) {
        return { ...memo };
      } else {
        return { ...memo, [currentKey]: currentVal };
      }
    },
    {}
  );
  return purgedActualVals;
}

export function updateOptionFormFieldGroupWithOptionList(
  options: string[],
  optionFormFieldGroup: FormFieldGroup
) {
  //first, remove all existing options
  const cleanedActualVals: {} = clearAllOptionFields(
    get(optionFormFieldGroup, ["actualValues"]),
    "Option"
  );
  if (optionFormFieldGroup.setValues) {
    optionFormFieldGroup.setValues(cleanedActualVals);
  }
  forEach(options, (option, optionIdx) => {
    const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option }; // @TODO somehow shunt part of this to en.json
    if (optionFormFieldGroup.setValues) {
      optionFormFieldGroup.setValues((prevState: {}) => {
        const returnVal = { ...prevState, ...newActualValue };
        return returnVal;
      });
    }
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
  formFieldGroupString: string,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  whichIntakeQuestions: string
) {
  updateCheckboxGeneral(
    formFieldGroup,
    formFieldGroupString,
    wholeQuestion,
    collection,
    intakeQuestionIdx,
    intakeQuestionKey,
    intakeQuestionEl,
    setCollection,
    false,
    isNonEmptyString,
    whichIntakeQuestions
  );
}

export function updateIsRequiredChecked(
  formFieldGroup: FormFieldGroup,
  formFieldGroupString: string,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  whichIntakeQuestions: string
) {
  updateCheckboxGeneral(
    formFieldGroup,
    formFieldGroupString,
    wholeQuestion,
    collection,
    intakeQuestionIdx,
    intakeQuestionKey,
    intakeQuestionEl,
    setCollection,
    true,
    isNonEmptyString,
    whichIntakeQuestions
  );
}

export function updateUsersCanAddCustomOptionsUnchecked(
  formFieldGroup: FormFieldGroup,
  formFieldGroupString: string,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  whichIntakeQuestions: string
) {
  updateCheckboxGeneral(
    formFieldGroup,
    formFieldGroupString,
    wholeQuestion,
    collection,
    intakeQuestionIdx,
    intakeQuestionKey,
    intakeQuestionEl,
    setCollection,
    true,
    isValidOption,
    whichIntakeQuestions
  );
}

export function updateUsersCanAddCustomOptionsChecked(
  formFieldGroup: FormFieldGroup,
  formFieldGroupString: string,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  whichIntakeQuestions: string
) {
  updateCheckboxGeneral(
    formFieldGroup,
    formFieldGroupString,
    wholeQuestion,
    collection,
    intakeQuestionIdx,
    intakeQuestionKey,
    intakeQuestionEl,
    setCollection,
    false,
    isValidOption,
    whichIntakeQuestions
  );
}

export function updateCheckboxGeneral(
  formFieldGroup: FormFieldGroup,
  formFieldGroupString: string,
  wholeQuestion: SingleFormField,
  collection: Collection,
  intakeQuestionIdx: number,
  intakeQuestionKey: string,
  intakeQuestionEl: any,
  setCollection: (collection: any) => void,
  checkVal: boolean,
  vaildatorMethodToFilter: (input: any, optionalInput?: any) => boolean,
  whichIntakeQuestions: string
) {
  const currentValForAutocomplete: string = get(
    collection,
    [formFieldGroupString, "actualValues", wholeQuestion?.label],
    ""
  );
  console.log("deleteMe wholeQuestion?.label is: ");
  console.log(wholeQuestion?.label);

  const isCustomOptionsUnchecked: boolean =
    intakeQuestionKey === "usersCanAddCustomOptions" && checkVal; // checkVal is true when unchecked currently. Wut. I dunno.
  const customOptValidityVal: boolean = isCustomOptionsUnchecked
    ? vaildatorMethodToFilter(
        currentValForAutocomplete,
        wholeQuestion?.autocompleteOptions
      )
    : true;
  let validityValue: boolean =
    intakeQuestionKey === "isRequired" ? checkVal : customOptValidityVal;
  console.log("deleteMe validityValue is: ");
  console.log(validityValue);
  console.log("deleteMe intakeQuestionKey is: ");
  console.log(intakeQuestionKey);

  const shouldReinstateValidator: boolean = checkVal === true;
  if (
    formFieldGroup &&
    formFieldGroup.setIsInvalids &&
    wholeQuestion &&
    wholeQuestion.label
  ) {
    formFieldGroup.setIsInvalids({
      ...formFieldGroup.isInvalids,
      [wholeQuestion.label]: validityValue,
    });
  }

  const targetQuestion: SingleFormField = get(
    collection,
    [whichIntakeQuestions, intakeQuestionIdx],
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

  const newIntakeQuestionSet: SingleFormField[] = get(
    collection,
    [whichIntakeQuestions],
    []
  );
  newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;

  setCollection((prevState: any) => {
    let firstTimeIsCustomOptionsUncheckedInvalid = {};
    if (
      Object.keys(formFieldGroup?.isInvalids || {}).length === 0 &&
      isCustomOptionsUnchecked
    ) {
      // this is such a hack and I hate that it seems necessary
      firstTimeIsCustomOptionsUncheckedInvalid = {
        [wholeQuestion?.label]: !validityValue,
      };
    }
    const modifiedIsInvalids: any = {
      ...get(collection, [formFieldGroupString, "isInvalids"]),
      ...formFieldGroup?.isInvalids,
      ...firstTimeIsCustomOptionsUncheckedInvalid,
    };

    const modifiedFormFieldGroup: any = {
      ...get(collection, [formFieldGroupString]),
      isInvalids: modifiedIsInvalids,
    };

    return {
      ...prevState,
      [whichIntakeQuestions]: newIntakeQuestionSet,
      formFieldGroup: modifiedFormFieldGroup,
    };
  });
}
