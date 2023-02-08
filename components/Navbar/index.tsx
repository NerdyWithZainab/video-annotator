import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter, NextRouter } from "next/router";
import { pathsToHideLoginBtnFrom } from "../../utilities/doNotShowLoginBtn";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { FormattedMessage } from "react-intl";

const Navbar: React.FC = () => {
  // const { auth, loading } = useContext(AuthContext);
  const { user, loading: firebaseLoading, signOut } = useFirebaseAuth();
  const displayName = user?.displayName || user?.email;
  // const user = user?.user;
  console.log("deleteMe user is: ");
  console.log(user);
  const router: NextRouter = useRouter();
  console.log("deleteMe route is: ");
  console.log(router.pathname);
  const hideLoginBtn: boolean = pathsToHideLoginBtnFrom.includes(
    router.pathname
  );

  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showLogout, setShowLogout] = useState<boolean>(false);
  // const showLogin: boolean = !user && !hideLoginBtn;
  // const showLogout: boolean = Boolean(user);

  useEffect(() => {
    setShowLogin(!user && !hideLoginBtn);
    setShowLogout(Boolean(user));
  }, [user]);

  // const theme = useTheme();

  const handleLogout = async () => {
    const signedOut = await signOut();
    console.log("deleteMe signedOut is: ");
    console.log(signedOut);
    // @TODO I think I need a custom hook to handle listening for this state change
  };
  //color={theme.palette.primary}
  return (
    <AppBar
      position="sticky"
      // style={{ backgroundColor: theme.palette.primary.main }}
      color="primary"
    >
      <Toolbar>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          Tmp
          {/* <MenuIcon /> */}
        </IconButton>
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
