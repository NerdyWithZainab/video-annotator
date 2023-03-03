import InfoPanel from "../InfoPanel";
import InfoPanelBody from "../InfoPanel/InfoPanelBody";
import { FormattedMessage } from "react-intl";
import { Button } from "@mui/material";

const UserDetailPanel: React.FC<{ displayName?: string; email: string }> = ({
  displayName,
  email,
}) => {
  return (
    <InfoPanel
      titleId="USER_INFO"
      titleDefault="User Details"
      key="user-details"
    >
      {displayName && (
        <InfoPanelBody bodyId="USERNAME" bodyDefault="Username">
          {": "}
          {displayName}
        </InfoPanelBody>
      )}
      <InfoPanelBody bodyId="EMAIL_ADDRESS" bodyDefault="Email Address">
        {" "}
        :{email}
      </InfoPanelBody>
      <Button variant="contained">
        <FormattedMessage id="RESET_PASSWORD" defaultMessage="Reset Password" />
      </Button>
    </InfoPanel>
  );
};

export default UserDetailPanel;
