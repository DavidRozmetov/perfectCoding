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

export const DecodePassword = (props) => {
  const password = props.password;
  let passwordBlocks = [
    process.env.REACT_APP_PASS_KEY_ONE,
    process.env.REACT_APP_PASS_KEY_TWO,
    process.env.REACT_APP_PASS_KEY_THREE,
    process.env.REACT_APP_PASS_KEY_FOUR,
    process.env.REACT_APP_PASS_KEY_FIVE,
    process.env.REACT_APP_PASS_KEY_SIX,
    process.env.REACT_APP_PASS_KEY_SEVEN,
    process.env.REACT_APP_PASS_KEY_EIGHT,
    process.env.REACT_APP_PASS_KEY_NINE,
    process.env.REACT_APP_PASS_KEY_TEN,
    process.env.REACT_APP_PASS_KEY_ELEVEN,
    process.env.REACT_APP_PASS_KEY_TWELVE,
    process.env.REACT_APP_PASS_KEY_THIRTEEN,
    process.env.REACT_APP_PASS_KEY_FOURTEEN,
    process.env.REACT_APP_PASS_KEY_FIFTEEN,
    process.env.REACT_APP_PASS_KEY_SIXTEEN,
    process.env.REACT_APP_PASS_KEY_SEVENTEEN,
    process.env.REACT_APP_PASS_KEY_EIGHTEEN,
  ];
  const decodePassword = (p) => {
    let passwordArray = [];
    for (let i = 0; i < p?.length - 3; i = i + 4) {
      passwordArray.push(passwordBlocks.indexOf(p.substring(i, i + 4)));
    }
    return passwordArray;
  };
  return (
    <div className="show-passwords-container">
      {" "}
      {decodePassword(password).map((i) => {
        return (
          <div className="show-password-icon" key={i}>
            {i === 0 && <FaCat />}
            {i === 1 && <FaFish />}
            {i === 2 && <FaTrain />}
            {i === 3 && <FaPlane />}
            {i === 4 && <FaDog />}
            {i === 5 && <FaStar />}
            {i === 6 && <FaRocket />}
            {i === 7 && <FaSun />}
            {i === 8 && <FaMoon />}
            {i === 9 && <FaHeart />}
            {i === 10 && <FaTree />}
            {i === 11 && <FaSmile />}
            {i === 12 && <FaCloud />}
            {i === 13 && <FaLeaf />}
            {i === 14 && <FaMusic />}
            {i === 15 && <FaGlobe />}
            {i === 16 && <FaGem />}
            {i === 17 && <FaLock />}
          </div>
        );
      })}
    </div>
  );
};
