import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { Collection, FormFieldGroup, SingleFormField } from "../../types";
import CustomError from "../Error";
import { map, filter, reduce } from "lodash-es";
import { measureMemory } from "vm";

const ComposedFormSubmissionButton: React.FC<{
  questions: SingleFormField[];
  formFieldGroup: FormFieldGroup | {};
}> = ({ questions, formFieldGroup }) => {
  const [allRequiredValid, setAllRequiredValid] = useState<boolean>(true);

  useEffect(() => {
    const totalInvalidCount: number = reduce(
      Object.values(formFieldGroup?.isInvalids || []),
      (memo: any, entry: any) => {
        return Number(entry) + Number(memo);
      },
      0
    );

    setAllRequiredValid(
      totalInvalidCount < 1 && allRequiredsHaveValues(questions, formFieldGroup)
    );
  }, [questions, formFieldGroup, allRequiredValid]);

  const allRequiredsHaveValues: (
    questions: SingleFormField[],
    formFieldGroup: FormFieldGroup
  ) => boolean = (
    questions: SingleFormField[],
    formFieldGroup: FormFieldGroup
  ) => {
    const requiredQuestions: any[] =
      filter(questions, (question) => {
        return question?.isRequired;
      }) || [];
    const requiredQuestionLabels: any[] =
      map(requiredQuestions, (requiredQuestion) => requiredQuestion?.label) ||
      [];
    const existingValues: string[] = formFieldGroup?.actualValues
      ? Object.keys(formFieldGroup.actualValues)
      : [];
    const missingRequiredLabels: string[] = filter(
      requiredQuestionLabels,
      (requiredQuestionLabel) => !existingValues.includes(requiredQuestionLabel)
    );
    return missingRequiredLabels.length < 1;
  };

  const handleFormSubmission: () => void = () => {
    console.log("deleteMe handleFormSubmission entered");
    console.log("deleteMe formFieldGroup?.actualValues is: ");
    console.log(formFieldGroup?.actualValues);
    // @TODO send this to the database
  };

  const error: string = "";

  return (
    <>
      <Button
        style={{ marginBottom: 10 }}
        data-testid={"submit-button"}
        variant="contained"
        disabled={!allRequiredValid}
        onClick={handleFormSubmission}
      >
        <FormattedMessage id="SUBMIT" defaultMessage="Submit" />
      </Button>
      {error && <CustomError errorMsg={error} />}
    </>
  );
};

export default ComposedFormSubmissionButton;
