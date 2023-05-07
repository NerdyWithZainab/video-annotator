import { Button, Paper, Typography } from "@mui/material";
import { filter, forEach, get, map, reduce } from "lodash-es";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { SingleFormField, Collection, FormFieldGroup } from "../../types";
import {
  updateCollection,
  updateOptionFormFieldGroupWithOptionList,
} from "../../utilities/singleFormFieldUtils";
import { isNonEmptyString } from "../../utilities/validators";
import SingleFormFieldComponent from "../SingleFormField";

const OptionSet: React.FC<{
  formField: SingleFormField;
  collection: Collection;
  targetformFieldIdx: number;
  setCollection: (collection: Collection) => void;
}> = ({ formField, collection, targetformFieldIdx, setCollection }) => {
  const intl: IntlShape = useIntl();
  let options: string[] = get(formField, ["autocompleteOptions"], []);
  // const usersCanAddCustomOptions: boolean = get(
  //   formField,
  //   ["usersCanAddCustomOptions"],
  //   false
  // );

  // console.log("deleteMe options are: ");
  // console.log(options);
  // console.log("deleteMe usersCanAddCustomOptions is: ");
  // console.log(usersCanAddCustomOptions);
  // console.log("deleteMe collection is: ");
  // console.log(collection);

  // console.log("deleteMe targetformFieldIdx is: ");
  // console.log(targetformFieldIdx);

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
    updateOptionFormFieldGroupWithOptionList(options, optionFormFieldGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("deleteMe optionFormFieldGroup?.actualValues is: ");
    console.log(optionFormFieldGroup?.actualValues);

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

    const canEndUserAddCustomOptionsValsArr: string[] = filter(
      optionFormFieldGroup?.actualValues || {},
      (_optionFormFieldGroupValue, optionFormFieldGroupKey) => {
        const targetString: string = intl.formatMessage({
          id: "CAN_END_USER_ADD_CUSTOM_OPTIONS",
          defaultMessage:
            "Can the people annotating videos in this collection add their own candidates to this list? You as the collection owner will be able to approve or remove these later.",
        });
        return optionFormFieldGroupKey.startsWith(targetString);
      }
    );
    updateCollection(
      collection,
      targetformFieldIdx,
      "usersCanAddCustomOptions",
      get(canEndUserAddCustomOptionsValsArr, [0], true),
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
          isDeletable={true}
          formFieldGroup={optionFormFieldGroup}
          formGroupIdx={optionIdx}
          targetformFieldIdx={targetformFieldIdx}
          collection={collection}
          setCollection={setCollection}
          optionFormFieldGroup={optionFormFieldGroup}
        />
      </>
    );
  });

  const canEndUserAddCustomOptionsCheckbox = {
    label: intl.formatMessage({
      id: "CAN_END_USER_ADD_CUSTOM_OPTIONS",
      defaultMessage:
        "Can the people annotating videos in this collection add their own candidates to this list? You as the collection owner will be able to approve or remove these later.",
    }),
    type: "Checkbox",
    language: formField?.language,
    isRequired: true,
    shouldBeCheckboxes: [],
  };

  const handleAddAnotherOption: () => void = () => {
    options.push("");
    updateOptionFormFieldGroupWithOptionList(options, optionFormFieldGroup);
  };

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
      <Button variant="contained" onClick={handleAddAnotherOption}>
        <FormattedMessage
          id="ADD_ANOTHER_OPTION"
          defaultMessage="Add another option"
        />
      </Button>
      <SingleFormFieldComponent
        key="canEndUserAddCustomOptionsCheckbox"
        question={canEndUserAddCustomOptionsCheckbox}
        formFieldGroup={optionFormFieldGroup}
      />
    </Paper>
  );
};

export default OptionSet;
