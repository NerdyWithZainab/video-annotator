import { useEffect, useMemo, useState } from "react";

import { map, get } from "lodash-es";

import { Collection, SingleFormField, FormFieldGroup } from "../../types";
import { Button, Grid, Typography } from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import CustomError from "../Error";
import InfoPanel from "../InfoPanel";
import SingleVideoIntakeQuestion from "../SingleVideoIntakeQuestion";
import { defaultDoNotDisplays } from "../../dummy_data/dummyCollection";
import { deleteSingleQuestionInCollection } from "../../utilities/videoIntakeQuestionUtils";

const VideoIntakeQuestions: React.FC<{
  collection: Collection;
  setCollection: (collection: any) => void;
  formFieldGroup: FormFieldGroup;
}> = ({ collection, setCollection, formFieldGroup }) => {
  // console.log("deleteMe VideoIntakeQuestions re-renders");
  // console.log("deleteMe collection upon new re-render is: ");
  // console.log(collection);
  const [intakeQuestions, setIntakeQuestions] = useState<
    SingleFormField[] | undefined
  >(undefined);
  // const [intakeQuestionsInvalid, setIntakeQuestionsInvalid] = useState<
  //   QuestionValidity[] | undefined
  // >(undefined);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
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
    console.log("deleteMe intakeQuestions changed");
    setCollection((prevState: any) => {
      return { ...prevState, intakeQuestions: intakeQuestions };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intakeQuestions]);

  // useEffect(() => {
  //   console.log(
  //     "deleteMe got here a2 and useEffect triggered. Collection is now:"
  //   );
  //   console.log(collection);
  //   if (deleteIndex != null && deleteIndex > -1) {
  //     console.log("deleteMe got here a1 and deleteIndex is: " + deleteIndex);
  //     deleteSingleQuestionInCollection(collection, setCollection, deleteIndex);
  //     setDeleteIndex(null);
  //   }
  // }, [collection, deleteIndex, setCollection]);

  const deleteIntakeQuestion: (questionIdx: number) => void = (questionIdx) => {
    setIntakeQuestions((prevState) => {
      const newIntakeQuestions: SingleFormField[] =
        prevState?.filter((_entry, idx) => {
          return idx !== questionIdx;
        }) || [];
      return newIntakeQuestions;
    });
  };

  const createNewIntakeQuestion: () => void = () => {
    try {
      setIntakeQuestions((prevState: any) => {
        if (prevState) {
          return [...prevState, newQuestion];
        } else {
          return [newQuestion];
        }
      });
      // const updatedIntakeQuestions: SingleFormField[] = [
      //   ...(collection?.intakeQuestions || []),
      //   newQuestion,
      // ];
      // setCollection((prevState: any) => {
      //   return { ...prevState, intakeQuestions: updatedIntakeQuestions };
      // });
    } catch (error: any) {
      setError(error?.message);
    }
  };

  const intakeQuestionElements = map(
    collection?.intakeQuestions || [],
    (intakeQuestion, intakeQuestionIdx) => {
      const intakeQuesionsInvalid: {} =
        collection?.formFieldGroup?.isInvalids || {};
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
