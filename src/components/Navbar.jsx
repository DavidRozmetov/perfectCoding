import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import { Logo } from "./Logo";
import { SignOut } from "../firebase/Auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { readData } from "../firebase/FireStore";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState();
  const [role, setRole] = useState("guest");
  const [course, setCourse] = useState("");
  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const auth = getAuth();
  const routeBasedOnRole = {
    student: "/student-board",
    admin: "/dashboard",
    guest: "/",
  };

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(auth.currentUser);
      const uid = auth?.currentUser?.uid;

      if (uid !== undefined) {
        readData("users", uid).then((res) => {
          setRole(res.role);
          setCourse(res.course);
        });
      } else {
        setRole("");
        setCourse("");
      }
    });
  }, []);

  return (
    <nav className="navbar">
      <Logo link={routeBasedOnRole[role]} />

      {/* Navbar elements */}
      <div className={`navbar-items ${menuOpen ? "open" : ""}`}>
        {!user && (
          <>
            <Link to="/games">Games</Link>

            <Link to="/students">Students</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {role === "admin" && (
          <>
            <Link to="/dashboard/students">Students</Link>
            <Link to="/dashboard/add_student">Add Student</Link>
            <Link to="/dashboard/courses">Courses</Link>
          </>
        )}
        {role === "student" && (
          <>
            {" "}
            <Link to="/free_robux">Redeem Stars</Link>
            <Link to="https://scratch.mit.edu" target="_blank">
              Scratch
            </Link>{" "}
            <Link to="/Submit">Submit game</Link>
          </>
        )}

        {user && (
          <button
            onClick={() => {
              SignOut();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
