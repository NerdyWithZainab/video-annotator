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
import { Collection, QuestionValidity, SingleFormField } from "../../types";
import { convertCamelCaseToCapitalCase } from "../../utilities/textUtils";
import formFieldConfig from "../../formFieldConfig.json";

const SingleVideoIntakeQuestion: React.FC<{
  intakeQuestionEl: any;
  intakeQuestionKey: string;
  wholeQuestion: SingleFormField;
  intakeQuestionsInvalid: QuestionValidity[] | undefined;
  intakeQuestionIdx: number;
  collection: Collection;
  setCollection: (collection: Collection) => void;
}> = ({
  intakeQuestionEl,
  intakeQuestionKey,
  wholeQuestion,
  intakeQuestionsInvalid,
  intakeQuestionIdx,
  collection,
  setCollection,
}) => {
  console.log("deleteMe intakeQuestionEl is: ");
  console.log(intakeQuestionEl);
  console.log("deleteMe wholeQuestion is: ");
  console.log(wholeQuestion);
  console.log("deleteMe intakeQuestionKey is: " + intakeQuestionKey);
  console.log("deleteMe colleciton is: ");
  console.log(collection);
  console.log("deleteMe formFieldConfig is: ");
  console.log(formFieldConfig);
  const types: string[] =
    map(formFieldConfig, (configEntry) => configEntry?.type) || [];

  const onTheNoDisplayList: boolean = (
    wholeQuestion?.doNotDisplay || []
  ).includes(intakeQuestionKey);

  const currentTypeConfig = filter(formFieldConfig, (entry) => {
    const deleteMeEntryType = entry?.type;
    console.log("deleteMe deleteMeEntryType is: ");
    console.log(deleteMeEntryType);
    console.log("deleteMe wholeQuestion type is: ");
    console.log(wholeQuestion?.type);
    const matches: boolean = entry?.type === wholeQuestion?.type;
    console.log("deleteMe matches is: ");
    console.log(matches);
    return matches;
  });
  console.log("deleteMe currentTypeConfig is: ");
  console.log(currentTypeConfig);

  // const notOnTheAttributesToDisplayListForTheType: boolean =
  //   !currentTypeConfig?.attributesToDisplay?.includes(intakeQuestionKey);

  const onCheckboxList: boolean = (
    wholeQuestion?.shouldBeCheckboxes || []
  ).includes(intakeQuestionKey);

  const shouldBeTypeDropdown: boolean = intakeQuestionKey === "type";
  const shouldBeTextField: boolean =
    !onTheNoDisplayList && !onCheckboxList && !shouldBeTypeDropdown;
  const shouldBeCheckbox: boolean =
    !onTheNoDisplayList && onCheckboxList && !shouldBeTypeDropdown;

  const intl: IntlShape = useIntl();
  const handleChange: (event: any) => void = (event: any) => {
    // if the change is in the TYPE field, this should
    // 1) automatically modify other parts of the SingleFormField
    // 2) change what options are visible/available in the video intake questions section

    const currentVal: any = event?.currentTarget?.value || event?.target?.value;
    const targetQuestion: SingleFormField = get(
      collection,
      ["intakeQuestions", intakeQuestionIdx],
      {}
    );
    const modifiedQuestion = {
      ...targetQuestion,
      [intakeQuestionKey]: currentVal,
    };
    const newIntakeQuestionSet: SingleFormField[] =
      collection?.intakeQuestions || [];
    newIntakeQuestionSet[intakeQuestionIdx] = modifiedQuestion;
    setCollection({ ...collection, intakeQuestions: newIntakeQuestionSet });
  };

  const typeElements = map(types, (type: string) => {
    return (
      <MenuItem key={type} value={type}>
        {type}
      </MenuItem>
    );
  });

  return (
    <Grid item lg={12} sm={12}>
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
          control={<Checkbox />} // @TODO LEFT OFF HERE
          value={intakeQuestionEl}
          onChange={handleChange}
          label={convertCamelCaseToCapitalCase(intakeQuestionKey)}
        />
      )}
    </Grid>
  );
};

export default SingleVideoIntakeQuestion;
