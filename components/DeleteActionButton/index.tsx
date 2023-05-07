import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useIntl, IntlShape } from "react-intl";
import { Collection, FormFieldGroup, SingleFormField } from "../../types";
import { filter, get, reduce } from "lodash-es";
import {
  updateCollection,
  updateOptionFormFieldGroupWithOptionList,
} from "../../utilities/singleFormFieldUtils";

const DeleteActionButton: React.FC<{
  // props: {
  question?: SingleFormField;
  formFieldGroup?: FormFieldGroup;
  formGroupIdx?: number;
  collection?: Collection;
  setCollection?: () => void;
  targetformFieldIdx?: number;
  optionFormFieldGroup?: FormFieldGroup;
  // };
}> = (props) => {
  const intl: IntlShape = useIntl();

  const handleDeleteClick: () => void = () => {
    // console.log("deleteMe handleDeleteClick entered");
    console.log("deleteMe question in handleDeleteClick is: ");
    console.log(props.question);
    // console.log("deleteMe formFieldGroup is: ");
    // console.log(props?.formFieldGroup);
    // console.log("deleteMe formGroupIdx is: ");
    // console.log(props?.formGroupIdx);
    const currentActualValues = get(props, ["formFieldGroup", "actualValues"]);
    const filteredAcutalValues = reduce(
      currentActualValues,
      (memo, currentActualValue, currentKey) => {
        // console.log("deleteMe currentActualValue is: ");
        // console.log(currentActualValue);
        // console.log("deleteMe currentKey is: ");
        // console.log(currentKey);
        if (props?.question?.label !== currentKey) {
          return { ...memo, [currentKey]: currentActualValue };
        } else {
          return { ...memo };
        }
      },
      {}
    );
    console.log("deleteMe filteredAcutalValues are: ");
    console.log(filteredAcutalValues);

    // Now, we have to rename some of the labels, because, say, if Option 2 got removed, the old Option 3 should become the new Option 2.

    const autoCompleteVals: string[] = filter(
      filteredAcutalValues || {},
      (_optionFormFieldGroupValue, optionFormFieldGroupKey) => {
        return optionFormFieldGroupKey.startsWith("Option"); // @TODO prevent the collection owner from making labels that start with Option??? Or at least test for wonky behavior
      }
    );
    // console.log("deleteMe autoCompleteVals are: ");
    // console.log(autoCompleteVals);
    if (props.optionFormFieldGroup) {
      // console.log("deleteMe got here a1");
      // console.log("deleteMe collection is: ");
      // console.log(props.collection);
      // console.log("deleteMe formGroupIdx is: ");
      // console.log(props.formGroupIdx);
      console.log("deleteMe autoCompleteVals are: ");
      console.log(autoCompleteVals);
      updateOptionFormFieldGroupWithOptionList(
        autoCompleteVals,
        props.optionFormFieldGroup
      );
    }
  };

  return (
    <Tooltip
      title={intl.formatMessage({ id: "DELETE", defaultMessage: "Delete" })}
    >
      <span style={{ marginTop: 14, marginLeft: 3 }}>
        <DeleteIcon onClick={handleDeleteClick} />
      </span>
    </Tooltip>
  );
};

export default DeleteActionButton;
