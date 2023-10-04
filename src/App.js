import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Games } from "./components/Games";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { FreeRobux } from "./components/FreeRobux";
import { SubmitGame } from "./components/SubmitGame";
import { Game } from "./components/Game";
import { Footer } from "./components/Footer";
import { FloatingNavbar } from "./components/FloatingNavbar";
function App() {
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
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
