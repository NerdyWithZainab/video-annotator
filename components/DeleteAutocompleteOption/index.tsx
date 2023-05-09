import { Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useIntl, IntlShape } from "react-intl";
import { FormFieldGroup, SingleFormField } from "../../types";
import { filter, get, reduce } from "lodash-es";
import { updateOptionFormFieldGroupWithOptionList } from "../../utilities/singleFormFieldUtils";

const DeleteAutocompleteOption: React.FC<{
  question: SingleFormField;
  formFieldGroup: FormFieldGroup;
}> = (props) => {
  const intl: IntlShape = useIntl();

  const handleDeleteClick: () => void = () => {
    const currentActualValues = get(props, ["formFieldGroup", "actualValues"]);
    const filteredAcutalValues = reduce(
      currentActualValues,
      (memo, currentActualValue, currentKey) => {
        if (props?.question?.label !== currentKey) {
          return { ...memo, [currentKey]: currentActualValue };
        } else {
          return { ...memo };
        }
      },
      {}
    );

    // Now, we have to rename some of the labels, because, say, if Option 2 got removed, the old Option 3 should become the new Option 2.

    const autoCompleteVals: string[] = filter(
      filteredAcutalValues || {},
      (_optionFormFieldGroupValue, optionFormFieldGroupKey) => {
        return optionFormFieldGroupKey.startsWith("Option"); // @TODO prevent the collection owner from making labels that start with Option??? Or at least test for wonky behavior
      }
    );
    if (props.formFieldGroup) {
      updateOptionFormFieldGroupWithOptionList(
        autoCompleteVals,
        props.formFieldGroup
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

export default DeleteAutocompleteOption;
