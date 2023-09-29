import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Games } from "./components/Games";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { FreeRobux } from "./components/FreeRobux";
import { SubmitGame } from "./css/SubmitGame";
import { Game } from "./components/Game";
import { Footer } from "./components/Footer";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
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
