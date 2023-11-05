import { useEffect, useState } from "react";
import { PasswordContainer } from "./PasswordContainer";
import { ToastContainer, toast } from "react-toastify";
import { GeneratePassword } from "../functions/GeneratePassword";
import "../css/Dashboard.css";
import { FbAdd, readData, updateData } from "../firebase/FireStore";

import { DecodePasswordIntoArray } from "../functions/DecodePasswordIntoArray";

export const EditStudent = () => {
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
  const [userName, setUserName] = useState("");
  const [course, setCourse] = useState("scratch");
  const [stars, setStars] = useState(0);
  const [scratchUserName, setScratchUserName] = useState("");
  const [scratchPassword, setScratchPassword] = useState("");
  const getLastItem = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);
  const uid = getLastItem(window.location.pathname);
  useEffect(() => {
    readData("users", uid).then((st) => {
      setUserName(st.name);
      setCourse(st.course);
      setStars(st.stars ? st.stars : 0);
      setPassword(DecodePasswordIntoArray(st.password));
      setScratchUserName(st.scratchUserName);
      setScratchPassword(st.scratchPassword);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="add-student-container dashboard-content">
        <ToastContainer></ToastContainer>
        <h2>Edit Student</h2>
        <div className="div-grid">
          <div className="div-form">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <br />
            <label htmlFor="course">Select course</label>
            <select
              name="course"
              id="course"
              value={course}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            >
              <option value="scratch">Scratch</option>
              <option value="scratch-js">Scratch Juniour</option>
              <option value="python">Python</option>
            </select>
            <br />
            <label
              htmlFor="scratch-user-name"
              className="scratch-username label"
            >
              Scratch Username
            </label>
            <input
              type="text"
              value={scratchUserName}
              onChange={(e) => {
                setScratchUserName(e.target.value);
              }}
            />
            <br />
            <label
              htmlFor="scratch-password"
              className="scratch-password label"
            >
              Scratch Password
            </label>
            <input
              type="password"
              value={scratchPassword}
              onChange={(e) => {
                setScratchPassword(e.target.value);
              }}
            />
          </div>

          <PasswordContainer password={password} setPassword={setPassword} />
          <button
            className="btn-create"
            onClick={() => {
              if (password.filter((p) => p === true) < 2) {
                toast.error("must be at least 2 characters");
              } else {
                const userPassword = GeneratePassword(password);

                updateData("users", uid, {
                  name: userName,
                  role: "student",
                  course: course,
                  uid: uid,
                  password: userPassword,
                  stars: stars,
                  scratchUserName: scratchUserName,
                  scratchPassword: scratchPassword,
                }).then((res) => {
                  if (res.status === 200) {
                    toast.success("Account edited successfully");
                    toast.warn(
                      "Changing the passowrd won't work properly! Contact David"
                    );
                  } else {
                    toast.error(res.message);
                  }
                });
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
