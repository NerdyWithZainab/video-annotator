import { useEffect, useMemo, useState } from "react";

import { map, get } from "lodash-es";

import { Collection, SingleFormField, QuestionValidity } from "../../types";
import { Button, Grid, Typography } from "@mui/material";
import { IntlShape, FormattedMessage, useIntl } from "react-intl";
import CustomError from "../Error";
import InfoPanel from "../InfoPanel";
import SingleVideoIntakeQuestion from "../SingleVideoIntakeQuestion";

const VideoIntakeQuestions: React.FC<{
  collection: Collection;
  setCollection: (collection: Collection) => void;
}> = ({ collection, setCollection }) => {
  const intl: IntlShape = useIntl();

  const [intakeQuestions, setIntakeQuestions] = useState<
    SingleFormField[] | undefined
  >(undefined);
  // const [questionContent, setQuestionContent] = useState<{}>({});
  // const [questionContentIsValid, setQuestionContentIsValid] = useState<{}>({});
  const [intakeQuestionsInvalid, setIntakeQuestionsInvalid] = useState<
    QuestionValidity[] | undefined
  >(undefined);
  const [error, setError] = useState<string>("");

  // const isRequiredLabel: string = intl.formatMessage({
  //   id: "IS_QUESTION_REQUIRED",
  //   defaultMessage: "Should the question be required?",
  // });

  const newQuestion: SingleFormField = useMemo(() => {
    // const [currentVal, setCurrentVal] = useState<any>();
    // const [isValid, setIsValid] = useState<boolean>(true);
    return {
      label: "Change Me",
      type: "Change Me",
      language: "English",
      isRequired: false,
      testId: "change me",
      doNotDisplay: ["testId", "doNotDisplay", "shouldBeCheckboxes"],
      invalidInputMessage: "change me",
      validatorMethod: (tmp) => {
        return true;
      }, // @TODO should be a dropdown,
      shouldBeCheckboxes: ["isRequired"],
      autocompleteOptions: ["options"],
    };
  }, []);
  useEffect(() => {
    setIntakeQuestions(collection?.intakeQuestions || []);
  }, [collection]);

  const createNewIntakeQuestion: () => void = () => {
    try {
      collection.intakeQuestions = [...(intakeQuestions || []), newQuestion]; // @TODO lookup whether this is bad practice using currently existing state in the setter for the new state... I vaguely remember something like using previous value for this?
      setCollection(collection);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const intakeQuestionElements = map(
    intakeQuestions,
    (intakeQuestion, intakeQuestionIdx) => {
      return map(
        intakeQuestion,
        (intakeQuestionEl, intakeQuestionKey, wholeQuestion) => {
          return (
            <>
              {intakeQuestionKey === "label" && (
                <Typography style={{ marginBottom: 10 }}>
                  {"Question " + (intakeQuestionIdx + 1) + ". "}
                </Typography>
              )}
              <SingleVideoIntakeQuestion
                key={intakeQuestionKey}
                intakeQuestionEl={intakeQuestionEl}
                intakeQuestionKey={intakeQuestionKey}
                wholeQuestion={wholeQuestion}
                intakeQuestionsInvalid={intakeQuestionsInvalid}
                intakeQuestionIdx={intakeQuestionIdx}
                collection={collection}
                setCollection={setCollection}
              />
            </>
          );
        }
      );
    }
  );

  return (
    <InfoPanel
      titleId="VIDEO_INTAKE_QUESTIONS"
      titleDefault="Video Intake Questions"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <Grid container>
        {intakeQuestions && intakeQuestionElements}
        <Grid item lg={12} sm={12}>
          <Button
            style={{ marginBottom: 10 }}
            data-testid={"collection-details-submit-button"}
            variant="contained"
            onClick={createNewIntakeQuestion}
          >
            <FormattedMessage
              id="ADD_ANOTHER_QUESTION"
              defaultMessage="Add another question"
            />
          </Button>
          {error && <CustomError errorMsg={error} />}
        </Grid>
      </Grid>
    </InfoPanel>
  );
};
export default VideoIntakeQuestions;
