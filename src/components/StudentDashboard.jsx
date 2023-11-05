import { authentication } from "../firebase/Auth";
import {
  readCollection,
  readData,
  readFilteredCollection,
} from "../firebase/FireStore";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import "../css/StudentDashBoard.css";
import { ToastContainer, toast } from "react-toastify";
import GameCard from "./GameCard";
import WalkingCat from "../assets/walking-cat.gif";
export const StudentDashBoard = () => {
  const [userData, setUserData] = useState({});
  const [stars, setStars] = useState(0);
  const [games, setGames] = useState([]);
  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        readData("users", user.uid).then((res) => {
          setUserData(res);
          if (res.stars) {
            setStars(res.stars);
          }
        });
        readFilteredCollection("games", "author", user.uid).then((res) => {
          setGames(res);
        });
      } else {
      }
    });
  }, []);

  return (
    <div className="student-dashboard-container">
      <ToastContainer></ToastContainer>
      <div className="grid">
        <div className="header">
          <h2>Hello, {userData.name ? userData.name : "Guest"}</h2>
          <h1>You Have {stars} stars</h1>
          <sub>Gain {50 - stars} more stars to get 50 robux</sub>
        </div>

        <div className="scratch-account-container">
          <strong>UserName: </strong>
          <strong
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigator.clipboard.writeText(userData.scratchUserName);
              toast.success("Username copied", {
                autoClose: 500,
              });
            }}
          >
            {userData.scratchUserName}{" "}
          </strong>
          <strong>Password: </strong>
          <strong
            style={{
              cursor: "pointer",
            }}
            onClick={() => {
              navigator.clipboard.writeText(userData.scratchPassword);
              toast.success("Password copied", {
                autoClose: 500,
              });
            }}
          >
            {userData.scratchPassword}
          </strong>
        </div>
      </div>

      <hr />
      <div className="games-container">
        <h3>Your games</h3>
        <div className="game-cards-container">
          {games.length === 0 && <span>No games added yet</span>}
          {games.map((game) => {
            return (
              <h1 key={game.data.gameId}>
                <GameCard
                  CardTitle={game.data.gameName}
                  ImageSource={WalkingCat}
                  GameId={game.data.gameId}
                  title={userData?.Name}
                ></GameCard>
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
};
