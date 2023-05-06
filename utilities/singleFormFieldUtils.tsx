import { filter, get } from "lodash-es";
import formFieldConfig from "../formFieldConfig.json";
import { SingleFormField, Collection } from "../types";

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
  let keyValuePairsForNewQuestionType = {}; // @TODO populate with missing keys and nullish values for the current Type (use case: say a user changes the question type from checkbox to autocomplete and is missing the options section)
  // if (questionKey === "type") {

  // }
  const modifiedQuestion = {
    ...targetQuestion,
    [questionKey]: newVal,
  };
  const newIntakeQuestionSet: SingleFormField[] =
    collection?.intakeQuestions || [];
  newIntakeQuestionSet[questionIdx] = modifiedQuestion;

  console.log("deleteMe newIntakeQuestionSet is: ");
  console.log(newIntakeQuestionSet);
  setCollection({ ...collection, intakeQuestions: newIntakeQuestionSet });
}
