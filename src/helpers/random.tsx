const getRandomPoster = (item: any) => {
  if (!item) return;
  const random = Math.floor(Math.random() * item.length);
  return item[random]?.backdrop_path || item[random]?.profile_path;
};
export default getRandomPoster;
