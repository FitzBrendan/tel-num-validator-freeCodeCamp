// solution 1, Regex list of valid number strings
function telephoneCheck(str) {
  const regexSpaces = /^(1\s?)?\d{3}\s\d{3}\s\d{4}$/;
  const regexDashes = /^(1\s?)?\d{3}-\d{3}-\d{4}$/;
  const regexParenths = /^(1\s?)?\(\d{3}\)[\s-]?\d{3}[\s-]?\d{4}$/;
  const regexNumbers = /^1?\d{10}$/;

  const regexes = [regexSpaces, regexDashes, regexParenths, regexNumbers];

  for (let regex of regexes) {
    if (regex.test(str)) {
      return true;
    }
  }

  return false;
}
// end of solution 1

// solution 2, One Regex with Quantifiers ? for all valid number strings
function telephoneCheck2(str) {
  return /^(1\s?)?(\d{3}|\(\d{3}\))[-\s]?\d{3}[-\s]?\d{4}$/.test(str);
}
// end of solution 2

// solution 3, Elimination of invalid Strings
function telephoneCheck3(str) {
  // min 10 numbers, max 11 numbers, max 16 chars with spaces, - and ( )
  if (str.length < 10 || str.match(/\d/g).length > 11 || str.length > 16) {
    return false;
  }
  // if str has 11 numbers, first number must be country code 1
  // number 1, must be followed by space, number or (
  if (str.match(/\d/g).length === 11) {
    if (str.match(/^./) != 1) {
      return false;
    } else if (
      !/^(\d\s)/.test(str) &&
      !/^(\d\d)/.test(str) &&
      !/^(\d\()/.test(str)
    ) {
      return false;
    }
  }
  // str can only be numbers, spaces, - or ( )
  if (!/^[\d\s-()]*$/.test(str)) {
    return false;
  }
  // if str has (), must enclose 3 numbers and max of one each in str
  if (str.includes("(") || str.includes(")")) {
    if (!/\(\d{3}\)/.test(str)) {
      return false;
    } else if (str.match(/\(/g).length > 1 || str.match(/\)/g).length > 1) {
      return false;
    }
  }
  // if str has -, str must end with four numbers following a -
  if (str.includes("-")) {
    if (!/-\d{4}$/.test(str)) {
      return false;
    }
  }

  return true;
}
// end of solution 3
