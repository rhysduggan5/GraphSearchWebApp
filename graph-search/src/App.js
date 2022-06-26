import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import {BreadthFirstSearch}  from './searchAlgorithms/BreadthFirstSearch'
import {DepthFirstSearch}  from './searchAlgorithms/DepthFirstSearch'
import {BestFirstSearch}  from './searchAlgorithms/BestFirstSearch'
import {AStarSearch}  from './searchAlgorithms/AStarSearch'
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

  alterTool = (event, tool) => {
    this.setState({
      tool: tool
    })
  }

  alterAlgo = (event, algo) => {
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
    if (event.buttons === 1) {

      const cols = this.state.cols
      const tile = cols[x][y]

      if (tile.state === "goal" || tile.state === "start") return;

      cols[x][y].state = this.state.tool === "pen" ? "wall" : "blank"

      this.setState({
        cols: cols
      });
    }
  }

  updateGrid = (array) => {
    this.setState({
      cols: array
    });
  }

  searchClicked = (event) => {
    if (!this.state.searching) {
      this.setState({
        searching: true
      })

      this.searchResetGrid()

      switch(this.state.search) {
        case "breadthfirstsearch":
          BreadthFirstSearch(this.state.cols, this.state.start, this.updateGrid, this.stopSearching)
          return
        case "depthfirstsearch":
          DepthFirstSearch(this.state.cols, this.state.start, this.updateGrid, this.stopSearching)
          return
        case "bestfirstsearch":
          BestFirstSearch(this.state.cols, this.state.start, this.state.goal, this.updateGrid, this.stopSearching)
          break;
        case "astarsearch":
          AStarSearch(this.state.cols, this.state.start, this.state.goal, this.updateGrid, this.stopSearching)
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
        />
      </div>
    );
  }
}

export default App;
