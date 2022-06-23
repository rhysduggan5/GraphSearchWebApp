import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'
import React from 'react'

class App extends React.Component {

  constructor() {
    super();

    const cols = this.generateCells()

    this.state = {
      cols: cols,
      tool: "pen"
    }
  }

  liftState = state => {
    this.setState(state);
  }

  generateCells() {
    const cols = []

    const rows = 50
    const columns = 25

    const startX = Math.floor(Math.random() * (51))
    const startY = Math.floor(Math.random() * (26))
    const goalX = Math.floor(Math.random() * (51))
    const goalY = Math.floor(Math.random() * (26))

    for (let x = 0; x < rows; x++) {
      cols.push([])
    }

    for (let x = 0; x < rows; x++) {
      for (let y = 0; y < columns; y++) {
        cols[x].push({
          xPos: x,
          yPos: y,
          state: "blank"
        })
      }
    }

    cols[startX][startY].state = "start"
    cols[goalX][goalY].state = "goal"

    return cols
  }

  resetGrid = () => {

    const cols = this.generateCells()

    this.setState({
      cols: cols
    })
  }

  alterTool = (event, tool) => {
    this.setState({
      tool: tool
    })
  }

  cellClicked = (event, x, y) => {
    const cols = this.state.cols
    const tile = cols[x][y]

    if (tile.state === "goal" || tile.state === "start") return;

    cols[x][y].state = this.state.tool === "pen" ? "wall" : "blank"

    this.setState({
      cols: cols
    })
  }

  render() {
    return (
      <div className="container">
        <Header />
        <br />
        <Buttons resetGrid={this.resetGrid} tool={this.state.tool} alterTool={this.alterTool} />
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
