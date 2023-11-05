export const DecodePasswordIntoArray = (password) => {
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

  const newPasswordIndex = decodePassword(password);
  let newArray = [];

  for (let i = 0; i < 18; i++) {
    newArray.push(newPasswordIndex.includes(i));
  }

  return newArray;
};
