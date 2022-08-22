const getRandomPoster = (item: any) => {
  const random = Math.floor(Math.random() * item.length);
  return item[random];
};
export default getRandomPoster;
