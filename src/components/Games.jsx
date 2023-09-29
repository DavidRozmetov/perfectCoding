import { Link } from "react-router-dom";
import GameCard from "./GameCard";

import Drift from "../assets/img/game-thumbnails/Drift.png";
import Dodge from "../assets/img/game-thumbnails/Dodge.png";
import FlappyBird from "../assets/img/game-thumbnails/FlappyBird.png";
import Mario from "../assets/img/game-thumbnails/Mario.png";
import Name from "../assets/img/game-thumbnails/Name.png";
import PenFootball from "../assets/img/game-thumbnails/PenFootball.png";
import Piano from "../assets/img/game-thumbnails/Piano.png";
import Pong from "../assets/img/game-thumbnails/Pong.png";
import PongBall from "../assets/img/game-thumbnails/PongBall.png";
import "../css/Games.css";
export const Games = () => {
  return (
    <div className="games-container">
      <div className="buttons-container">
        <Link to="https://scratch.mit.edu/projects/editor/ " target="_blank">
          <button>Go to Scratch</button>
        </Link>
        <Link to="../submit">
          <button>Submit Scratch game</button>
        </Link>
      </div>
      <div className="game-cards-container">
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
        <GameCard
          CardTitle="Pen Football [popular]"
          ImageSource={PenFootball}
          GameId={103746364}
        />
        <GameCard CardTitle="Piano" ImageSource={Piano} GameId={10012676} />
        <GameCard CardTitle="Pong" ImageSource={Pong} GameId={244698177} />
        <GameCard
          CardTitle="PangBall"
          ImageSource={PongBall}
          GameId={896460747}
        />
      </div>
    </div>
  );
};
