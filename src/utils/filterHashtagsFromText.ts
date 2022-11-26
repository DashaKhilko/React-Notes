export const filterHashtagsFromText = (text: string) => {
  return text.split(/\s/).filter((word) => word[0] === '#');
};
