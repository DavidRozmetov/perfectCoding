import "../css/Game.css";
import { useParams } from "react-router-dom";

export const Game = () => {
  const { gameId } = useParams();
  return (
    <div className="game-container">
      <iframe
        className="game-box"
        src={`https://scratch.mit.edu/projects/${gameId}/embed`}
        allowtransparency="true"
        // width="660"
        // height="536"
        frameborder="0"
        scrolling="no"
        allowfullscreen
      ></iframe>
    </div>
  );
};
