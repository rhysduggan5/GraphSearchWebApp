import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'

import { breadthFirstSearch } from './searchAlgorithms/BreadthFirstSearch'
import { depthFirstSearch } from './searchAlgorithms/DepthFirstSearch'
import { bestFirstSearch } from './searchAlgorithms/BestFirstSearch'
import { aStarSearch } from './searchAlgorithms/AStarSearch'

import { generateCells, useForceRender } from './Utils'
import * as Constant from './Constants'

import React, { useState } from 'react'

import { Grid as MaterialGrid, Slider } from '@mui/material'

import { Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'


function App() {
  //Create hooks for all state values
  const [xSize, setXSize] = useState(Constant.COLUMNS)
  const [ySize, setYSize] = useState(Constant.ROWS)

  //Initial grid on load
  const initialData = generateCells(xSize, ySize)
  const [cols, setCols] = useState(initialData[0])
  const [tool, setTool] = useState("pen")
  const [start, setStart] = useState(initialData[1])
  const [goal, setGoal] = useState(initialData[2])
  const [search, setSearch] = useState("breadthfirstsearch")
  const [searching, setSearching] = useState(false)

  //Rerenderer
  const forceRender = useForceRender()

  /**
   * Resets the grid, and randomly generates a new set of start and
   * goal tiles
   */
  const resetGrid = () => {
    const data = generateCells(xSize, ySize)

    setCols(data[0])
    setStart(data[1])
    setGoal(data[2])
  }

  /**
   * Helper method to force an update of changes to the graph, when
   * the search algorithm is drawing changes to it.
   * @param {array} newCols The new grid to be displayed
   */
  const updateGrid = (newCols) => {
    setCols(newCols)
    forceRender()
  }

  /**
   * Callback when a cell is clicked, to ensure it gets drawn on,
   * at the start of a drag
   * @param {any} event The click event
   * @param {any} x The x position of the cell
   * @param {any} y The y position of the cell
   */
  const cellClicked = (event, x, y) => {
    if (event.buttons === 0) {
      const tile = cols[x][y]

      //Don't draw over the goal or start
      if (tile.state === "goal" || tile.state === "start") return;

      switch(tool) {
        case "pen":
          cols[x][y].state = "wall"
          break
        case "eraser":
          cols[x][y].state = "blank"
          break
        case "heavypen":
          cols[x][y].state = "heavyfloor"
          break
        default:
          cols[x][y].state = "blank"
          break
      }

      setCols(cols)

      forceRender()
    }
  }

  /**
   * Callback when a cell is dragged over, to ensure it gets drawn on,
   * and to ensure dragging the start and end tiles anywhere doesn't
   * also draw things to the graph
   * @param {*} event The drag event
   * @param {*} x The x position of the cell
   * @param {*} y The y position of the cell
   */
  const cellDragged = (event, x, y) => {
    try {
      if (event.buttons === 1) {
        const tile = cols[x][y]

        //Don't draw over the start or goal
        if (tile.state === "goal" || tile.state === "start") return;

        switch(tool) {
          case "pen":
            cols[x][y].state = "wall"
            cols[x][y].weight = 1
            break
          case "eraser":
            cols[x][y].state = "blank"
            cols[x][y].weight = 1
            break
          case "heavypen":
            cols[x][y].state = "heavyfloor"
            cols[x][y].weight = 10
            break
          default:
            cols[x][y].state = "blank"
            cols[x][y].weight = 1
            break
        }

        setCols(cols)

        forceRender()
      }
    } catch (Exception) { }
  }

  /**
   * Function to handle activating a search of the grid
   * @param {*} _ Ignored event of the click
   */
  const searchClicked = (_) => {
    //Ensure only one search can happen at once
    if (!searching) {
      setSearching(true)

      //Remove any previous search updates
      searchResetGrid()

      //Activate the search 
      switch (search) {
        case "breadthfirstsearch":
          breadthFirstSearch(cols, start, updateGrid, () => setSearching(false))
          return
        case "depthfirstsearch":
          depthFirstSearch(cols, start, updateGrid, () => setSearching(false))
          return
        case "bestfirstsearch":
          bestFirstSearch(cols, start, goal, updateGrid, () => setSearching(false))
          break;
        case "astarsearch":
          aStarSearch(cols, start, goal, updateGrid, () => setSearching(false))
          break;
        default:
          return
      }
    }
  }

  /**
   * Function to clear the grid from a previous search
   */
  const searchResetGrid = () => {
    let array = cols

    for (let i = 0; i < array.length; i++) {
      let column = array[i];

      for (let j = 0; j < column.length; j++) {
        array[i][j].extra = ""
      }
    }

    setCols(array)
    forceRender()
  }

  /**
   * Handler for starting dragging a start or goal tile
   * @param {any} e The drag event
   * @param {any} type Whether it is a start or goal tile
   * @param {any} x The x position of the tile
   * @param {any} y The y position of the tile
   */
  const onTileStartDrag = (e, type, x, y) => {
    e.dataTransfer.setData('text', JSON.stringify([type, x, y]));
    //To allow for reading data during the drag
    e.dataTransfer.setData(type, "")
    e.dataTransfer.dropEffect = 'none'
    e.dataTransfer.effectAllowed = 'move'
  }

  /**
   * Handler for dropping a start or goal tile
   * @param {any} e The drop event
   * @param {any} x The x position of the tile
   * @param {any} y The y position of the tile
   */
  const onTileDrop = (e, x, y) => {
    e.preventDefault()

    //Get the data stored in the event
    let data = e
      .dataTransfer
      .getData('text');

    data = JSON.parse(data)

    let array = cols

    //Swap the data of the old tile and new tile
    let oldTile = array[x][y]
    let newTile = array[data[1]][data[2]]
    let oldState = oldTile.state
    let newState = newTile.state
    let oldWeight = oldTile.weight
    let newWeight = newTile.weight

    oldTile.state = newState
    newTile.state = oldState

    oldTile.weight = newWeight
    newTile.weight = oldWeight

    array[x][y] = oldTile
    array[data[1]][data[2]] = newTile

    array[x][y].extra = ""

    setCols(array)

    if (newState === "start") {
      setStart([x, y])
    } else {
      setGoal([x, y])
    }

    forceRender()
  }

  /**
   * Handler for dragging a tile through a valid drop zone
   * @param {any} e The drop event
   * @param {any} x The x position of the tile
   * @param {any} y The y position of the tile
   */
  const onTileDragEnter = (e, x, y) => {
    //Get the second type, which is actually the state
    let state = e
      .dataTransfer
      .types[1];

    const array = cols

    if (state === "start") {
      array[x][y].extra = "starthover"
    } else {
      array[x][y].extra = "goalhover"
    }

    setCols(array)

    forceRender()
  }

  /**
   * Handler for dragging a tile out of a valid drop zone
   * @param {any} e The drop event
   * @param {any} x The x position of the tile
   * @param {any} y The y position of the tile
   */
  const onTileDragExit = (_, x, y) => {
    const array = cols

    array[x][y].extra = ""

    setCols(array, forceRender)
  }

  const updateXSize = (_, x) => {
    setXSize(x);
    resetGrid();
  }

  const updateYSize = (_, y) => {
    setYSize(y);
    resetGrid();
  }

  return (
    <div style={{
      margin: "15px",
      padding: "15px",
      backgroundColor: "#F3F3F3",
      borderRadius: "15px"
    }}>
      <Header />
      <br />
      <Buttons
        resetGrid={resetGrid}
        tool={tool}
        alterTool={(_, tool) => {
          setTool(tool)
        }}
        searchClicked={searchClicked}
        clearSearch={searchResetGrid}/>
      <br />
      <MaterialGrid
        container
        direction="row"
        wrap="nowrap">
        <MaterialGrid 
          item 
          xs={2} 
          style={{
            backgroundColor: "#E3E3E3",
            padding: "15px",
            marginRight: "10px",
            marginBottom: "10px",
            borderRadius: "15px",
            height: "fit-content",
            minWidth: "220px"
            }}>
          <Typography variant="h5">Settings</Typography>
          <br/>
          <FormControl>
            <FormLabel id="algo-selection">Algorithm</FormLabel>
            <RadioGroup
              row
              aria-labelledby="algorithm-selection"
              name="algorithm-selection"
              defaultValue="breadthfirstsearch"
              onChange={(_, value) => {setSearch(value)}}>
              <FormControlLabel value="breadthfirstsearch" control={<Radio />} label="Breadth First Search" />
              <FormControlLabel value="depthfirstsearch" control={<Radio />} label="Depth First Search" />
              <FormControlLabel value="bestfirstsearch" control={<Radio />} label="Best First Search" />
              <FormControlLabel value="astarsearch" control={<Radio />} label="A* Search" />
            </RadioGroup>
          </FormControl>

          <br/>
          <Typography variant="h6">X size</Typography>
          <Slider onChange={updateXSize } max={50} valueLabelDisplay="auto" aria-label="x-slider" defaultValue={Constant.COLUMNS} />

          <Typography variant="h6">Y size</Typography>
          <Slider onChange={updateYSize } max={50} valueLabelDisplay="auto" aria-label="y-slider" defaultValue={Constant.ROWS} />
        </MaterialGrid>
        <div
          item
          xs={10}
          style={{
            padding: "25px",
            backgroundColor: "#E3E3E3",
            borderRadius: "15px",
            margin: "auto",
            overflow: "auto",
            overflowX: "auto",
            width: "100%",
            justifyContent: "center"}}>
          <Grid
            grid={cols}
            cellClicked={cellClicked}
            cellDragged={cellDragged}
            onTileStartDrag={onTileStartDrag}
            onTileDrop={onTileDrop}
            onTileDragEnter={onTileDragEnter}
            onTileDragExit={onTileDragExit}/>
        </div>
      </MaterialGrid>
    </div>
  );
}

export default App;
