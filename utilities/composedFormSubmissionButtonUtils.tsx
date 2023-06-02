import { filter, map } from "lodash-es";
import { FormFieldGroup, SingleFormField } from "../types";

export function calculateAllRequiredsHaveValues(
  questions: SingleFormField[],
  formFieldGroup: FormFieldGroup
) {
  const requiredQuestions: any[] =
    filter(questions, (question) => {
      return question?.isRequired;
    }) || [];
  const requiredQuestionLabels: any[] =
    map(requiredQuestions, (requiredQuestion) => requiredQuestion?.label) || [];
  const existingValues: string[] = formFieldGroup?.actualValues
    ? Object.keys(formFieldGroup.actualValues)
    : [];
  const missingRequiredLabels: string[] = filter(
    requiredQuestionLabels,
    (requiredQuestionLabel) => !existingValues.includes(requiredQuestionLabel)
  );
  return missingRequiredLabels.length < 1;
}
