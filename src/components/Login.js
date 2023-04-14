import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../components/Login.css";
import { auth, provider } from "../firebase";
import { addUser } from "../features/userSlice";

function Login() {
  const dispatch = useDispatch();
  const signInUser = () => {
    signInWithPopup(auth, provider)
      .then((userCred) => {
        dispatch(
          addUser({
            name: userCred.user.displayName,
            email: userCred.user.email,
            photo: userCred.user.photoURL,
          })
        );
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://imgs.search.brave.com/wg6I9L9qMVvrjJFKd9S4Es71jh3bhPGxHQXYVrgKLms/rs:fit:1012:1024:1/g:ce/aHR0cDovL3d3dy5w/bmdhbGwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L1doYXRzQXBwLVRy/YW5zcGFyZW50LnBu/Zw"
          alt=""
        />
        <Button variant="contained" onClick={signInUser}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
