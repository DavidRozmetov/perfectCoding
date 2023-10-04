import "../css/FloatingNavbar.css";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IoGameController } from "react-icons/io5";
import { SiRoblox } from "react-icons/si";
import { BiLogoTelegram } from "react-icons/bi";
import { useState } from "react";

export const FloatingNavbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };
  return (
    <div className="navbar-container">
      {toggleMenu && (
        <div
          className="navbar-background"
          onClick={() => setToggleMenu(false)}
        ></div>
      )}
      <div
        className={` navbar-button navbar-toggle-button ${
          toggleMenu ? "btn-red" : "btn-blue"
        }`}
        onClick={handleToggleMenu}
      >
        {toggleMenu ? (
          <AiOutlineClose className="btn-close" />
        ) : (
          <FaHamburger />
        )}
      </div>
      {toggleMenu && (
        <div className="navbar-menu-container">
          <a href="/games" className="navbar-button">
            <IoGameController />
          </a>
          <a href="/free_robux" className="navbar-button">
            <SiRoblox />
          </a>
          <a href="https://t.me/davranbekr" className="navbar-button">
            <BiLogoTelegram />
          </a>
        </div>
      )}
    </div>
  );
};
