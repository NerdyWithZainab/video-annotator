import { filter, forEach, get, reduce } from "lodash-es";
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
  setCollection: (collection: Collection) => void
) {
  const targetQuestion: SingleFormField = get(
    collection,
    ["intakeQuestions", questionIdx],
    {}
  );
  const modifiedQuestion = {
    ...targetQuestion,
    [questionKey]: newVal,
  };
  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[questionIdx] = modifiedQuestion;

  setCollection({ ...collection, intakeQuestions: newIntakeQuestionSet });
}

export function clearAllOptionFields(optionFormFieldGroup: FormFieldGroup) {
  const preExistingActualVals = get(optionFormFieldGroup, ["actualValues"]);
  console.log("deleteMe preExistingActualVals are: ");
  console.log(preExistingActualVals);
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
  console.log("deleteMe purgedActualVals are: ");
  console.log(purgedActualVals);
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
    const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option };
    optionFormFieldGroup?.setValues
      ? optionFormFieldGroup.setValues((prevState: {}) => {
          return { ...prevState, ...newActualValue };
        })
      : undefined;
  });
}
