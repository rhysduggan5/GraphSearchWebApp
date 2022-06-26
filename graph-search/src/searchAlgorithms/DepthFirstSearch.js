import * as Constants from '../Constants'
import {sleep, GetGraphNeighbours} from '../Utils'

export const DepthFirstSearch = async (array, start, updateFunction, resetFunction) => {

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

      //See BreadthFirstSearch file
      if (lookingAt === undefined) {
        break;
      }

      lookingAtTile = lookingAt[lookingAt.length - 1]
    }
    
    //See BreadthFirstSearch file
    if (lookingAt === undefined) {
      break;
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
  } else {
    updateFunction(array);
  }

  resetFunction();
}