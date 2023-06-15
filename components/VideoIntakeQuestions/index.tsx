import { useEffect, useMemo, useState } from "react";

import { map, get } from "lodash-es";

import {
  Collection,
  SingleFormField,
  QuestionValidity,
  FormFieldGroup,
} from "../../types";
import { Button, Grid, Typography } from "@mui/material";
import { IntlShape, FormattedMessage, useIntl } from "react-intl";
import CustomError from "../Error";
import InfoPanel from "../InfoPanel";
import SingleVideoIntakeQuestion from "../SingleVideoIntakeQuestion";
import { defaultDoNotDisplays } from "../../dummy_data/dummyCollection";

const VideoIntakeQuestions: React.FC<{
  collection: Collection;
  setCollection: (collection: any) => void;
  formFieldGroup: FormFieldGroup;
}> = ({ collection, setCollection, formFieldGroup }) => {
  console.log("deleteMe VideoIntakeQuestions re-renders");
  // const [intakeQuestions, setIntakeQuestions] = useState<
  //   SingleFormField[] | undefined
  // >(undefined);
  // const [intakeQuestionsInvalid, setIntakeQuestionsInvalid] = useState<
  //   QuestionValidity[] | undefined
  // >(undefined);
  const [error, setError] = useState<string>("");

  const newQuestion: SingleFormField = useMemo(() => {
    return {
      label: "Change Me",
      type: "Text",
      language: "English",
      isRequired: false,
      doNotDisplay: defaultDoNotDisplays,
      invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
      validatorMethods: [],
      shouldBeCheckboxes: ["isRequired"],
    };
  }, []);
  // useEffect(() => {
  //   setIntakeQuestions(collection?.intakeQuestions || []);
  // }, [collection]);

  const createNewIntakeQuestion: () => void = () => {
    try {
      const updatedIntakeQuestions: SingleFormField[] = [
        ...(collection?.intakeQuestions || []),
        newQuestion,
      ];
      setCollection((prevState: any) => {
        return { ...prevState, intakeQuestions: updatedIntakeQuestions };
      });
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const intakeQuestionElements = map(
    collection?.intakeQuestions || [],
    (intakeQuestion, intakeQuestionIdx) => {
      const intakeQuesionsInvalid = collection?.formFieldGroup?.isInvalids;
      console.log("deleteMe intakeQuesionsInvalid is: ");
      console.log(intakeQuesionsInvalid);
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
                intakeQuestionsInvalid={intakeQuesionsInvalid}
                intakeQuestionIdx={intakeQuestionIdx}
                collection={collection}
                setCollection={setCollection}
                formFieldGroup={formFieldGroup}
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
        {collection?.intakeQuestions && intakeQuestionElements}
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
