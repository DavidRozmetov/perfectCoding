export const GenerateEmail = (userName) => {
  function filterEmailCharacters(input) {
    // Define a regex pattern to match allowed characters in the local part of an email address.
    const allowedCharactersRegex = /^[a-zA-Z0-9!#$%&'*+\-/=?^_`{|}~.]+$/;

    // Use the regex to filter out disallowed characters, including spaces.
    return input.replace(
      new RegExp(`[^${allowedCharactersRegex.source}]`, "g"),
      " "
    );
  }

  return (
    filterEmailCharacters(userName).replace(" ", "").toLowerCase() +
    "+admin@t-david.com"
  );
};
