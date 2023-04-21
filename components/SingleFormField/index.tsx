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
import { Collection, SingleFormField } from "../../types";
import { ReactNode, SyntheticEvent, useState } from "react";
import InfoIcon from "../InfoIcon";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const SingleFormField: React.FC<{
  question: SingleFormField;
  collection: Collection;
}> = ({ question, collection }) => {
  const intl: IntlShape = useIntl();
  const currentIsInvalid: boolean = get(
    collection,
    ["formFieldGroup", "isInvalids", question?.label],
    false
  );

  const handleTextChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentVal: any = event?.currentTarget?.value;
    updateStates(currentVal);
  };

  const handleAutocompleteChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: any
  ) => void = (event: SyntheticEvent<Element, Event>, newValue: any) => {
    if (newValue) {
      updateStates(newValue);
    } else {
      updateStates(""); // otherwise, there is an error
    }
  };

  const handleCheckChange: (event: any) => void = (event: any) => {
    const currentVal: any = event?.target?.checked;
    updateStates(currentVal);
  };

  const handleDateChange: (newValue: {}) => void = (newValue: {}) => {
    updateStates(newValue);
  };

  const updateStates: (currentVal: any, defaultValidValue?: boolean) => void = (
    currentVal: any,
    defaultValidValue: boolean = false
  ) => {
    const newActualValue: {} = { [question.label]: currentVal };
    collection?.formFieldGroup?.setValues
      ? collection.formFieldGroup.setValues((prevState: {}) => {
          return { ...prevState, ...newActualValue };
        })
      : undefined; // I was getting silly linter errors if I didn't do something like this.

    const currentFormIsInvalid = question.validatorMethod
      ? !question.validatorMethod(currentVal)
      : defaultValidValue;
    collection?.formFieldGroup?.setIsInvalids &&
    collection?.formFieldGroup?.isInvalids &&
    question?.label
      ? collection.formFieldGroup.setIsInvalids({
          ...collection.formFieldGroup.isInvalids,
          [question.label]: currentFormIsInvalid,
        })
      : undefined;
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
          value={get(
            collection,
            ["formFieldGroup", "actualValues", question?.label],
            ""
          )}
        ></TextField>
      );
    case "Text":
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
          value={get(
            collection,
            ["formFieldGroup", "actualValues", question?.label],
            ""
          )}
        ></TextField>
      );
    case "Checkbox":
      return (
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <FormControlLabel
            style={{ marginRight: 10 }}
            control={<Checkbox />}
            value={get(
              collection,
              ["formFieldGroup", "actualValues", question?.label],
              true
            )}
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
            value={get(
              collection,
              ["formFieldGroup", "actualValues", question?.label],
              ""
            )}
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
                required={question?.isRequired}
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
          // variant="filled"
          // label={question?.label}
          style={{ marginBottom: 10, maxWidth: 400 }}
          value={get(
            collection,
            ["formFieldGroup", "actualValues", question?.label],
            ""
          )}
          onChange={handleAutocompleteChange}
          {...autocompleteExtras}
          inputValue={get(
            collection,
            ["formFieldGroup", "actualValues", question?.label],
            ""
          )}
          onInputChange={handleAutocompleteChange}
        ></Autocomplete>
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
