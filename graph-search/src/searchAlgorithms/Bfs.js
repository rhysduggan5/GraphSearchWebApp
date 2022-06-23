import * as Constants from '../Constants'

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}


const BfsSearch = async (array, start, goal, updateFunction) => {

  var tile = array[start[0]][start[1]];
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

  var neighbours = GetNeighbours(array, tile);

  for (let i = 0; i < neighbours.length; i++) {
    if (neighbours[i].state === "wall") continue;
    queue.push(neighbours[i]);
    array[neighbours[i].xPos][neighbours[i].yPos].state = "inQueue";
  }

  var lookingAt = queue.shift();

  array[lookingAt.xPos][lookingAt.yPos].state = "lookingAt";

  closedList[tile.xPos][tile.yPos] = 1;

  updateFunction(array);

  await sleep(10);

  while (queue.length !== 0 || lookingAt !== undefined) {
    tile = lookingAt;

    neighbours = GetNeighbours(array, tile);

    console.log(neighbours);
    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i]

      if (neighbour === undefined) continue;
      if (neighbour.state === "wall" || neighbour.state === "searched") continue;
      if (closedList[neighbour.xPos][neighbour.yPos] === 1) continue;

      queue.push(neighbour);
      
      if (neighbour.state !== "goal") {
        array[neighbour.xPos][neighbour.yPos].state = "inQueue";
      }      
    }

    array[tile.xPos][tile.yPos].state = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAt.xPos][lookingAt.yPos] === 1) {
      lookingAt = queue.shift();
    }

    if (lookingAt.state === "goal") {
      found = true;
      break;
    }
    
    array[lookingAt.xPos][lookingAt.yPos].state = "lookingAt";

    updateFunction(array);

    await sleep(10);
  }

  if (found) {
    array[tile.xPos][tile.yPos].state = "searched";

    console.log("Goal found");

    for (let x = 0; x < Constants.ROWS; x++) {
      for (let y = 0; y < Constants.COLUMNS; y++) {
        if (array[x][y].state === "lookingAt") {
          array[x][y].state = "searched"
        }
      }
    }

    updateFunction(array);

    await sleep(10);
  }
  
}

function GetNeighbours(array, tile) {
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

  return neighbours
}


export default BfsSearch