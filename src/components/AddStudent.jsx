import { useState } from "react";
import { PasswordContainer } from "./PasswordContainer";
import { ToastContainer, toast } from "react-toastify";
import { GeneratePassword } from "../functions/GeneratePassword";
import { GenerateEmail } from "../functions/GenerateEmail";
import { CreateUser } from "../firebase/Auth";
import { FbAdd } from "../firebase/FireStore";
import "../css/ManageStudents.css";
export const AddStudent = () => {
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
  const [scratchUserName, setScratchUserName] = useState("");
  const [scratchPassword, setScratchPassword] = useState("");
  return (
    <div className="dashboard-container ">
      <div className="add-student-container dashboard-content">
        <ToastContainer></ToastContainer>
        <h2>Add Student</h2>
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
              <option value="scratch-jr">Scratch Juniour</option>
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
                const userEmail = GenerateEmail(userName);
                const userPassword = GeneratePassword(password);

                CreateUser(userEmail, userPassword).then((res) => {
                  if (res.status === 200) {
                    const uid = res.message;

                    FbAdd("users", uid, {
                      name: userName,
                      role: "student",
                      course: course,
                      uid: uid,
                      password: userPassword,
                      stars: 0,
                      scratchUserName: scratchUserName,
                      scratchPassword: scratchPassword,
                    });
                    toast.success("account created successfully");
                  } else {
                    toast.error(res.message);
                  }
                });
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
