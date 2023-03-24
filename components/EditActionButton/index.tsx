import { Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import { useIntl, IntlShape } from "react-intl";

const EditActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  const intl: IntlShape = useIntl();
  // @TODO add button click handler and possibly prevent propagation
  return (
    <Tooltip title={intl.formatMessage({ id: "EDIT", defaultMessage: "Edit" })}>
      <EditIcon />
    </Tooltip>
  );
};

export default EditActionButton;
