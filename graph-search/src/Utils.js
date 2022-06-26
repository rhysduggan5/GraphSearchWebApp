export const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const euclideanDistance = (tile, goal) => {
  let xPos = tile.xPos;
  let yPos = tile.yPos;

  return Math.floor(Math.sqrt(Math.pow(xPos - goal[0], 2) + Math.pow(yPos - goal[1], 2)))
}

export const pathWeight = (path) => {
  let weight = 0;

  for (let i = 0; i < path.length; i++) {
    weight += path[i].weight
  }

  return weight;
} 

export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const GetGraphNeighbours = (array, path) => {
  let tile = path[path.length - 1]

  const xPos = tile.xPos;
  const yPos = tile.yPos;

  var neighbours = [];

  try {
    neighbours.push(array[xPos - 1][yPos])
  } catch (Exception) { }

  try {
    neighbours.push(array[xPos + 1][yPos])
  } catch (Exception) { }

  try {
    neighbours.push(array[xPos][yPos - 1])
  } catch (Exception) { }

  try {
    neighbours.push(array[xPos][yPos + 1])
  } catch (Exception) { }

  return shuffle(neighbours)
}