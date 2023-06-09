import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { get } from "lodash-es";
import { FormFieldGroup, SingleFormField } from "../../types";
import { ReactNode, SyntheticEvent, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteAutocompleteOption from "../DeleteAutocompleteOption";
import { updateFormFieldStates } from "../../utilities/singleFormFieldUtils";

const SingleFormField: React.FC<{
  question: SingleFormField;
  formFieldGroup: FormFieldGroup | undefined;
  areAutocompleteOptionsDeletable?: boolean;
}> = ({
  question,
  formFieldGroup,
  areAutocompleteOptionsDeletable = false,
}) => {
  const intl: IntlShape = useIntl();
  const currentIsInvalid: boolean = get(
    formFieldGroup,
    ["isInvalids", question?.label],
    false
  );

  useEffect(() => {
    // set default values. In the case of checkbox, this is needed for correct behavior. In the case of Date, it's a bandaid for resolving the missing value red box/required upon initial load issue
    if (
      question?.type === "Checkbox" &&
      !get(formFieldGroup, ["actualValues", question?.label])
    ) {
      updateFormFieldStates(false, false, formFieldGroup, question);
    }

    if (
      question?.type === "Date" &&
      !get(formFieldGroup, ["actualValues", question?.label])
    ) {
      updateFormFieldStates(dayjs(), false, formFieldGroup, question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTextChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal: any = event?.currentTarget?.value;
    updateFormFieldStates(currentVal, false, formFieldGroup, question);
  };

  const handleAutocompleteChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => void = (_event: SyntheticEvent<Element, Event>, newValue: any) => {
    if (newValue) {
      updateFormFieldStates(newValue, false, formFieldGroup, question);
    } else {
      updateFormFieldStates("", false, formFieldGroup, question); // otherwise, there is an error
    }
  };

  const handleAutocompleteClose: (
    event: React.SyntheticEvent,
    reason: string
  ) => void = (event: React.SyntheticEvent, reason: string) => {
    if (!question?.usersCanAddCustomOptions) {
      const currentOpt: string = get(
        formFieldGroup,
        ["actualValues", question?.label],
        ""
      );
    }
    console.log("deleteMe handleAutocompleteClose called");
  };

  const handleCheckChange: (event: any) => void = (event: any) => {
    const currentVal: any = event?.target?.checked;
    updateFormFieldStates(currentVal, false, formFieldGroup, question);
  };

  const handleDateChange: (newValue: {}) => void = (newValue: {}) => {
    updateFormFieldStates(newValue, false, formFieldGroup, question);
  };

  const autocompleteExtras: {} = question?.autocompleteExtras || {};

  switch (question?.type) {
    case "URL":
      return (
        <TextField
          required={question?.isRequired}
          fullWidth
          data-testid={question?.testId}
          error={currentIsInvalid}
          variant="filled"
          label={question?.label}
          helperText={
            currentIsInvalid
              ? intl.formatMessage({
                  id: question?.invalidInputMessage || "FIELD_CANNOT_BE_BLANK",
                  defaultMessage: "Cannot be blank",
                })
              : ""
          }
          style={{ marginBottom: 10, maxWidth: 400 }}
          onChange={handleTextChange}
          value={get(formFieldGroup, ["actualValues", question?.label], "")}
        ></TextField>
      );
    case "Text":
      return (
        <span style={{ display: "inline-flex" }}>
          <TextField
            required={question?.isRequired}
            fullWidth
            data-testid={question?.testId}
            error={currentIsInvalid}
            variant="filled"
            label={question?.label}
            helperText={
              currentIsInvalid
                ? intl.formatMessage({
                    id:
                      question?.invalidInputMessage || "FIELD_CANNOT_BE_BLANK",
                    defaultMessage: "Cannot be blank",
                  })
                : ""
            }
            style={{ marginBottom: 10, maxWidth: 400 }}
            onChange={handleTextChange}
            value={get(formFieldGroup, ["actualValues", question?.label], "")}
          ></TextField>
          {areAutocompleteOptionsDeletable && formFieldGroup && (
            <DeleteAutocompleteOption
              question={question}
              formFieldGroup={formFieldGroup}
            />
          )}
        </span>
      );
    case "Checkbox":
      return (
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <FormControlLabel
            style={{ marginRight: 10 }}
            control={<Checkbox />}
            value={get(formFieldGroup, ["actualValues", question.label])}
            onChange={handleCheckChange}
            label={question?.label}
          />
        </div>
      );
    case "Date":
      return (
        <div style={{ marginBottom: 10, maxWidth: 400 }}>
          <DatePicker
            data-testid={question?.testId}
            label={question?.label}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            value={get(formFieldGroup, ["actualValues", question?.label])}
          ></DatePicker>
        </div>
      );
    case "Autocomplete":
      return (
        <Autocomplete
          renderInput={function (
            params: AutocompleteRenderInputParams
          ): ReactNode {
            return (
              <TextField
                {...params}
                required={question?.isRequired} // @TODO figure out why this isn't behaving as expected
                label={question?.label}
                error={currentIsInvalid}
                helperText={
                  currentIsInvalid
                    ? intl.formatMessage({
                        id:
                          question?.invalidInputMessage ||
                          "FIELD_CANNOT_BE_BLANK",
                        defaultMessage: "Cannot be blank",
                      })
                    : ""
                }
              />
            );
          }}
          options={question?.autocompleteOptions || []}
          // required={question?.isRequired}
          data-testid={question?.testId}
          // clearOnBlur={true}
          onClose={handleAutocompleteClose}
          style={{ marginBottom: 10, maxWidth: 400 }}
          value={get(formFieldGroup, ["actualValues", question?.label], "")}
          onChange={handleAutocompleteChange}
          freeSolo={question?.usersCanAddCustomOptions}
          {...autocompleteExtras}
          inputValue={get(
            formFieldGroup,
            ["actualValues", question?.label],
            ""
          )}
          onInputChange={handleAutocompleteChange}
        ></Autocomplete>
      );

    case "Number":
      return (
        <TextField
          required={question?.isRequired}
          fullWidth
          type="number"
          data-testid={question?.testId}
          error={currentIsInvalid}
          variant="filled"
          label={question?.label}
          helperText={
            currentIsInvalid
              ? intl.formatMessage({
                  id: question?.invalidInputMessage || "FIELD_CANNOT_BE_BLANK",
                  defaultMessage: "Cannot be blank",
                })
              : ""
          }
          style={{ marginBottom: 10, maxWidth: 400 }}
          onChange={handleTextChange}
          value={get(formFieldGroup, ["actualValues", question?.label], "")}
        ></TextField>
      );
    default:
      return (
        <Typography>
          <FormattedMessage
            id="SOMETHING_WENT_WRONG_CONTACT_DEVELOPER"
            defaultMessage="Something went wrong. Alert a developer by leaving feedback"
          />
        </Typography>
      );
  }
};

export default SingleFormField;
