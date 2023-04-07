import { useEffect, useState } from "react";

import { map, get } from "lodash-es";

import { Collection, Question, QuestionValidity } from "../../types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { IntlShape, FormattedMessage, useIntl } from "react-intl";
import InfoIcon from "../InfoIcon";
import CustomError from "../Error";

const VideoIntakeQuestions: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  console.log("deleteMe got here and collection is: ");
  console.log(collection);

  const intl: IntlShape = useIntl();

  const [intakeQuestions, setIntakeQuestions] = useState<
    Question[] | undefined
  >(undefined);
  const [intakeQuestionsInvalid, setIntakeQuestionsInvalid] = useState<
    QuestionValidity[] | undefined
  >(undefined);
  const [error, setError] = useState<string>("");

  const isRequiredLabel: string = intl.formatMessage({
    id: "IS_QUESTION_REQUIRED",
    defaultMessage: "Should the question be required?",
  });

  useEffect(() => {
    setIntakeQuestions([
      ...(collection?.intakeQuestions || []),
      {
        label: "Change Me",
        type: "Change Me",
        language: "English",
        isRequired: false,
        testId: "change me",
      },
    ]);
  }, [collection]);

  const handleLabelChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentEvent = event;
    console.log("deleteMe currentEvent is: ");
    console.log(currentEvent);
    // @TODO flesh this out. See if you can make it handle everything with question key + index being passed in as well?
  };

  const createNewIntakeQuestion: () => void = () => {
    try {
      collection.intakeQuestions = [
        ...(intakeQuestions || []),
        {
          label: "Change Me",
          type: "Change Me",
          language: "English",
          isRequired: false,
          testId: "change me",
        },
      ]; // @TODO lookup whether this is bad practice using currently existing state in the setter for the new state... I vaguely remember something like using previous value for this?
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Grid container>
      {map(intakeQuestions || [], (intakeQuestion, intakeQuestionIdx) => {
        return (
          <>
            <Grid item lg={12} sm={12}>
              <TextField
                fullWidth
                data-testid={intakeQuestion?.testId + "-label"}
                error={get(intakeQuestionsInvalid, [
                  intakeQuestionIdx,
                  "label",
                ])}
                variant="filled"
                label={
                  intakeQuestion?.label || (
                    <FormattedMessage
                      id="UNKNOWN_LABEL"
                      defaultMessage="Unknown Label"
                    />
                  )
                }
                required
                helperText={
                  get(intakeQuestionsInvalid, [intakeQuestionIdx, "label"])
                    ? intl.formatMessage(
                        {
                          id: "GENERIC_CANNOT_BE_BLANK",
                          defaultMessage: "Question label cannot be blank",
                        },
                        { name: "Question label" } // @TODO internationalize this, too
                      )
                    : ""
                }
                style={{ marginBottom: 10, maxWidth: 400 }}
                onChange={handleLabelChange}
                value={intakeQuestion?.label}
              ></TextField>
            </Grid>
            <Grid item lg={12} sm={12}>
              <TextField
                fullWidth
                data-testid={intakeQuestion?.testId + "-type"}
                error={get(intakeQuestionsInvalid, [intakeQuestionIdx, "type"])}
                variant="filled"
                label={
                  intakeQuestion?.type || (
                    <FormattedMessage
                      id="UNKNOWN_TYPE"
                      defaultMessage="Unknown Type"
                    />
                  )
                }
                required
                helperText={
                  get(intakeQuestionsInvalid, [intakeQuestionIdx, "type"])
                    ? intl.formatMessage(
                        {
                          id: "GENERIC_CANNOT_BE_BLANK",
                          defaultMessage: "Question type cannot be blank",
                        },
                        { name: "Question type" } // @TODO internationalize this, too
                      )
                    : ""
                }
                style={{ marginBottom: 10, maxWidth: 400 }}
                onChange={handleLabelChange}
                value={intakeQuestion?.type}
              ></TextField>
            </Grid>
            <Grid item lg={12} sm={12}>
              <TextField
                fullWidth
                data-testid={intakeQuestion?.testId + "-language"}
                error={get(intakeQuestionsInvalid, [
                  intakeQuestionIdx,
                  "language",
                ])}
                variant="filled"
                label={
                  intakeQuestion?.language || (
                    <FormattedMessage
                      id="UNKNOWN_LANGUAGE"
                      defaultMessage="Unknown Language"
                    />
                  )
                }
                required
                helperText={
                  get(intakeQuestionsInvalid, [intakeQuestionIdx, "language"])
                    ? intl.formatMessage(
                        {
                          id: "GENERIC_CANNOT_BE_BLANK",
                          defaultMessage: "Question language cannot be blank",
                        },
                        { name: "Question language" } // @TODO internationalize this, too
                      )
                    : ""
                }
                style={{ marginBottom: 10, maxWidth: 400 }}
                onChange={handleLabelChange}
                value={intakeQuestion?.language}
              ></TextField>
            </Grid>
            <Grid item lg={12} sm={12}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <FormControlLabel
                  style={{ marginRight: 10 }}
                  control={<Checkbox />} // @TODO LEFT OFF HERE
                  value={intakeQuestion?.isRequired}
                  onChange={handleLabelChange}
                  label={isRequiredLabel}
                />
                <InfoIcon
                  messageId="IS_REQUIRED_DESCRIPTION"
                  defaultMessage="If selected, users who submit videos to this collection will be required to fill out this field with every video that they submit."
                />
              </div>
            </Grid>
          </>
        );
      })}
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
  );
};
export default VideoIntakeQuestions;
