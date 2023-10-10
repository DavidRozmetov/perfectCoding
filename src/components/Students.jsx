import "../css/Students.css";
import "../css/Games.css";

import Panhavath from "../assets/img/game-thumbnails/panhavath.png";
import Priscilla from "../assets/img/game-thumbnails/Priscilla.png";
import Andrew from "../assets/img/game-thumbnails/Andrew.png";
import Kirk from "../assets/img/game-thumbnails/Kirk.png";
import Puthisak from "../assets/img/game-thumbnails/Puthisak.png";
import GameCard from "./GameCard";
export const Students = () => {
  return (
    <div className="students-container">
      <h2>Look at some of our students' latest works</h2>
      <div className="game-cards-container">
        <GameCard
          CardTitle="Panhavath"
          ImageSource={Panhavath}
          GameId={900976321}
        />
        <GameCard
          CardTitle="Priscilla"
          ImageSource={Priscilla}
          GameId={900976968}
        />
        <GameCard CardTitle="Andrew" ImageSource={Andrew} GameId={904479574} />
        <GameCard CardTitle="Kirk" ImageSource={Kirk} GameId={904473652} />
        <GameCard
          CardTitle="Puthisak"
          ImageSource={Puthisak}
          GameId={904480026}
        />
      </div>
    </div>
  );
};
