import {
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
  QuestionValidity,
  SingleFormField,
} from "../../types";
import { convertCamelCaseToCapitalCase } from "../../utilities/textUtils";
import formFieldConfig from "../../formFieldConfig.json";
import {
  calculateCurrentAttributesToDisplay,
  updateCollection,
  updateFormFieldStates,
  updateIsRequiredChecked,
  updateIsRequiredUncheck,
} from "../../utilities/singleFormFieldUtils";
import OptionSet from "../OptionSet";
import { isNonEmptyString } from "../../utilities/validators";

const SingleVideoIntakeQuestion: React.FC<{
  intakeQuestionEl: any;
  intakeQuestionKey: string;
  wholeQuestion: SingleFormField;
  intakeQuestionsInvalid: QuestionValidity[] | undefined;
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
      setCollection
    );
    // if (intakeQuestionKey === "isRequired") {
    //   console.log("deleteMe an isRequired was changed. Whole question is: ");
    //   console.log(wholeQuestion);
    // }
  };

  const handleCheckChange: (event: any) => void = (_event: any) => {
    if (intakeQuestionKey === "isRequired" && !intakeQuestionEl === false) {
      // isRequired is being set to false. This means that we need to remove the isNonEmptyString method from the validationMethods array for this question
      updateIsRequiredUncheck(
        formFieldGroup,
        wholeQuestion,
        collection,
        intakeQuestionIdx,
        intakeQuestionKey,
        intakeQuestionEl,
        setCollection
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
        setCollection
      );
    } else {
      updateCollection(
        collection,
        intakeQuestionIdx,
        intakeQuestionKey,
        !intakeQuestionEl,
        setCollection
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
  // const options: string[] = get(wholeQuestion, ["autocompleteOptions"], []);

  // const setOptions: (input: any) => void = get(collection, [
  //   "formFieldGroup",
  //   "setValues",
  // ]);

  return (
    <Grid item lg={12} sm={12}>
      {shouldBeOptionField && (
        <OptionSet
          key={intakeQuestionIdx}
          formField={wholeQuestion}
          collection={collection}
          targetformFieldIdx={intakeQuestionIdx}
          setCollection={setCollection}
        />
      )}
      {shouldBeTextField && (
        <TextField
          fullWidth
          data-testid={intakeQuestionKey + "-" + intakeQuestionEl}
          error={get(intakeQuestionsInvalid, [
            intakeQuestionIdx,
            intakeQuestionKey,
          ])}
          variant="filled"
          label={
            <FormattedMessage
              id={intakeQuestionKey.toUpperCase().replace(" ", "_")}
              defaultMessage="Unknown question key"
            />
          }
          required
          helperText={
            get(intakeQuestionsInvalid, [intakeQuestionIdx, intakeQuestionKey])
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
            onChange={handleChange}
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
  );
};

export default SingleVideoIntakeQuestion;
