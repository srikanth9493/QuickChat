import { Avatar, Button, IconButton } from "@material-ui/core";
import React from "react";
import "./Login.css";
import PersonIcon from "@material-ui/icons/Person";
import LockIcon from "@material-ui/icons/Lock";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useStateValue } from "./StateProvider";
import db, { auth, provider } from "./firebase";

import { actionTypes } from "./reducer";

function Login() {
  const [{ user }, dispatch] = useStateValue();

  const addUser = (uname, email, photoURL) => {
    db.collection("users").add({
      uname: uname,
      email: email,
      photoURL: photoURL,
    });
  };
  const signIn = () => {
    // auth.
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login__body">
      <div className="login__container">
        <div className="login__logo" id="login__logo">
          <Avatar
            className="login__image"
            alt="Remy Sharp"
            src="https://w7.pngwing.com/pngs/805/719/png-transparent-computer-icons-computer-network-gateway-internet-others-computer-network-logo-online-chat.png"
          />
          <h1> Quick Chat</h1>
          {/* <h3>Sign Into your Account</h3> */}
        </div>
        <div className="login__usname">
          <i>
            <PersonIcon></PersonIcon>
          </i>
          <input placeholder="username"></input>
        </div>
        <div className="login__pass">
          <i>
            <LockIcon></LockIcon>
          </i>
          <input type="password" placeholder="password"></input>
        </div>
        <div className="login__button">
          <Button variant="contained" color="primary">
            Login
          </Button>

          <IconButton
            color="#13BFB1"
            aria-label="add to shopping cart"
            onClick={signIn}
          >
            <div id="login__gauth">
              <AccountCircleIcon />
              <p>Google Auth</p>
            </div>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Login;
