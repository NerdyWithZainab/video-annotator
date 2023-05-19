import { filter, forEach, get, reduce } from "lodash-es";
import { IntlShape } from "react-intl";
import formFieldConfig from "../formFieldConfig.json";
import { SingleFormField, Collection, FormFieldGroup } from "../types";

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

  // setCollection({ ...collection, intakeQuestions: newIntakeQuestionSet });
  setCollection((prevState: any) => {
    return { ...prevState, intakeQuestions: newIntakeQuestionSet };
  });
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
