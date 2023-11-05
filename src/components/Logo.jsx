import { Link } from "react-router-dom";
import logoPng from "../assets/img/logo.png";
export const Logo = (prompts) => {
  const link = prompts.link;
  return (
    <div className="logo">
      <Link to={link}>
        <img className="logo-image" src={logoPng} alt="logo" />
      </Link>
    </div>
  );
};
