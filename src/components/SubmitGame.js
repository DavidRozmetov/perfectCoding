import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import "../css/SubmitGame.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SubmitGame = () => {
  const form = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();

    if (form.current) {
      const messageTextarea = form.current.querySelector('[name="message"]');
      const userNameInput = form.current.querySelector('[name="user_name"]');
      const userEmailInput = "davranbekrozmetov2@gmail.com";

      if (!messageTextarea || !userNameInput || !userEmailInput) {
        console.error("Could not find one or more required elements.");
        return;
      }

      if (!userNameInput.value.trim()) {
        userNameInput.style.border = "2px solid red";
        toast.error("Please enter your name.");
        return;
      } else {
        userNameInput.style.border = "none";
      }

      if (!messageTextarea.value.trim()) {
        messageTextarea.style.border = "2px solid red";
        toast.error("Please enter your message.");
        return;
      } else {
        messageTextarea.style.border = "none";
      }

      emailjs
        .sendForm(
          "service_v0sfv5v",
          "template_twvpqhu",
          form.current,
          "QUM0EqjRVwbzq6EAc"
        )
        .then(
          (result) => {
            toast.success("Email sent!");
            setTimeout(() => {
              window.location.reload(false);
            }, 3000);
          },
          (error) => {
            toast.error(
              "Oops! Something went wrong! Please notify me via my other social media"
            );
          }
        );
    }
  };

  return (
    <div className="contact-via-email-container">
      <ToastContainer></ToastContainer>
      <h2>Submit Your Scratch Game</h2>

      <form ref={form} onSubmit={sendEmail} className="form-send-email">
        <div className="form-input">
          <div className="row-1">
            <label htmlFor="user_name" className="text-input">
              Name
            </label>
            <input type="text" name="user_name" />
          </div>

          <div className="row-2">
            <label htmlFor="message">Message</label>
            <textarea name="message" id="message" cols={30} rows={10} />
          </div>
        </div>

        <input type="submit" value="Send Email" className="send-email-button" />
      </form>
    </div>
  );
};
