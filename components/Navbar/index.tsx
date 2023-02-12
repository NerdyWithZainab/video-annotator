import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import { pathsToHideLoginBtnFrom } from "../../utilities/doNotShowLoginBtn";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { FormattedMessage } from "react-intl";
// import Logo from "../Logo";

const Navbar: React.FC = () => {
  const { user, signOut } = useFirebaseAuth();
  const displayName = user?.displayName || user?.email;
  const router: NextRouter = useRouter();
  const hideLoginBtn: boolean = pathsToHideLoginBtnFrom.includes(
    router.pathname
  );

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);

  useEffect(() => {
    console.log("deleteMe user is: ");
    console.log(user);
    setShowLogin(!user && !hideLoginBtn);
    setShowLogout(Boolean(user));
  }, [user, hideLoginBtn]);

  const handleLogout = async () => {
    await signOut();
  };
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        {/* <Logo
          style={{ display: "block", width: 50, margin: "16px 8px 20px 0" }}
        /> */}
        {displayName && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <FormattedMessage
              id="WELCOME_USER"
              values={{ username: displayName }}
            />
          </Typography>
        )}
        {!displayName && (
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
        )}
        {showLogin && (
          <Button
            variant="contained"
            color="secondary"
            href="/login"
            data-testid="login-button"
            style={{ textAlign: "right" }}
          >
            <FormattedMessage id="LOGIN" defaultMessage="Login" />
          </Button>
        )}
        {showLogout && (
          <Button
            variant="contained"
            data-testid="logout-button"
            onClick={handleLogout}
            style={{ justifyContent: "right" }}
          >
            <FormattedMessage id="LOGOUT" defaultMessage="Logout" />
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
