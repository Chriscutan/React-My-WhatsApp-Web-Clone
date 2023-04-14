import React from "react";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { BeatLoader } from "react-spinners";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading__content">
          <img
            src="https://imgs.search.brave.com/wg6I9L9qMVvrjJFKd9S4Es71jh3bhPGxHQXYVrgKLms/rs:fit:1012:1024:1/g:ce/aHR0cDovL3d3dy5w/bmdhbGwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzA0/L1doYXRzQXBwLVRy/YW5zcGFyZW50LnBu/Zw"
            alt=""
          />
          <BeatLoader color="green" size={20} />
        </div>
      </div>
    );
  }
  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Chat />
        </div>
      )}
    </div>
  );
}

export default App;
