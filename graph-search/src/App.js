import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import {breadthFirstSearch}  from './searchAlgorithms/BreadthFirstSearch'
import {depthFirstSearch}  from './searchAlgorithms/DepthFirstSearch'
import {bestFirstSearch}  from './searchAlgorithms/BestFirstSearch'
import {aStarSearch}  from './searchAlgorithms/AStarSearch'
import * as Constants from './Constants' 
import React from 'react'

class App extends React.Component {

  constructor() {
    super();

    const data = this.generateCells()

    this.state = {
      cols: data[0],
      tool: "pen",
      start: data[1],
      goal: data[2],
      search: "breadthfirstsearch",
      searching: false
    }
  }

  liftState = state => {
    this.setState(state);
  }

  generateCells() {
    const cols = []

    const startX = Math.floor(Math.random() * (50))
    const startY = Math.floor(Math.random() * (25))
    const goalX = Math.floor(Math.random() * (50))
    const goalY = Math.floor(Math.random() * (25))

    for (let x = 0; x < Constants.ROWS; x++) {
      cols.push([])
    }

    for (let x = 0; x < Constants.ROWS; x++) {
      for (let y = 0; y < Constants.COLUMNS; y++) {
        cols[x].push({
          xPos: x,
          yPos: y,
          weight: 1,
          extra: "",
          state: "blank"
        })
      }
    }

    cols[startX][startY].state = "start"
    cols[goalX][goalY].state = "goal"

    return [cols, [startX, startY], [goalX, goalY]]
  }

  resetGrid = () => {

    const data = this.generateCells()

    this.setState({
      cols: data[0],
      start: data[1],
      goal: data[2]
    })
  }

  alterTool = (_, tool) => {
    this.setState({
      tool: tool
    })
  }

  alterAlgo = (_, algo) => {
    this.setState({
      search: algo
    })
  }

  cellClicked = (event, x, y) => {
    if (event.buttons === 0) {

      const cols = this.state.cols
      const tile = cols[x][y]

      if (tile.state === "goal" || tile.state === "start") return;

      cols[x][y].state = this.state.tool === "pen" ? "wall" : "blank"

      this.setState({
        cols: cols
      });
    }
  }

  cellDragged = (event, x, y) => {
    try {
      if (event.buttons === 1) {

        const cols = this.state.cols
        const tile = cols[x][y]

        if (tile.state === "goal" || tile.state === "start") return;

        cols[x][y].state = this.state.tool === "pen" ? "wall" : "blank"

        this.setState({
          cols: cols
        });
      }
    } catch (Exception) { }
  }

  updateGrid = (array) => {
    this.setState({
      cols: array
    });
  }

  searchClicked = (_) => {
    if (!this.state.searching) {
      this.forceUpdate();

      this.setState({
        searching: true
      })

      this.searchResetGrid()

      switch(this.state.search) {
        case "breadthfirstsearch":
          breadthFirstSearch(this.state.cols, this.state.start, this.updateGrid, this.stopSearching)
          return
        case "depthfirstsearch":
          depthFirstSearch(this.state.cols, this.state.start, this.updateGrid, this.stopSearching)
          return
        case "bestfirstsearch":
          bestFirstSearch(this.state.cols, this.state.start, this.state.goal, this.updateGrid, this.stopSearching)
          break;
        case "astarsearch":
          aStarSearch(this.state.cols, this.state.start, this.state.goal, this.updateGrid, this.stopSearching)
          break;
        default:
          return
      }
    }
  }

  searchResetGrid = () => {
    let array = this.state.cols;

    for (let i = 0; i < array.length; i++) {
      let column = array[i];

      for (let j = 0; j < column.length; j++) {
        let tile = column[j]

        if (tile.state !== "wall" && tile.state !== "start" && tile.state !== "goal") {
          array[i][j].state = "blank"
        }
      }
    }

    this.setState({
      cols: array
    });
  }

  stopSearching = () => {
    this.setState({
      searching: false
    })
  }

  onTileStartDrag = (e, type, x, y) => {
    e.dataTransfer.setData('text', JSON.stringify([type, x, y]));
    //To allow for reading data during the drag
    e.dataTransfer.setData(type, "")
    e.dataTransfer.dropEffect = 'none'
    e.dataTransfer.effectAllowed = 'move'
  }

  onTileDrop = (e, x, y) => {
    e.preventDefault()

    let data = e
    .dataTransfer
    .getData('text');

    data = JSON.parse(data)

    let array = this.state.cols

    let oldTile = array[x][y]
    let newTile = array[data[1]][data[2]]
    let oldState = oldTile.state
    let newState = newTile.state

    oldTile.state = newState
    newTile.state = oldState
    array[x][y] = oldTile
    array[data[1]][data[2]] = newTile

    array[x][y].extra = ""

    if (newState === "start") {
      this.setState({
        cols: array,
        start: [x, y]
      });
    } else {
      this.setState({
        cols: array,
        goal: [x, y]
      });
    }
  }

  onTileDragEnter = (e, x, y) => {
    let state = e
    .dataTransfer
    .types[1];

    if (state === "start") {
      const array = this.state.cols

      array[x][y].extra = "starthover"

      this.setState({
        cols: array
      })
    } else {
      const array = this.state.cols

      array[x][y].extra = "goalhover"

      this.setState({
        cols: array
      })
    }
  }

  onTileDragExit = (_, x, y) => {
    const array = this.state.cols

    array[x][y].extra = ""

    this.setState({
      cols: array
    })
  }

  render() {
    return (
      <div className="container">
        <Header />
        <br />
        <Buttons 
          resetGrid={this.resetGrid} 
          tool={this.state.tool} 
          alterTool={this.alterTool}
          searchClicked={this.searchClicked}
          alterAlgo={this.alterAlgo}/>
        <br />
        <Grid
          grid={this.state.cols}
          cellClicked={this.cellClicked}
          cellDragged={this.cellDragged}
          onTileStartDrag={this.onTileStartDrag}
          onTileDrop={this.onTileDrop}
          onTileDragEnter={this.onTileDragEnter}
          onTileDragExit={this.onTileDragExit}
        />
      </div>
    );
  }
}

export default App;
