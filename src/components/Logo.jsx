import { Link } from "react-router-dom";
import logoPng from "../assets/img/logo.png";
export const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img className="logo-image" src={logoPng} alt="logo" />
      </Link>
    </div>
  );
};
