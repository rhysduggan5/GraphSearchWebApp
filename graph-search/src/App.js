import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import BfsSearch from './searchAlgorithms/Bfs'
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
      search: "bfs"
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

  cellClicked = (event, x, y) => {
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
    switch(this.state.search) {
      case "bfs":
        BfsSearch(this.state.cols, this.state.start, this.state.goal, this.updateGrid)
        return
      default:
        return
    }
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
          searchClicked={this.searchClicked} />
        <br />
        <Grid
          grid={this.state.cols}
          cellClicked={this.cellClicked}
        />
      </div>
    );
  }
}

export default App;
