import { Drawer } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as authActions from "../store/actions/auth";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const local = localStorage.getItem("token");
      const token = JSON.parse(local);
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
  return (
    <div>
      {/* <Drawer anchor="left" open="left" onClose={false}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={false}
          onKeyDown={false}
        >
          <p>jdjd</p>
        </Box>
      </Drawer> */}

      <p>{user ? user.email : "no user"}</p>
    </div>
  );
};

export default Home;
