import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { useRouter, NextRouter } from "next/router";
import { pathsToHideLoginBtnFrom } from "../../utilities/doNotShowLoginBtn";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";

const Navbar: React.FC = () => {
  // const { auth, loading } = useContext(AuthContext);
  const { authUser, loading: firebaseLoading, signOut } = useFirebaseAuth();
  const currentUser = authUser?.currentUser;
  console.log("deleteMe currentUser is: ");
  console.log(currentUser);
  const router: NextRouter = useRouter();
  console.log("deleteMe route is: ");
  console.log(router.pathname);
  const hideLoginBtn: boolean = pathsToHideLoginBtnFrom.includes(
    router.pathname
  );
  const showLogin: boolean = !currentUser && !hideLoginBtn;
  const showLogout: boolean = Boolean(currentUser);

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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {showLogin && (
          <Button variant="contained" color="secondary" href="/login">
            Login
          </Button>
        )}
        {showLogout && (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
