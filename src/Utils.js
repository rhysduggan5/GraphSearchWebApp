import {useReducer} from 'react'

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

/**
 * Generates an initial setup of a grid, including a random start
 * and goal tile.
 * @returns An array, a, such that:
 *            a[0] - the array of cells
 *            a[1] - the array of start coordinates
 *            a[2] - the array of goal coordinates
 */
export const generateCells = (xSize, ySize) => {
  const cols = []

  //Randomly generate a start and goal location (a pair of integers)
  const startX = Math.floor(Math.random() * (ySize))
  const startY = Math.floor(Math.random() * (xSize))
  const goalX = Math.floor(Math.random() * (ySize))
  const goalY = Math.floor(Math.random() * (xSize))

  //Set up the array
  for (let x = 0; x < ySize; x++) {
    cols.push([])
  }

  //Set every cell to be blank initially
  for (let x = 0; x < ySize; x++) {
    for (let y = 0; y < xSize; y++) {
      cols[x].push({
        xPos: x,
        yPos: y,
        weight: 1,
        extra: "",
        state: "blank"
      })
    }
  }

  //Update the start and goal cells
  cols[startX][startY].state = "start"
  cols[goalX][goalY].state = "goal"

  //Return all three bits of information in an array
  return [cols, [startX, startY], [goalX, goalY]]
}

/**
 * Util function to force a rerender of the screen. Needed
 * since hooks are asynchronous and will batch update - so
 * necessary for the animations of graph searching
 */
export const useForceRender = () => {
  const [, forceRender] = useReducer(x => !x, true)
  return forceRender
}

export const getWalls = (array, cell) => {

  const neighbours = getGraphNeighbours(array, [cell]);

  const walls = []

  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i] !== undefined && neighbours[i].state === "wall") {
      walls.push(neighbours[i]);
    }
  }

  return walls;
} 