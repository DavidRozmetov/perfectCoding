import {
  getAuth,
  signInWithEmailAndPassword,
  deleteUser,
  signOut,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,

  projectId: process.env.REACT_APP_PROJECT_ID,

  appId: process.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);

export const CreateUser = (email, password) => {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        // User created successfully.
        const user = userCredential.user;
        const response = {
          status: 200,
          message: user.uid,
        };
        resolve(response);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const response = {
          status: 400,
          message:
            errorCode === "auth/email-already-in-use"
              ? "Email address is already in use."
              : errorMessage,
        };
        reject(response);
      });
  });
};

export const SignIn = (email, password) => {
  signInWithEmailAndPassword(authentication, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      toast.success("logged in as " + email);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/invalid-login-credentials") {
        toast.error("Wrong Password");
      } else {
        toast.error(error.message);
      }
      const errorMessage = error.message;
    });
};

export const SignOut = () => {
  signOut(authentication)
    .then(() => {
      // Sign-out successful.
      toast.success("Successfully signed out");
    })
    .catch((error) => {
      // An error happened.
      toast.error(error.message);
    });
};

export const ChangePassword = (currentPassword, newPassword) => {
  const user = authentication.currentUser;

  const credentials = EmailAuthProvider.credential(user.email, currentPassword);

  reauthenticateWithCredential(user, credentials)
    .then(() => {
      // User re-authenticated successfully.
      updatePassword(user, newPassword)
        .then(() => {
          toast.success("Password changed successfully");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    })
    .catch((error) => {
      toast.error(
        "Failed to re-authenticate. Please check your current password."
      );
    });
};

export const DeleteUser = () => {
  const user = authentication.currentUser;

  deleteUser(user)
    .then(() => {
      // User deleted.
      toast.success("Account deleted successfully");
    })
    .catch((error) => {
      toast.error(error.message);
    });
};
