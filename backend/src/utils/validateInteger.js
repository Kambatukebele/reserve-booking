export function isValidInteger(value) {
  // Parse the string to a number, then check if it is an integer
  const number = Number(value);
  return Number.isInteger(number) && number > 0;
}
