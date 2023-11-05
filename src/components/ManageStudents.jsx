import { useEffect, useState } from "react";
import { deleteData, readFilteredCollection } from "../firebase/FireStore";

import { DecodePassword } from "../functions/DecodePassword";
import "../css/ManageStudents.css";
import { BiSolidEditAlt } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
export const ManageStudents = () => {
  const [stList, setStList] = useState([]);

  useEffect(() => {
    readFilteredCollection("users", "role", "student").then((res) => {
      setStList(res);
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h2>Manage Students</h2>
        {stList.length === 0 && (
          <span className="no-students">No students so far </span>
        )}
        <ol className="students-container">
          <div className="student-container table-head">
            <strong>Name</strong>
            <strong>Scratch UserName</strong>
            <strong>Stars</strong>
            <strong>Password</strong>
          </div>
          {stList.map((st) => {
            return (
              <li key={st.data.uid} className="student-container">
                {" "}
                <strong>{st.data.name}</strong>
                <>{st.data.scratchUserName}</> <center>{st.data.stars}</center>{" "}
                <DecodePassword key={st.data.uid} password={st.data.password} />
                <div className="options">
                  <Link to={"/dashboard/edit_student/" + st.data.uid}>
                    <BiSolidEditAlt
                      className="edit-password-button"
                      title="edit password"
                    />{" "}
                  </Link>
                  <RxCross1
                    className="delete-button"
                    title="delete student"
                    onClick={() => {
                      deleteData("users", st.data.uid).then((res) => {
                        if (res.status === 200) {
                          toast.success("Student deleted successfully");
                        } else {
                          toast.error(res.message);
                        }
                      });
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
