import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "./firebase";
import logo from './Assets/Logo.png'

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <h1 className="login__title">Welcome To Dev Space</h1>
      <img src={logo} alt="Logo" height='25%' width='25%' />;
      <h2 className="login_slogan">
        Chat Learn Develop
      </h2>
      <Button onClick={signIn}>Sign In</Button>
    </div>
  );
};

export default Login;
