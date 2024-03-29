import {sleep, getGraphNeighbours} from '../Utils'

export const breadthFirstSearch = async (array, start, goal, animate, updateFunction, resetFunction) => {

  let path = [array[start[0]][start[1]]];

  let queue = [];
  let closedList = [];

  let found = false;

  for (let i = 0; i < array.length; i++) {
    closedList.push([]);
  }

  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[0].length; y++) {
      closedList[x].push(0);
    }
  }

  var neighbours = getGraphNeighbours(array, path);

  for (let i = 0; i < neighbours.length; i++) {
    let neighbour = neighbours[i]

    if (neighbour === undefined) continue;
    if (neighbour.state === "wall" || neighbour.extra === "searched") continue;

    let tempPath = path.slice()

    tempPath.push(neighbour)

    queue.push(tempPath);

    if (neighbour.xPos === goal[0] && neighbour.yPos === goal[1]) continue;

    array[neighbour.xPos][neighbour.yPos].extra = "inQueue";
  }

  if (queue.length === 0) {
    updateFunction(array);
    resetFunction();
    return;
  }

  let lookingAt = queue.shift();

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
      tempPath.push(neighbour)
      queue.push(tempPath);

      if (neighbour.xPos === goal[0] && neighbour.yPos === goal[1]) continue;

      array[neighbour.xPos][neighbour.yPos].extra = "inQueue";     
    }

    tile = path.pop()

    array[tile.xPos][tile.yPos].extra = "searched";

    closedList[tile.xPos][tile.yPos] = 1;

    while (closedList[lookingAtTile.xPos][lookingAtTile.yPos] === 1) {
      lookingAt = queue.shift();

      //If search failed
      if (lookingAt === undefined) {
        break;
      }

      lookingAtTile = lookingAt[lookingAt.length - 1]
    }

    //TODO maybe find a better way to do this
    if (lookingAt === undefined) {
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

    for(let i = lookingAt.length - 1; i >= 0; i--) {
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
  
  resetFunction()
}