import "../css/Login.css";
import Avvvatars from "avvvatars-react";
import { PasswordContainer } from "./PasswordContainer";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GeneratePassword } from "../functions/GeneratePassword";

import { SignIn } from "../firebase/Auth";
import { GenerateEmail } from "../functions/GenerateEmail";
import { readCollection } from "../firebase/FireStore";

export const Login = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    readCollection("users").then((res) => {
      setUsers([]);
      res.map((r) => {
        setUsers((users) => [...users, r.data.name]);
      });
    });
  }, []);

  const [userName, setUserName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [password, setPassword] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const characterArrays = "AOPQW47";

  const resetPassword = () => {
    setPassword([
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ]);
  };

  return (
    <div className="login-container">
      <ToastContainer></ToastContainer>
      {userName === "" && (
        <div className="avatars-container">
          {users.map((char, i) => {
            return (
              <div
                key={char + i}
                className="avatar-container"
                onClick={() => {
                  setUserName(char);
                  setUserNumber(i);
                }}
              >
                <Avvvatars
                  value={characterArrays.charAt(i % characterArrays.length)}
                  borderSize={5}
                  style="shape"
                  border={true}
                  size={66}
                  className="avatar-icon"
                />
                <p>{char}</p>
              </div>
            );
          })}
        </div>
      )}
      {userName !== "" && (
        <div className="password-container">
          <div className="password-avatar-head">
            <div className="password-avatar-container">
              <Avvvatars
                value={characterArrays.charAt(
                  userNumber % characterArrays.length
                )}
                borderSize={5}
                style="shape"
                border={true}
                size={80}
                className="avatar-icon"
              />
              <h2>{userName}</h2>
            </div>
            <button
              className="btn-change-user"
              onClick={() => {
                setUserName("");
                setUserNumber("");
                resetPassword();
              }}
            >
              Change User
            </button>
          </div>
          <PasswordContainer setPassword={setPassword} password={password} />
          <button
            className="btn-go"
            onClick={() => {
              if (password.filter((p) => p === true) < 2) {
                toast.error("must be at least 2 characters");
              } else {
                const userEmail = GenerateEmail(userName);
                const userPassword = GeneratePassword(password);

                SignIn(userEmail, userPassword);
              }
            }}
          >
            go
          </button>
        </div>
      )}
    </div>
  );
};
