import { Tooltip } from "@mui/material";
import ViewIcon from "@mui/icons-material/Launch";

import { useIntl, IntlShape } from "react-intl";

const ViewActionButton: React.FC<{ props: { id: string | number } }> = (
  props
) => {
  const intl: IntlShape = useIntl();
  // @TODO add button click handler and possibly prevent propagation
  const handleViewClick = async () => {};
  return (
    <Tooltip title={intl.formatMessage({ id: "VIEW", defaultMessage: "View" })}>
      <ViewIcon onClick={handleViewClick} />
    </Tooltip>
  );
};

export default ViewActionButton;
