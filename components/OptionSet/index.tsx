import { Paper, Typography } from "@mui/material";
import { forEach, get, map } from "lodash-es";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { SingleFormField, Collection, FormFieldGroup } from "../../types";
import { isNonEmptyString } from "../../utilities/validators";
import SingleFormFieldComponent from "../SingleFormField";

const OptionSet: React.FC<{
  formField: SingleFormField;
  collection: Collection;
  targetformFieldIdx: number;
}> = ({ formField, collection, targetformFieldIdx }) => {
  const options: string[] = get(formField, ["autocompleteOptions"], []);
  const usersCanAddCustomOptions: boolean = get(
    formField,
    ["usersCanAddCustomOptions"],
    false
  );
  console.log("deleteMe options are: ");
  console.log(options);

  const [optionValues, setOptionValues] = useState<{}>({});
  const [invalidOptions, setInvalidOptions] = useState<{}>({});
  const optionFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      setValues: setOptionValues,
      actualValues: optionValues,
      isInvalids: invalidOptions,
      setIsInvalids: setInvalidOptions,
    };
  }, [invalidOptions, optionValues]);

  useEffect(() => {
    forEach(options, (option, optionIdx) => {
      const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option };
      optionFormFieldGroup?.setValues
        ? optionFormFieldGroup.setValues((prevState: {}) => {
            return { ...prevState, ...newActualValue };
          })
        : undefined;
    });
  }, [optionFormFieldGroup, options]);

  const formFieldSet: SingleFormField[] = map(
    options,
    (_option: string, optionIdx: number) => {
      const currentFormFieldForOption = {
        label: "Option " + (optionIdx + 1),
        type: "Text",
        language: formField?.language,
        isRequired: true,
        shouldBeCheckboxes: [],
        invalidInputMessage: "FIELD_CANNOT_BE_BLANK",
        validatorMethod: isNonEmptyString,
      };
      return currentFormFieldForOption; // @TODO fix
    }
  );

  const optionFormFields = map(formFieldSet, (optionFormField, optionIdx) => {
    const key: string = "option-" + (optionIdx + 1);
    return (
      <>
        {/* <Typography>Option {optionIdx + 1}: </Typography> */}
        <React.Fragment key={key}>
          <SingleFormFieldComponent
            question={optionFormField}
            formFieldGroup={optionFormFieldGroup}
          />
        </React.Fragment>
      </>
    );
  });

  return (
    <Paper
      elevation={8}
      style={{
        margin: "auto",
        marginTop: "10vh",
        paddingBottom: "10vh",
        paddingTop: "3vh",
        paddingLeft: "3vw",
        paddingRight: "3vw",
        maxWidth: 400,
      }}
    >
      <Typography style={{ marginBottom: 10 }}>{formField?.label}</Typography>
      {optionFormFields}
    </Paper>
  );
};

export default OptionSet;
