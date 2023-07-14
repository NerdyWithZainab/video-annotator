import { useEffect, useMemo, useState } from "react";

import { map, get } from "lodash-es";

import { Collection, SingleFormField, FormFieldGroup } from "../../types";
import { Button, Grid, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import CustomError from "../Error";
import InfoPanel from "../InfoPanel";
import SingleEventIntakeQuestion from "../SingleEventIntakeQuestion";
import { defaultDoNotDisplays } from "../../dummy_data/dummyCollection";

const EventIntakeQuestions: React.FC<{
  collection: Collection;
  setCollection: (collection: any) => void;
  formFieldGroup: FormFieldGroup;
}> = ({ collection, setCollection, formFieldGroup }) => {
  const [eventIntakeQuestions, setEventIntakeQuestions] = useState<
    SingleFormField[] | undefined
  >(get(collection, ["eventIntakeQuestions"]));
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

  useEffect(() => {
    setCollection((prevState: any) => {
      return {
        ...prevState,
        eventIntakeQuestions: eventIntakeQuestions,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventIntakeQuestions]); // I was having trouble with async updating the collection's intakeQuestion array. It seems to have been resolved if I use a local state and then call off to setCollection every time that local thing updates.

  const deleteIntakeQuestion: (questionIdx: number) => void = (questionIdx) => {
    setEventIntakeQuestions((prevState) => {
      const newEventIntakeQuestions: SingleFormField[] =
        prevState?.filter((_entry, idx) => {
          return idx !== questionIdx;
        }) || [];
      return newEventIntakeQuestions;
    });
  };

  const createNewIntakeQuestion: () => void = () => {
    try {
      setEventIntakeQuestions((prevState: any) => {
        if (prevState) {
          return [...prevState, newQuestion];
        } else {
          return [newQuestion];
        }
      });
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const intakeQuestionElements = map(
    collection?.eventIntakeQuestions || [],
    (intakeQuestion, intakeQuestionIdx) => {
      const intakeQuesionsInvalid: {} =
        collection?.eventQuestionsFormFieldGroup?.isInvalids || {};
      return map(
        intakeQuestion,
        (intakeQuestionEl, intakeQuestionKey, wholeQuestion) => {
          return (
            <>
              {intakeQuestionKey === "label" && (
                <>
                  <Typography style={{ marginBottom: 10 }}>
                    {"Question " + (intakeQuestionIdx + 1) + ". "}
                  </Typography>
                  <Button
                    style={{ marginBottom: 10 }}
                    data-testid={"collection-details-submit-button"}
                    variant="contained"
                    onClick={() => {
                      deleteIntakeQuestion(intakeQuestionIdx);
                    }}
                  >
                    <FormattedMessage
                      id="REMOVE_QUESTION"
                      defaultMessage="Remove this question"
                    />
                  </Button>
                </>
              )}
              <SingleEventIntakeQuestion
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
      titleId="EVENT_INTAKE_QUESTIONS"
      titleDefault="Event Intake Questions"
      textOverrides={{ textAlign: "center" }}
      styleOverrides={{ maxHeight: 1000 }}
    >
      <Grid container>
        {collection?.eventIntakeQuestions && intakeQuestionElements}
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
export default EventIntakeQuestions;
