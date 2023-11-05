export const GeneratePassword = (array) => {
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
  let password = "";
  for (let a = 0; a < array.length; a++) {
    const currentBoolean = array[a];

    if (currentBoolean === true) {
      password = password + passwordBlocks[a];
    }
  }
  return password;
};
