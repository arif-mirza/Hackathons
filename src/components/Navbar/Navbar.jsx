// imports
import { AppBar, Toolbar, styled, Grid, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../store/Slices/authSlice";
const HeaderContainer = styled(AppBar)`
  background: #000;
`;
const Tabs = styled(NavLink)`
  margin: 0 10px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 20px;
`;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <HeaderContainer position="static">
        <Toolbar>
          <Tabs to="/">Home</Tabs>
          <Tabs to="/allnotes">All Notes</Tabs>
          <Tabs to="/addnote">Add Note</Tabs>
          <Grid container justifyContent="flex-end">
            <Button
              component={NavLink}
              to="/login"
              variant="outlined"
              color="inherit"
              sx={{ marginLeft: 2 }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Button
              component={NavLink}
              to="/signup"
              variant="contained"
              color="primary"
              sx={{ marginLeft: 2 }}
            >
              Sign Up
            </Button>
          </Grid>
        </Toolbar>
      </HeaderContainer>
    </>
  );
}

export default Navbar;
