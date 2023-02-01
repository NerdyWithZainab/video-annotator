import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";
import { useTheme } from "@material-ui/core/styles";

const Navbar: React.FC = () => {
  const { auth, loading } = useContext(AuthContext);
  const currentUser = auth?.currentUser;

  const theme = useTheme();
  console.log("deleteMe theme primary in child is: ");
  // console.log(theme);
  console.log(theme.palette.primary.main);

  const handleLogout = () => {
    auth.signOut();
    // @TODO I think I need a custom hook to handle listening for this state change
  };
  //color={theme.palette.primary}
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: theme.palette.primary.main }}
    >
      <Toolbar>
        <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }}>
          Tmp
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {!currentUser && <Button variant="contained">Login</Button>}
        {currentUser && (
          <Button variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
