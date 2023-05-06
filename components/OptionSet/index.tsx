import { Paper, Typography } from "@mui/material";
import { filter, forEach, get, map, reduce } from "lodash-es";
import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { IntlShape, useIntl } from "react-intl";
import { SingleFormField, Collection, FormFieldGroup } from "../../types";
import { updateCollection } from "../../utilities/singleFormFieldUtils";
import { isNonEmptyString } from "../../utilities/validators";
import SingleFormFieldComponent from "../SingleFormField";

const OptionSet: React.FC<{
  formField: SingleFormField;
  collection: Collection;
  targetformFieldIdx: number;
  setCollection: (collection: Collection) => void;
}> = ({ formField, collection, targetformFieldIdx, setCollection }) => {
  const intl: IntlShape = useIntl();
  const options: string[] = get(formField, ["autocompleteOptions"], []);
  const usersCanAddCustomOptions: boolean = get(
    formField,
    ["usersCanAddCustomOptions"],
    false
  );

  // console.log("deleteMe options are: ");
  // console.log(options);
  // console.log("deleteMe usersCanAddCustomOptions is: ");
  // console.log(usersCanAddCustomOptions);
  console.log("deleteMe collection is: ");
  console.log(collection);

  console.log("deleteMe targetformFieldIdx is: ");
  console.log(targetformFieldIdx);

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
    // @TODO test whether this useEffect is even necessary.
    forEach(options, (option, optionIdx) => {
      const newActualValue: {} = { ["Option " + (optionIdx + 1)]: option };
      optionFormFieldGroup?.setValues
        ? optionFormFieldGroup.setValues((prevState: {}) => {
            return { ...prevState, ...newActualValue };
          })
        : undefined;
    });
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
    // const otherVals: {} = reduce(
    //   optionFormFieldGroup?.actualValues || {},
    //   (memo, optionFormGroupFieldValue, optionFormGroupFieldKey) => {
    //     // console.log("deleteMe optionFormGroupFieldValue is: ");
    //     // console.log(optionFormGroupFieldValue);
    //     return !optionFormGroupFieldKey.startsWith("Option")
    //       ? { ...memo, [optionFormGroupFieldKey]: optionFormGroupFieldValue }
    //       : { ...memo };
    //   },
    //   {}
    // );

    // forEach(otherVals, (nonOptionVal, nonOptionKey) => {
    //   console.log("deleteMe entry is: ");
    //   console.log(entry);
    //   console.log("deleteMe idx is: ");
    //   console.log(idx);
    //   updateCollection(collection, idx, entry, autoCompleteVals, setCollection);
    // });

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
          formFieldGroup={optionFormFieldGroup}
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
      <SingleFormFieldComponent
        key="canEndUserAddCustomOptionsCheckbox"
        question={canEndUserAddCustomOptionsCheckbox}
        formFieldGroup={optionFormFieldGroup}
      />
    </Paper>
  );
};

export default OptionSet;
