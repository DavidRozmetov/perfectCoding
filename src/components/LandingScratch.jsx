import React from "react";
import "../css/LandingScratch.css"; // Import your CSS file for styling
import WalkingCat from "../assets/walking-cat.gif";
import GameCard from "./GameCard";

import Drift from "../assets/img/game-thumbnails/Drift.png";
import Dodge from "../assets/img/game-thumbnails/Dodge.png";
import FlappyBird from "../assets/img/game-thumbnails/FlappyBird.png";
import Mario from "../assets/img/game-thumbnails/Mario.png";
import Name from "../assets/img/game-thumbnails/Name.png";

export const LandingScratch = () => {
  return (
    <div className="landing-scratch-container">
      <div className="left-grid-scratch">
        <h2>
          Discover potential games with
          <span style={{ color: "#F6AB3C" }}> Scratch</span>
        </h2>
        <p className="text-heading">
          Scratch is the world’s largest coding community for children and a
          coding language with a simple visual interface that allows young
          people to create digital stories, games, and animations.
        </p>
      </div>

      <div className="right-grid-scratch">
        <img
          src={WalkingCat}
          alt="Scratch Cat Walking Gif"
          className="walking-cat-gif"
        />
        <div className="landing-games-container">
          <GameCard
            CardTitle="Drift Chase"
            ImageSource={Drift}
            GameId={809816554}
          />
          <GameCard CardTitle="Dodge" ImageSource={Dodge} GameId={894103672} />
          <GameCard
            CardTitle="Flappy Bird"
            ImageSource={FlappyBird}
            GameId={17828009}
          />
          <GameCard
            CardTitle="Super Mario"
            ImageSource={Mario}
            GameId={2176968}
          />
          <GameCard
            CardTitle="Write your name"
            ImageSource={Name}
            GameId={895986036}
          />
        </div>
      </div>
    </div>
  );
};
