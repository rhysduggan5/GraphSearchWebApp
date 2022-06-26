import * as Constants from '../Constants'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const DepthFirstSearch = async (array, start, goal, updateFunction, resetFunction) => {

  var path = [array[start[0]][start[1]]];

  var queue = [];
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
    let neighbour = neighbours[i]

    if (neighbour === undefined) continue;
    if (neighbour.state === "wall" || neighbour.state === "searched") continue;

    let tempPath = path.slice()

    tempPath.push(neighbour)

    queue.push(tempPath);
    array[neighbour.xPos][neighbour.yPos].state = "inQueue";

  }

  var lookingAt = queue.pop();

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
      tempPath.push(neighbour)
      queue.push(tempPath);

      if (neighbour.state !== "goal") {
        array[neighbour.xPos][neighbour.yPos].state = "inQueue";
      }
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].state = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      lookingAt = queue.pop();
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
