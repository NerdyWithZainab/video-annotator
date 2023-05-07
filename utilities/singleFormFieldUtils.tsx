import { filter, forEach, get } from "lodash-es";
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

export function updateOptionFormFieldGroupWithOptionList(
  options: string[],
  optionFormFieldGroup: FormFieldGroup
) {
  forEach(options, (option, optionIdx) => {
    const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option };
    optionFormFieldGroup?.setValues
      ? optionFormFieldGroup.setValues((prevState: {}) => {
          return { ...prevState, ...newActualValue };
        })
      : undefined;
  });
}
