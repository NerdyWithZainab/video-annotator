import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

const Navbar: React.FC = () => {
  const { auth, loading } = useContext(AuthContext);
  const currentUser = auth?.currentUser;

  const handleLogout = () => {
    auth.signOut();
    // @TODO I think I need a custom hook to handle listening for this state change
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          Tmp
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        {!currentUser && <Button color="inherit">Login</Button>}
        {currentUser && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
