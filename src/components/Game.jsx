import "../css/Game.css";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
export const Game = () => {
  const { gameId } = useParams();
  return (
    <div className="game-container">
      <Link
        to={`https://scratch.mit.edu/projects/${gameId}`}
        target="_blank"
        className="button-scratch"
      >
        <button>See inside</button>
      </Link>
      <iframe
        className="game-box"
        src={`https://scratch.mit.edu/projects/${gameId}/embed`}
      ></iframe>
    </div>
  );
};
