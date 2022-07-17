import * as Constants from '../Constants'
import {euclideanDistance, pathWeight, sleep, getGraphNeighbours} from '../Utils'

const FastPriorityQueue = require('fastpriorityqueue');

export const aStarSearch = async (array, start, goal, animate, updateFunction, resetFunction) => {

  let path = [array[start[0]][start[1]]];

  let queue = new FastPriorityQueue(function(a, b) {
    return a[1] < b[1];
  });

  const closedList = [];

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

    const heuristic = euclideanDistance(neighbour, goal)

    tempPath.push(neighbour)

    const weight = pathWeight(tempPath);

    queue.add([tempPath, heuristic + weight]);
    array[neighbour.xPos][neighbour.yPos].extra = "inQueue";

  }

  let lookingAt = queue.poll()[0];

  let lookingAtTile = lookingAt[lookingAt.length - 1]

  array[lookingAtTile.xPos][lookingAtTile.yPos].extra = "lookingAt";

  let tile = path.pop()

  closedList[tile.xPos][tile.yPos] = 1;

  updateFunction(array);

  if (animate) {
    await sleep(15);
  }

  while (queue.length !== 0 || lookingAt !== undefined) {
    path = lookingAt;

    neighbours = getGraphNeighbours(array, path);

    for (let i = 0; i < neighbours.length; i++) {
      let neighbour = neighbours[i]

      if (neighbour === undefined) continue;
      if (neighbour.state === "wall" || neighbour.extra === "searched") continue;
      if (closedList[neighbour.xPos][neighbour.yPos] === 1) continue;

      let tempPath = path.slice()
      const heuristic = euclideanDistance(neighbours[i], goal)

      tempPath.push(neighbour)

      const weight = pathWeight(tempPath);

      queue.add([tempPath, heuristic + weight]);

      if (neighbour.state !== "goal") {
        array[neighbour.xPos][neighbour.yPos].extra = "inQueue";
      }
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].extra = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      //See BestFirstSearch.js
      if (queue.peek() === undefined) {
        break;
      }

      lookingAt = queue.poll()[0];
      lookingAtTile = lookingAt[lookingAt.length - 1]
    }

    //See BestFirstSearch.js
    if (queue.peek() === undefined) {
      break;
    }

    if (lookingAtTile.state === "goal") {
      found = true;
      break;
    }

    array[lookingAtTile.xPos][lookingAtTile.yPos].extra = "lookingAt";

    updateFunction(array);

    if (animate) {
      await sleep(15);
    }
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

    if (animate) {
      await sleep(15);
    }

    for (let i = lookingAt.length - 1; i >= 0; i--) {
      let pathTile = lookingAt[i]

      if (pathTile.extra === "searched") {
        array[pathTile.xPos][pathTile.yPos].extra = "path"

        updateFunction(array)

        if (animate) {
          await sleep(20);
        }
      }
    }
  } else {
    updateFunction(array);
  }

  resetFunction();
}