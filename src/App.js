import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Games } from "./components/Games";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { FreeRobux } from "./components/FreeRobux";
import { SubmitGame } from "./components/SubmitGame";
import { Game } from "./components/Game";
import { Footer } from "./components/Footer";
import { FloatingNavbar } from "./components/FloatingNavbar";
import { Students } from "./components/Students";
import { Login } from "./components/Login";
import { CodeEditor } from "./components/CodeEditor";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Dashboard } from "./components/Dashboard";
import { AddStudent } from "./components/AddStudent";
import { ManageStudents } from "./components/ManageStudents";
import { Python } from "./components/Python";
import { EditStudent } from "./components/EditStudent";

import { StudentDashBoard } from "./components/StudentDashboard";
import { authentication } from "./firebase/Auth";
function App() {
  const [user, setUser] = useState();
  const [uid, setUid] = useState();

  onAuthStateChanged(authentication, (u) => {
    if (u) {
      setUid(u.uid);
      setUser(u);

      // ...
    } else {
      // User is signed out
      // ...d
    }
  });

  return (
    <Router>
      <div>
        <Navbar />
        <FloatingNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/free_robux" element={<FreeRobux />} />
          <Route path="/submit" element={<SubmitGame />} />
          <Route path="/games/:gameId" element={<Game />} />
          <Route path="/students" element={<Students />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/add_student" element={<AddStudent />} />
          <Route path="/dashboard/edit_student/*" element={<EditStudent />} />
          <Route path="/dashboard/students" element={<ManageStudents />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/python" element={<Python />} />
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/student-board" element={<StudentDashBoard />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
