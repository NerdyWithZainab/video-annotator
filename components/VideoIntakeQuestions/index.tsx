import { useEffect, useMemo, useState } from "react";

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
import { convertCamelCaseToCapitalCase } from "../../utilities/textUtils";
import InfoPanel from "../InfoPanel";

const VideoIntakeQuestions: React.FC<{ collection: Collection }> = ({
  collection,
}) => {
  const intl: IntlShape = useIntl();

  const [intakeQuestions, setIntakeQuestions] = useState<
    Question[] | undefined
  >(undefined);
  // const [questionContent, setQuestionContent] = useState<{}>({});
  // const [questionContentIsValid, setQuestionContentIsValid] = useState<{}>({});
  const [intakeQuestionsInvalid, setIntakeQuestionsInvalid] = useState<
    QuestionValidity[] | undefined
  >(undefined);
  const [error, setError] = useState<string>("");

  const isRequiredLabel: string = intl.formatMessage({
    id: "IS_QUESTION_REQUIRED",
    defaultMessage: "Should the question be required?",
  });

  const newQuestion: Question = useMemo(() => {
    // const [currentVal, setCurrentVal] = useState<any>();
    // const [isValid, setIsValid] = useState<boolean>(true);
    return {
      label: "Change Me",
      type: "Change Me",
      language: "English",
      isRequired: false,
      testId: "change me",
      doNotDisplay: ["testId", "doNotDisplay", "shouldBeCheckboxes"],
      shouldBeCheckboxes: ["isRequired"],
    };
  }, []);
  useEffect(() => {
    setIntakeQuestions([...(collection?.intakeQuestions || []), newQuestion]);
  }, [collection, newQuestion]);

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const currentEvent = event;
    console.log("deleteMe currentEvent is: ");
    console.log(currentEvent);
    // @TODO flesh this out. See if you can make it handle everything with question key + index being passed in as well?
  };

  const createNewIntakeQuestion: () => void = () => {
    try {
      collection.intakeQuestions = [...(intakeQuestions || []), newQuestion]; // @TODO lookup whether this is bad practice using currently existing state in the setter for the new state... I vaguely remember something like using previous value for this?
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <InfoPanel
      titleId="VIDEO_INTAKE_QUESTIONS"
      titleDefault="Video Intake Questions"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <Grid container>
        {map(intakeQuestions || [], (intakeQuestion, intakeQuestionIdx) => {
          return (
            <>
              {map(
                intakeQuestion,
                (intakeQuestionEl, intakeQuestionKey, wholeQuestion) => {
                  const shouldBeTextField: boolean =
                    !(wholeQuestion?.doNotDisplay || []).includes(
                      intakeQuestionKey
                    ) &&
                    !(wholeQuestion?.shouldBeCheckboxes || []).includes(
                      intakeQuestionKey
                    );
                  const shouldBeCheckbox: boolean =
                    !(wholeQuestion?.doNotDisplay || []).includes(
                      intakeQuestionKey
                    ) &&
                    (wholeQuestion?.shouldBeCheckboxes || []).includes(
                      intakeQuestionKey
                    );

                  return (
                    <Grid item lg={12} sm={12}>
                      {shouldBeTextField && (
                        <TextField
                          fullWidth
                          data-testid={
                            intakeQuestionKey + "-" + intakeQuestionEl
                          }
                          error={get(intakeQuestionsInvalid, [
                            intakeQuestionIdx,
                            intakeQuestionKey,
                          ])}
                          variant="filled"
                          label={
                            <FormattedMessage
                              id={intakeQuestionKey.toUpperCase()}
                              defaultMessage="Uknown question key"
                            />
                          }
                          required
                          helperText={
                            get(intakeQuestionsInvalid, [
                              intakeQuestionIdx,
                              intakeQuestionKey,
                            ])
                              ? intl.formatMessage(
                                  {
                                    id: "GENERIC_CANNOT_BE_BLANK",
                                    defaultMessage: "Field cannot be blank",
                                  },
                                  { name: "Question" + intakeQuestionKey } // @TODO internationalize this, too
                                )
                              : ""
                          }
                          style={{ marginBottom: 10, maxWidth: 400 }}
                          onChange={handleChange}
                          value={intakeQuestionEl}
                        ></TextField>
                      )}
                      {shouldBeCheckbox && (
                        <FormControlLabel
                          style={{ marginRight: 10 }}
                          control={<Checkbox />} // @TODO LEFT OFF HERE
                          value={intakeQuestionEl}
                          onChange={handleChange}
                          label={convertCamelCaseToCapitalCase(
                            intakeQuestionKey
                          )}
                        />
                      )}
                    </Grid>
                  );
                }
              )}
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
    </InfoPanel>
  );
};
export default VideoIntakeQuestions;
