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
import { updateCollection } from "../../utilities/singleFormFieldUtils";

const SingleFormField: React.FC<{
  question: SingleFormField;
  formFieldGroup: FormFieldGroup | {};
  areAutocompleteOptionsDeletable?: boolean;
}> = ({
  question,
  formFieldGroup,
  areAutocompleteOptionsDeletable = false,
}) => {
  console.log("deleteMe current question is: ");
  console.log(question);
  console.log("deleteMe actualValues are: ");
  console.log("deleteMe boomie is: ");
  console.log(get(formFieldGroup, ["actualValues"]));
  const actualVals: {} = get(formFieldGroup, ["actualValues"]);
  console.log("deleteMe actualVals g1 is: ");
  console.log(actualVals);
  let currentVal: any = get(actualVals, [question.label]);
  if (!currentVal) {
    currentVal = get(actualVals, ["actualValues", question.label]);
  }
  console.log("deleteMe currentVal f1 is: ");
  console.log(currentVal);
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
      // console.log("deleteMe this happens a");
      updateStates(false, false);
    }

    if (
      question?.type === "Date" &&
      !get(formFieldGroup, ["actualValues", question?.label])
    ) {
      updateStates(dayjs(), false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [formFieldGroup, question?.label, question?.type]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let currentVal: any = null;

  useEffect(() => {
    console.log(
      "deleteMe this happens e, meaning that formFieldGroup: " +
        formFieldGroup?.title +
        " has changed."
    );
    const currentVal: any = get(formFieldGroup, [
      "actualValues",
      question?.label,
    ]);
    console.log("deleteMe currentVal is: ");
    console.log(currentVal);
  }, [formFieldGroup, question?.label]);

  // useEffect(() => {
  //   // console.log("deleteMe this happens b and currentVal is: ");
  //   // console.log(currentVal);
  //   if (question?.type === "Checkbox") {
  //     updateStates(currentVal, false);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentVal]);

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
      console.log("deleteMe newValue is: ");
      console.log(newValue);
      updateStates(newValue);
      // const deleteMeTmp: any = get(
      //   formFieldGroup,
      //   ["actualValues", question?.label],
      //   ""
      // );
      // console.log("deleteMe boomie is: ");
      // console.log(deleteMeTmp);
    } else {
      console.log("deleteMe got here a1 and shouldn't right now");
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
    // @TODO move this to a util file?
    currentVal: any,
    defaultValidValue: boolean = false
  ) => {
    const newActualValue: {} = { [question.label]: currentVal };
    console.log("deleteMe newActualValue is: ");
    console.log(newActualValue);
    console.log(
      "deleteMe about to update formFieldGroup: " +
        get(formFieldGroup, ["title"])
    );
    const setVals: any = get(formFieldGroup, ["setValues"], null);
    if (Boolean(setVals)) {
      console.log("deleteMe about to call set values for said formFieldGroup");
      console.log("deleteMe formFieldGroup before is: "); // @TODO LEFT OFF HERE
      console.log(formFieldGroup);
      setVals((prevState: {}) => {
        console.log("deleteMe got here h1 prevState is: ");
        console.log(prevState);
        const preVals: any = get(prevState, ["actualValues"], null);
        console.log("deleteMe preVals are: ");
        console.log(preVals);
        const returnVal: {} = {
          ...prevState,
          // actualValues: {
          // @TODO this area is suspicious. It's a candidate for the actualValues nested insertion
          // ...preVals,
          [question.label]: currentVal,
          // },
        };
        console.log("deleteMe returnVal is: ");
        console.log(returnVal);
        return returnVal;
      });
      console.log("deleteMe done done");
      console.log("deleteMe formFieldGroup after is: ");
      console.log(formFieldGroup);
      // updateCollection()
    }
    // formFieldGroup?.setValues
    //   ? formFieldGroup.setValues((prevState: {}) => {
    //       return { ...prevState, ...newActualValue };
    //     })
    //   : undefined; // I was getting silly linter errors if I didn't do something like this.

    console.log("deleteMe formFieldGroup?.actualValues is: ");
    console.log(formFieldGroup?.actualValues);

    const currentFormIsInvalid = question.validatorMethod
      ? !question.validatorMethod(currentVal)
      : defaultValidValue;

    const validationStateAndLabelExist: boolean = Boolean(
      formFieldGroup?.isInvalids && question?.label
    );

    validationStateAndLabelExist && formFieldGroup?.setIsInvalids
      ? formFieldGroup.setIsInvalids({
          ...formFieldGroup.isInvalids,
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
          {areAutocompleteOptionsDeletable && (
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
