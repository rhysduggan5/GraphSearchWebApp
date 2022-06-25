import * as Constants from '../Constants'

var FastPriorityQueue = require('fastpriorityqueue');

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const BestFirstSearch = async (array, start, goal, updateFunction, resetFunction) => {

  var path = [array[start[0]][start[1]]];

  const queue = new FastPriorityQueue(function(a, b) {
    return a[1] < b[1];
  });

  var closedList = [];

  var found = false;

  for (let i = 0; i < Constants.ROWS; i++) {
    closedList.push([])
  }

  for (let x = 0; x < Constants.ROWS; x++) {
    for (let y = 0; y < Constants.COLUMNS; y++) {
      closedList[x].push(0)
    }
  }

  var neighbours = GetGraphNeighbours(array, path);

  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i].state === "wall") continue;

    let tempPath = path.slice()

    const distance = euclideanDistance(neighbours[i], goal)

    console.log(distance)

    tempPath.push(neighbours[i])

    console.log([tempPath, distance])

    queue.add([tempPath, distance]);
    array[neighbours[i].xPos][neighbours[i].yPos].state = "inQueue";

  }

  var lookingAt = queue.poll()[0];

  var lookingAtTile = lookingAt[lookingAt.length - 1]

  array[lookingAtTile.xPos][lookingAtTile.yPos].state = "lookingAt";

  var tile = path.pop()

  closedList[tile.xPos][tile.yPos] = 1;

  updateFunction(array);

  await sleep(15);

  while (queue.length !== 0 || lookingAt !== undefined) {
    path = lookingAt;

    neighbours = GetGraphNeighbours(array, path);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i]

      if (neighbour === undefined) continue;
      if (neighbour.state === "wall" || neighbour.state === "searched") continue;
      if (closedList[neighbour.xPos][neighbour.yPos] === 1) continue;

      let tempPath = path.slice()
      const distance = euclideanDistance(neighbours[i], goal)

      tempPath.push(neighbour)
      queue.add([tempPath, distance]);

      if (neighbour.state !== "goal") {
        array[neighbour.xPos][neighbour.yPos].state = "inQueue";
      }
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].state = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      lookingAt = queue.poll()[0];
      lookingAtTile = lookingAt[lookingAt.length - 1]
    }

    if (lookingAtTile.state === "goal") {
      found = true;
      break;
    }

    array[lookingAtTile.xPos][lookingAtTile.yPos].state = "lookingAt";

    updateFunction(array);

    await sleep(15);
  }

  if (found) {
    array[tile.xPos][tile.yPos].state = "searched";

    for (let x = 0; x < Constants.ROWS; x++) {
      for (let y = 0; y < Constants.COLUMNS; y++) {
        if (array[x][y].state === "lookingAt") {
          array[x][y].state = "searched"
        }
      }
    }

    updateFunction(array);

    await sleep(15);

    for (let i = lookingAt.length - 1; i >= 0; i--) {
      let pathTile = lookingAt[i]

      if (pathTile.state === "searched") {
        array[pathTile.xPos][pathTile.yPos].state = "path"

        updateFunction(array)

        await sleep(20);
      }
    }
  }

  resetFunction();
}

function GetGraphNeighbours(array, path) {
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

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function euclideanDistance(tile, goal) {
    let xPos = tile.xPos;
    let yPos = tile.yPos;

    return Math.floor(Math.sqrt(Math.pow(xPos - goal[0], 2) + Math.pow(yPos - goal[1], 2)))
}