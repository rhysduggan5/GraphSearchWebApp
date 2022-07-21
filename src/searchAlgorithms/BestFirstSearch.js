import {euclideanDistance, sleep, getGraphNeighbours} from '../Utils'

const FastPriorityQueue = require('fastpriorityqueue');

export const bestFirstSearch = async (array, start, goal, animate, updateFunction, resetFunction) => {
  let path = [array[start[0]][start[1]]];

  const queue = new FastPriorityQueue(function(a, b) {
    return a[1] < b[1];
  });

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

    const distance = euclideanDistance(neighbour, goal)

    tempPath.push(neighbour)

    queue.add([tempPath, distance]);

    if (neighbour.xPos === goal[0] && neighbour.yPos === goal[1]) continue;

    array[neighbour.xPos][neighbour.yPos].extra = "inQueue";
  }

  if (queue.peek() === undefined) {
    updateFunction(array);
    resetFunction();
    return;
  }

  let lookingAt = queue.poll()[0];

  let lookingAtTile = lookingAt[lookingAt.length - 1]

  if (lookingAtTile.xPos === goal[0] && lookingAtTile.yPos === goal[1]) {
    found = true;
    updateFunction(array);
    resetFunction();
    return;
  }

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
      const distance = euclideanDistance(neighbours[i], goal)

      tempPath.push(neighbour)
      queue.add([tempPath, distance]);

      if (neighbour.xPos === goal[0] && neighbour.yPos === goal[1]) continue;

      array[neighbour.xPos][neighbour.yPos].extra = "inQueue";
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].extra = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      //Since we use arrays, we get a different error than the other files
      if (queue.peek() === undefined) {
        break;
      }

      lookingAt = queue.poll()[0];

      lookingAtTile = lookingAt[lookingAt.length - 1]
    }

    //Since we use arrays, we get a different error than the other files
    if (queue.peek() === undefined && closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      break;
    }

    if (lookingAtTile.xPos === goal[0] && lookingAtTile.yPos === goal[1]) {
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

    for (let x = 0; x < array.length; x++) {
      for (let y = 0; y < array[0].length; y++) {
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
