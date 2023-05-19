import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { filter, get, map } from "lodash-es";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { SingleFormField, Collection, FormFieldGroup } from "../../types";
import {
  calculateWhetherCustomOptionValuesArePermitted,
  updateCollection,
  updateOptionFormFieldGroupWithOptionList,
} from "../../utilities/singleFormFieldUtils";
import { isNonEmptyString } from "../../utilities/validators";
import InfoIcon from "../InfoIcon";
import SingleFormFieldComponent from "../SingleFormField";

const OptionSet: React.FC<{
  formField: SingleFormField;
  collection: Collection;
  targetformFieldIdx: number;
  setCollection: (collection: Collection) => void;
}> = ({ formField, collection, targetformFieldIdx, setCollection }) => {
  const intl: IntlShape = useIntl();
  const checkBoxLabel: string = intl.formatMessage({
    id: "CAN_END_USER_ADD_CUSTOM_OPTIONS_SHORT",
    defaultMessage:
      "Can video annotators in this collection add their own options?",
  });

  let options: string[] = get(formField, ["autocompleteOptions"], []);

  const [canAddOptions, setCanAddOptions] = useState<boolean>(true);

  const [autocompleteValues, setAutocompleteValues] = useState<{}>({});
  const [invalidOptions, setInvalidOptions] = useState<{}>({});
  const optionFormFieldGroup: FormFieldGroup = useMemo(() => {
    return {
      title: "OptionFormFieldGroup",
      setValues: setAutocompleteValues,
      actualValues: autocompleteValues,
      isInvalids: invalidOptions,
      setIsInvalids: setInvalidOptions,
    };
  }, [invalidOptions, autocompleteValues]);

  useEffect(() => {
    updateOptionFormFieldGroupWithOptionList(options, optionFormFieldGroup);

    const newKey: string = intl.formatMessage({
      id: "CAN_END_USER_ADD_CUSTOM_OPTIONS_SHORT",
      defaultMessage:
        "Can video annotators in this collection add their own options?",
    });

    const canEndUserAddCustomOptionsVals =
      calculateWhetherCustomOptionValuesArePermitted(
        optionFormFieldGroup,
        intl
      );

    if (optionFormFieldGroup?.setValues) {
      optionFormFieldGroup.setValues((prevState: {}) => {
        return { ...prevState, [newKey]: canEndUserAddCustomOptionsVals };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const autoCompleteVals: string[] = filter(
      optionFormFieldGroup?.actualValues || {},
      (_optionFormFieldGroupValue, optionFormFieldGroupKey) => {
        return optionFormFieldGroupKey.startsWith("Option"); // @TODO prevent the collection owner from making labels that start with Option??? Or at least test for wonky behavior
      }
    );
    updateCollection(
      collection,
      targetformFieldIdx,
      "autocompleteOptions",
      autoCompleteVals,
      setCollection
    );

    const canEndUserAddCustomOptionsVals =
      calculateWhetherCustomOptionValuesArePermitted(
        optionFormFieldGroup,
        intl
      );
    updateCollection(
      collection,
      targetformFieldIdx,
      "usersCanAddCustomOptions",
      canEndUserAddCustomOptionsVals,
      setCollection
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionFormFieldGroup]);

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
        <SingleFormFieldComponent
          key={key}
          question={optionFormField}
          areAutocompleteOptionsDeletable={true}
          formFieldGroup={optionFormFieldGroup}
        />
      </>
    );
  });

  const handleAddAnotherOption: () => void = () => {
    options.push("");
    updateOptionFormFieldGroupWithOptionList(options, optionFormFieldGroup);
  };

  const handleCheckChange: (event: any) => void = (_event: any) => {
    const newActualValue: {} = { [checkBoxLabel]: !canAddOptions }; // !canAddOptions instead of canAddOptions because it hasn't re-rendered yet
    setCanAddOptions((prev) => !prev);
    if (optionFormFieldGroup?.setValues) {
      optionFormFieldGroup.setValues((prevState: {}) => {
        return { ...prevState, ...newActualValue };
      });
    }
  };

  return (
    <>
      <Paper
        elevation={8}
        style={{
          margin: "auto",
          marginTop: "3vh",
          paddingBottom: "10vh",
          paddingTop: "3vh",
          paddingLeft: "3vw",
          paddingRight: "3vw",
          maxWidth: 190,
        }}
      >
        <Typography style={{ marginBottom: 10 }}>{formField?.label}</Typography>
        {optionFormFields}
        <Button
          variant="contained"
          onClick={handleAddAnotherOption}
          style={{ marginBottom: 10 }}
        >
          <FormattedMessage
            id="ADD_ANOTHER_OPTION"
            defaultMessage="Add another option"
          />
        </Button>
      </Paper>
      <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
        {/* <SingleFormFieldComponent
          key="canEndUserAddCustomOptionsCheckbox"
          question={canEndUserAddCustomOptionsCheckbox}
          formFieldGroup={optionFormFieldGroup}
        /> */}
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <FormControlLabel
            style={{ marginRight: 10 }}
            control={<Checkbox checked={canAddOptions} />}
            // value={true}
            value={get(
              optionFormFieldGroup,
              ["actualValues", checkBoxLabel],
              true
            )}
            onChange={handleCheckChange}
            label={checkBoxLabel}
          />
        </div>
        <InfoIcon
          messageId="CAN_END_USER_ADD_CUSTOM_OPTIONS"
          defaultMessage="Can the people annotating videos in this collection add their own candidates to this list? You as the collection owner will be able to approve or remove these later."
        />
      </div>
    </>
  );
};

export default OptionSet;
