import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { filter, get, map } from "lodash-es";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import {
  Collection,
  FormFieldGroup,
  // QuestionValidity,
  SingleFormField,
} from "../../types";
import { convertCamelCaseToCapitalCase } from "../../utilities/textUtils";
import formFieldConfig from "../../formFieldConfig.json";
import {
  calculateCurrentAttributesToDisplay,
  updateCollection,
  updateFormFieldStates,
  updateIsRequiredChecked,
  updateIsRequiredUnchecked,
  updateUsersCanAddCustomOptionsChecked,
  updateUsersCanAddCustomOptionsUnchecked,
} from "../../utilities/singleFormFieldUtils";
import OptionSet from "../OptionSet";
import { isNonEmptyString } from "../../utilities/validators";
import {
  deleteSingleQuestionInCollection,
  transformQuestion,
  updateSingleQuestionInCollection,
} from "../../utilities/videoIntakeQuestionUtils";

const SingleVideoIntakeQuestion: React.FC<{
  intakeQuestionEl: any;
  intakeQuestionKey: string;
  wholeQuestion: SingleFormField;
  intakeQuestionsInvalid: {};
  intakeQuestionIdx: number;
  collection: Collection;
  setCollection: (collection: any) => void;
  formFieldGroup: FormFieldGroup;
}> = ({
  intakeQuestionEl,
  intakeQuestionKey,
  wholeQuestion,
  intakeQuestionsInvalid,
  intakeQuestionIdx,
  collection,
  setCollection,
  formFieldGroup,
}) => {
  const types: string[] =
    map(formFieldConfig, (configEntry) => configEntry?.type) || [];

  const onTheNoDisplayList: boolean = (
    wholeQuestion?.doNotDisplay || []
  ).includes(intakeQuestionKey);

  const currentAttributesToDisplay: string[] =
    calculateCurrentAttributesToDisplay(wholeQuestion);

  const onTheDisplayListForThisQuestionType: boolean =
    currentAttributesToDisplay.includes(intakeQuestionKey);

  const onCheckboxList: boolean = (
    wholeQuestion?.shouldBeCheckboxes || []
  ).includes(intakeQuestionKey);

  const shouldBeTypeDropdown: boolean =
    intakeQuestionKey === "type" && onTheDisplayListForThisQuestionType;
  const shouldBeTextField: boolean =
    !onTheNoDisplayList &&
    !onCheckboxList &&
    !shouldBeTypeDropdown &&
    onTheDisplayListForThisQuestionType;
  const shouldBeCheckbox: boolean =
    !onTheNoDisplayList &&
    onCheckboxList &&
    !shouldBeTypeDropdown &&
    onTheDisplayListForThisQuestionType;

  const intl: IntlShape = useIntl();

  const handleQuestionChange: (event: any) => void = (event: any) => {
    const currentVal: any = event?.currentTarget?.value || event?.target?.value;
    console.log("deleteMe currentVal is: ");
    console.log(currentVal);

    const transformedQuestion: SingleFormField = transformQuestion(
      wholeQuestion,
      currentVal
    );
    console.log("deleteMe wholeQuestion is: ");
    console.log(wholeQuestion);
    console.log("deleteMe transformedQuestion is: ");
    console.log(transformedQuestion);

    updateSingleQuestionInCollection(
      collection,
      setCollection,
      intakeQuestionIdx,
      transformedQuestion,
      collection?.videoIntakeQuestions || [],
      "videoIntakeQuestions"
    ); // @TODO LEFT OFF HERE REPLACING INTAKEQUESTIONS GLOBALLY AND ALSO FIGURING OUT HOW TO HIDE FORMFIELD GROUPS FROM THE COLLECTION DETAILS
  };

  const handleChange: (event: any) => void = (event: any) => {
    // console.log("deleteMe intakeQuestionKey is: ");
    // console.log(intakeQuestionKey);
    // if the change is in the TYPE field, this should
    // 1) automatically modify other parts of the SingleFormField
    // 2) change what options are visible/available in the video intake questions section

    const currentVal: any = event?.currentTarget?.value || event?.target?.value;

    updateCollection(
      collection,
      intakeQuestionIdx,
      intakeQuestionKey,
      currentVal,
      setCollection,
      "videoIntakeQuestions"
    );
  };

  const handleCheckChange: (event: any) => void = (_event: any) => {
    if (intakeQuestionKey === "isRequired" && !intakeQuestionEl === false) {
      // isRequired is being set to false. This means that we need to remove the isNonEmptyString method from the validationMethods array for this question
      updateIsRequiredUnchecked(
        formFieldGroup,
        wholeQuestion,
        collection,
        intakeQuestionIdx,
        intakeQuestionKey,
        intakeQuestionEl,
        setCollection,
        "videoIntakeQuestions"
      );
    } else if (
      intakeQuestionKey === "isRequired" &&
      !intakeQuestionEl === true
    ) {
      updateIsRequiredChecked(
        formFieldGroup,
        wholeQuestion,
        collection,
        intakeQuestionIdx,
        intakeQuestionKey,
        intakeQuestionEl,
        setCollection,
        "videoIntakeQuestions"
      );
    } else {
      updateCollection(
        collection,
        intakeQuestionIdx,
        intakeQuestionKey,
        !intakeQuestionEl,
        setCollection,
        "videoIntakeQuestions"
      );
    }
  };

  const typeElements = map(types, (type: string) => {
    return (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    );
  });

  const shouldBeOptionField = intakeQuestionKey === "autocompleteOptions";

  return (
    <>
      <Grid item lg={12} sm={12}>
        {shouldBeOptionField && (
          <OptionSet
            key={intakeQuestionIdx}
            formField={wholeQuestion}
            collection={collection}
            targetFormFieldIdx={intakeQuestionIdx}
            setCollection={setCollection}
            whichIntakeQuestions={"videoIntakeQuestions"}
          />
        )}
        {shouldBeTextField && (
          <TextField
            fullWidth
            data-testid={intakeQuestionKey + "-" + intakeQuestionEl}
            error={get(intakeQuestionsInvalid, [intakeQuestionKey])}
            variant="filled"
            label={
              <FormattedMessage
                id={intakeQuestionKey.toUpperCase().replace(" ", "_")}
                defaultMessage="Unknown question key"
              />
            }
            required
            helperText={
              get(intakeQuestionsInvalid, [intakeQuestionKey])
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
        {shouldBeTypeDropdown && (
          <>
            <InputLabel id={intakeQuestionKey + "-" + intakeQuestionEl}>
              <FormattedMessage id="TYPE" defaultMessage="Type" />
            </InputLabel>
            <Select
              labelId={intakeQuestionKey + "-" + intakeQuestionEl}
              id={intakeQuestionKey + "-" + intakeQuestionEl + "-select"}
              value={intakeQuestionEl}
              label="TODO deleteMe"
              onChange={handleQuestionChange} //this is currently assuming that the only dropdown is a question type change
              style={{ marginBottom: 10 }}
            >
              {types && typeElements}
            </Select>
          </>
        )}
        {shouldBeCheckbox && (
          <FormControlLabel
            style={{ marginRight: 10 }}
            control={<Checkbox checked={intakeQuestionEl} />}
            value={intakeQuestionEl}
            onChange={handleCheckChange}
            label={convertCamelCaseToCapitalCase(intakeQuestionKey)}
          />
        )}
      </Grid>
    </>
  );
};

export default SingleVideoIntakeQuestion;
