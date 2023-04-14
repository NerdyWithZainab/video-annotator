import { Avatar, ClickAwayListener, Tooltip } from "@mui/material";
import { useState } from "react";
import { IntlShape, useIntl } from "react-intl";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const InfoIcon: React.FC<{ messageId: string; defaultMessage: string }> = ({
  messageId,
  defaultMessage,
}) => {
  const intl: IntlShape = useIntl();

  const [openTooltip, setOpenTooltip] = useState(false);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };

  const handleOpenTooltip = () => {
    setOpenTooltip(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        open={openTooltip}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={intl.formatMessage({
          id: messageId,
          defaultMessage: defaultMessage,
        })}
      >
        <Avatar // @TODO extract this as its own component
          style={{
            // border: "1px solid black",
            height: 25,
            width: 25,
            paddingRight: 0,
            marginRight: 0,
          }}
          onClick={handleOpenTooltip}
        >
          <QuestionMarkIcon />
        </Avatar>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default InfoIcon;
