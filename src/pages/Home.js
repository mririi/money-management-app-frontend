import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as authActions from "../store/actions/auth";
import { withStyles } from "@material-ui/core/styles";
import colors from "../constants/colors";
import logo from "../assets/logo.png";
import userImage from "../assets/user.png";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Skeleton } from "@mui/material";
// import { Button } from "@material-ui/core";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
const styles = {
  main: {
    display: "flex",
    // backgroundColor: colors.primary,
  },
  drawer: {
    width: 250,
    margin: 18,
    height: "95vh",
    backgroundColor: colors.secondary,
    borderRadius: 30,
  },
  logo: {
    width: 130,
    height: 130,
    marginLeft: 55,
  },
  line: {
    backgroundColor: colors.accent,
    height: 3,
    width: 250,
  },
  drawerItems: {},
  drawerItem: {
    width: 250,
  },
};
const Home = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState("dashboard");

  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  useEffect(() => {
    const getUser = async () => {
      const local = localStorage.getItem("token");
      const { token } = JSON.parse(local);
      if (token) {
        dispatch(authActions.getProfile(token));
        navigate("/");
      } else {
        navigate("/login");
      }
    };
    getUser();
  }, [navigate, dispatch]);
  const user = useSelector((state) => state.auth.user);
  const { classes } = props;
  return (
    <div className={classes.main}>
      <div className={classes.drawer}>
        <img src={logo} alt="Logo" className={classes.logo} />
        <div className={classes.line}></div>
        <div className={classes.drawerItems}>
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <ToggleButton value="dashboard" aria-label="dashboard">
              <span style={{ color: "white" }}>Dashboard</span>
            </ToggleButton>
            <ToggleButton value="module" aria-label="module">
              <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="quilt" aria-label="quilt">
              <ViewQuiltIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 40,
            height: 30,
            width: 210,
          }}
        >
          <div
            style={{
              display: "flex",
              backgroundColor: colors.third,
              borderRadius: 50,
            }}
          >
            <img
              src={userImage}
              alt="user"
              style={{ width: 50, height: 50, borderRadius: 50 }}
            />
            <span
              style={{
                color: colors.accent,
                width: 100,
                marginLeft: 20,
                marginTop: 10,
              }}
            >
              {user ? (
                user.name
              ) : (
                <Skeleton
                  variant="rectangular"
                  width={90}
                  height={20}
                  style={{ marginTop: 5 }}
                />
              )}
            </span>
            <Link to="/login">
              <LogoutIcon
                onClick={() => {
                  dispatch(authActions.logOut());
                }}
                style={{
                  marginTop: 8,
                  height: 30,
                  width: 30,
                  color: colors.accent,
                  backgroundColor: "transparent",
                }}
              />
            </Link>
          </div>
        </div>
      </div>
      <div
        style={{
          margin: 20,
          backgroundColor: colors.third,
          position: "absolute",
          bottom: 20,
          top: 20,
          left: 280,
          right: 20,
          borderRadius: 50,
          boxShadow: `10px 10px ${colors.secondary}, -0.5em 0 1em ${colors.secondary}`,
        }}
      >
        <div
          style={{
            display: view === "dashboard" ? "block" : "none",
          }}
        >
          <p>zzz</p>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Home);
