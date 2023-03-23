/*
Capitalize the first letter of a string
*/

export const capitalizeFirstLetter = (s) => {
  s = s.trim();
  return s.trim().charAt(0).toUpperCase() + s.slice(1);
};
