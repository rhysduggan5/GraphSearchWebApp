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

    const neighbours = getGraphNeighbours(array, [wall]);

    var tiles = 0;

    for (let i = 0; i < neighbours.length; i++) {
      if (neighbours[i] !== undefined && neighbours[i].state !== "wall") {
        tiles++;
      }
    }

    if (tiles <= 1) {
      array[wall.xPos][wall.yPos].state = "blank";

      blanks.push(wall);

      walls = walls.concat(getWalls(array, array[wall.xPos][wall.yPos]));
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