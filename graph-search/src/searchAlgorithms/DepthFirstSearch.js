import * as Constants from '../Constants'
import {sleep, getGraphNeighbours} from '../Utils'

export const depthFirstSearch = async (array, start, updateFunction, resetFunction) => {

  let path = [array[start[0]][start[1]]];

  let queue = [];
  let closedList = [];

  let found = false;

  for (let i = 0; i < array.length; i++) {
    closedList.push([])
  }

  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[0].length; y++) {
      closedList[x].push(0)
    }
  }

  let neighbours = getGraphNeighbours(array, path);

  for (let i = 0; i < neighbours.length; i++) {
    let neighbour = neighbours[i]

    if (neighbour === undefined) continue;
    if (neighbour.state === "wall" || neighbour.extra === "searched") continue;

    let tempPath = path.slice()

    tempPath.push(neighbour)

    queue.push(tempPath);
    array[neighbour.xPos][neighbour.yPos].extra = "inQueue";

  }

  let lookingAt = queue.pop();

  let lookingAtTile = lookingAt[lookingAt.length - 1]

  array[lookingAtTile.xPos][lookingAtTile.yPos].extra = "lookingAt";

  let tile = path.pop()

  closedList[tile.xPos][tile.yPos] = 1;

  updateFunction(array);

  await sleep(15);

  while (queue.length !== 0 || lookingAt !== undefined) {
    path = lookingAt;

    neighbours = getGraphNeighbours(array, path);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i]

      if (neighbour === undefined) continue;
      if (neighbour.state === "wall" || neighbour.extra === "searched") continue;
      if (closedList[neighbour.xPos][neighbour.yPos] === 1) continue;

      let tempPath = path.slice()
      tempPath.push(neighbour)
      queue.push(tempPath);

      if (neighbour.state !== "goal") {
        array[neighbour.xPos][neighbour.yPos].extra = "inQueue";
      }
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].extra = "searched";

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

    array[lookingAtTile.xPos][lookingAtTile.yPos].extra = "lookingAt";

    updateFunction(array);

    await sleep(15);
  }

  if (found) {
    array[tile.xPos][tile.yPos].extra = "searched";

    for (let x = 0; x < Constants.ROWS; x++) {
      for (let y = 0; y < Constants.COLUMNS; y++) {
        if (array[x][y].extra === "lookingAt") {
          array[x][y].extra = "searched"
        }
      }
    }

    updateFunction(array);

    await sleep(15);

    for (let i = lookingAt.length - 1; i >= 0; i--) {
      let pathTile = lookingAt[i]

      if (pathTile.extra === "searched") {
        array[pathTile.xPos][pathTile.yPos].extra = "path"

        updateFunction(array)

        await sleep(20);
      }
    }
  } else {
    updateFunction(array);
  }

  resetFunction();
}