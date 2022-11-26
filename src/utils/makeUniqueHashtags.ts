export const makeUniqueHashtags = (hashtags: string[]) => {
  return Array.from(new Set(hashtags));
};
