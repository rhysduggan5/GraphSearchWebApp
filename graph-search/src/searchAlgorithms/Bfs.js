
function BfsSearch(array, start, goal) {
    console.log(array);
    console.log(start);
    console.log(goal);

    var tile = {};
    var queue = [];

    queue.push(array[start[0]][start[1]]);

    // console.log(tile);

    // console.log(GetNeighbours(array, tile));
    while (tile.state !== "goal") {
        
    }
}

function GetNeighbours(array, tile) {
    const xPos = tile.xPos;
    const yPos = tile.yPos;

    var neighbours = [];

    try {
        neighbours.push(array[xPos - 1][yPos])
    } catch (Exception) {}

    try {
        neighbours.push(array[xPos + 1][yPos])
    } catch (Exception) {}

    try {
        neighbours.push(array[xPos][yPos - 1])
    } catch (Exception) {}

    try {
        neighbours.push(array[xPos][yPos + 1])
    } catch (Exception) {}

    return neighbours
}

export default BfsSearch