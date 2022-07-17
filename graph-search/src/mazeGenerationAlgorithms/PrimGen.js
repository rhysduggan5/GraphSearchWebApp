import {sleep, getWalls, shuffle, getGraphNeighbours} from '../Utils'


export const primGeneration = async (array, start, animate, updateGoal, updateFunction, resetFunction) => {
  
  for (let x = 0; x < array.length; x++) {
    for (let y = 0; y < array[0].length; y++) {
      if (array[x][y].state !== "start") {
        array[x][y].state = "wall";
      }
    }
  }

  updateFunction(array);

  let walls = [];
  let blanks = [];

  walls = walls.concat(getWalls(array, array[start[0]][start[1]]));

  while (walls.length !== 0) {

    walls = shuffle(walls);

    const wall = walls.pop();

    const wallX = wall.xPos;
    const wallY = wall.yPos;
    let tileX = 0;
    let tileY = 0;

    const neighbours = getGraphNeighbours(array, [wall]);

    var tiles = 0;

    for (let i = 0; i < neighbours.length; i++) {
      if (neighbours[i] !== undefined && neighbours[i].state !== "wall") {
        tiles++;
        tileX = neighbours[i].xPos;
        tileY = neighbours[i].yPos;
      }
    }

    // Positive difference is down
    const xDiff = wallX - tileX;
    //Positive difference is right
    const yDiff = wallY - tileY;

    if (tiles <= 1) {
      array[wall.xPos][wall.yPos].state = "blank";
      try {
        const newBlank = array[wall.xPos + xDiff][wall.yPos + yDiff];
        array[newBlank.xPos][newBlank.yPos].state = "blank";

        blanks.push(wall);
        blanks.push(newBlank);

        walls = walls.concat(getWalls(array, array[newBlank.xPos][newBlank.yPos]));
      } catch (exception) {
        console.log(exception);
        array[wall.xPos][wall.yPos].state = "blank";
        blanks.push(wall);
        walls = walls.concat(getWalls(array, array[wall.xPos][wall.yPos]));
      }
    }

    if (animate) {
      await sleep(10);
    }

    updateFunction(array)
  }

  blanks = shuffle(blanks);

  const goalCell = blanks.pop();

  array[goalCell.xPos][goalCell.yPos].state = "goal";

  updateGoal(goalCell.xPos, goalCell.yPos);

  updateFunction(array);

  resetFunction();
}