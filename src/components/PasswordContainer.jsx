import {
  FaCat,
  FaFish,
  FaTrain,
  FaPlane,
  FaDog,
  FaStar,
  FaRocket,
  FaSun,
  FaMoon,
  FaHeart,
  FaTree,
  FaSmile,
  FaCloud,
  FaLeaf,
  FaMusic,
  FaGlobe,
  FaGem,
  FaLock,
} from "react-icons/fa";
export const PasswordContainer = (props) => {
  const setPassword = props.setPassword;
  const password = props.password;

  const setNewPassword = (index) => {
    let newPassword = [];

    for (let i = 0; i < password.length; i++) {
      if (i === index) {
        newPassword.push(!password[i]);
      } else {
        newPassword.push(password[i]);
      }
    }
    setPassword(newPassword);
  };
  return (
    <div className="password-buttons-container">
      <FaCat
        className={`password-icon ${
          password[0] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(0)}
      />
      <FaFish
        className={`password-icon ${
          password[1] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(1)}
      />
      <FaTrain
        className={`password-icon ${
          password[2] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(2)}
      />
      <FaPlane
        className={`password-icon ${
          password[3] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(3)}
      />
      <FaDog
        className={`password-icon ${
          password[4] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(4)}
      />
      <FaStar
        className={`password-icon ${
          password[5] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(5)}
      />
      <FaRocket
        className={`password-icon ${
          password[6] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(6)}
      />
      <FaSun
        className={`password-icon ${
          password[7] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(7)}
      />
      <FaMoon
        className={`password-icon ${
          password[8] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(8)}
      />
      <FaHeart
        className={`password-icon ${
          password[9] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(9)}
      />
      <FaTree
        className={`password-icon ${
          password[10] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(10)}
      />
      <FaSmile
        className={`password-icon ${
          password[11] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(11)}
      />
      <FaCloud
        className={`password-icon ${
          password[12] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(12)}
      />
      <FaLeaf
        className={`password-icon ${
          password[13] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(13)}
      />
      <FaMusic
        className={`password-icon ${
          password[14] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(14)}
      />
      <FaGlobe
        className={`password-icon ${
          password[15] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(15)}
      />
      <FaGem
        className={`password-icon ${
          password[16] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(16)}
      />
      <FaLock
        className={`password-icon ${
          password[17] === true ? "password-icon-active" : ""
        }`}
        onClick={() => setNewPassword(17)}
      />
    </div>
  );
};
