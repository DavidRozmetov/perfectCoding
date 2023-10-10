import React from "react";
import { Link } from "react-router-dom";

const GameCard = ({ CardTitle, ImageSource, GameId, title }) => {
  return (
    <div className="game-card-container">
      <Link to={`../games/${GameId}${title ? "?title=" + title : ""}`}>
        <div
          className="game-card-image"
          style={{
            background: `url(${ImageSource})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.10)",
          }}
        ></div>
        <div className="game-card-title">
          <p style={{}}>{CardTitle}</p>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
