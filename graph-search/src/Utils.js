/**
 * Shuffles an array randomly. This doesn't use any more space than
 * the inital array
 * @param {array} array The array to be shuffled
 * @returns the shuffled array
 */
export const shuffle = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    //Select a random element in the array
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //Swap the values around
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * Calculates the euclidean distance (as the crow flies) between two tiles
 * on the graph, and returns the rounded down integer of the result
 * @param {any} tile The current tile
 * @param {any} goal The goal coordinates
 * @returns The euclidean distance
 */
export const euclideanDistance = (tile, goal) => {
  const xPos = tile.xPos;
  const yPos = tile.yPos;

  //Uses the equation c = sqrt(a^2 + b^2)
  return Math.floor(Math.sqrt(Math.pow(xPos - goal[0], 2) + Math.pow(yPos - goal[1], 2)))
}

/**
 * Sums the weight of a given path which equals the individual weight of
 * every tile in the path
 * @param {array} path The path to sum
 * @returns The weight of the path
 */
export const pathWeight = (path) => {
  let weight = 0;

  for (let i = 0; i < path.length; i++) {
    weight += path[i].weight
  }

  return weight;
} 

/**
 * Sleep function - sleeps for a given number of milliseconds. Usually 
 * just used for animations
 * @param {*} milliseconds The time to sleep for
 * @returns An empty promise.
 */
export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

/**
 * Gets the neighbours in a graph for a given tile in the graph.
 * Diagonals are ignored.
 * @param {array} array The graph
 * @param {any} path The given tile
 * @returns 
 */
export const getGraphNeighbours = (array, path) => {
  let tile = path[path.length - 1]

  const xPos = tile.xPos;
  const yPos = tile.yPos;

  let neighbours = [];

  //Try getting a neighbour in every direction. If it is out of bounds
  //then catch the error and ignore it
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

  //Shuffle the neighbours so the order isn't consistent every time.
  //Only useful for visuals
  return shuffle(neighbours)
}