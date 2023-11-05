import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../css/SubmitGame.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FbAdd, FbAddWithoutUID, readData } from "../firebase/FireStore";
import { authentication } from "../firebase/Auth";
import { onAuthStateChanged } from "firebase/auth";

export const SubmitGame = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [userData, setUserData] = useState({});
  const [author, setAuthor] = useState("");
  const date = new Date();

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      // const author = authentication.currentUser.uid;
      if (user) {
        setAuthor(user.uid);
        readData("users", user.uid).then((res) => {
          setUserData(res);
        });
      }
    });
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    readData("games", id).then((res) => {
      if (res !== undefined) {
        toast.error("Game already uploaded");
      } else {
        FbAdd("games", id, {
          gameId: id,
          gameName: name,
          dateUploaded: date,
          author: author,
          likes: 0,
          status: "active",
          likeList: [],
        }).then((result) => {
          if (result.status === 200) {
            FbAdd("users", author, {
              role: userData.role,
              uid: userData.uid,
              scratchPassword: userData.scratchPassword,
              stars: userData.stars + 1,
              name: userData.name,
              scratchUserName: userData.scratchUserName,
              course: userData.course,
              password: userData.password,
            });
            toast.success("Game Submitted!");

            setTimeout(() => {
              window.location.reload(false);
            }, 3000);
          } else {
            toast.error("Oops! Something went wrong! Contact Teacher David");
          }
        });
      }
    });
  };

  return (
    <div className="contact-via-email-container">
      <ToastContainer></ToastContainer>
      <h2>Submit Your Scratch Game</h2>

      <form onSubmit={sendEmail} className="form-send-email">
        <div className="form-input">
          <div className="row-1">
            <label className="text-input">Name of the game</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          <div className="row-2">
            <label htmlFor="message">
              Enter the game Id (for example: 915475959)
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                if (e.target.value.includes("/projects/")) {
                  setId(e.target.value.split("/projects/")[1].substring(0, 9));
                } else {
                  setId(e.target.value);
                }
              }}
              onPaste={(e) => {
                setId(e.target.value);
                if (e.target.value.includes("/projects/")) {
                  setId(e.target.value.split("/projects/")[1].substring(0, 9));
                } else {
                  setId(e.target.value);
                }
              }}
            />
          </div>
        </div>

        <input type="submit" value="Send Email" className="send-email-button" />
      </form>
    </div>
  );
};
