import Header from './components/Header'
import Grid from './components/Grid'
import Buttons from './components/Buttons'

import { breadthFirstSearch } from './searchAlgorithms/BreadthFirstSearch'
import { depthFirstSearch } from './searchAlgorithms/DepthFirstSearch'
import { bestFirstSearch } from './searchAlgorithms/BestFirstSearch'
import { aStarSearch } from './searchAlgorithms/AStarSearch'

import { primGeneration } from './mazeGenerationAlgorithms/PrimGen'

import { useWindowDimensions } from './WindowSize'

import { generateCells, useForceRender } from './Utils'

import React, { useState } from 'react'

import { Edit } from '@mui/icons-material'
import { EraserIcon, WeightIcon } from './icons/Icons'
import { Grid as MaterialGrid, Slider, createTheme, ThemeProvider, ToggleButton, ToggleButtonGroup } from '@mui/material'

import { Typography, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Checkbox,
  FormGroup } from '@mui/material'


function App() {
  let { height, width } = useWindowDimensions();

  height -= 220;
  width -= 350;

  let columns = Math.floor(height / 25)
  let rows = Math.floor(width / 25)

  //Create hooks for all state values
  const [xSize, setXSize] = useState(columns)
  const [ySize, setYSize] = useState(rows)

  //Initial grid on load
  const initialData = generateCells(xSize, ySize)
  const [cols, setCols] = useState(initialData[0])
  const [tool, setTool] = useState("pen")
  const [start, setStart] = useState(initialData[1])
  const [goal, setGoal] = useState(initialData[2])
  const [animate, setAnimate] = useState(true)
  const [search, setSearch] = useState("breadthfirstsearch")
  const [searching, setSearching] = useState(false)
  const [mazeAlgorithm, setMazeAlgorithm] = useState("prim")
  const [generating, setGenerating] = useState(false)

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
          breadthFirstSearch(cols, start, animate, updateGrid, () => setSearching(false))
          return
        case "depthfirstsearch":
          depthFirstSearch(cols, start, animate, updateGrid, () => setSearching(false))
          return
        case "bestfirstsearch":
          bestFirstSearch(cols, start, goal, animate, updateGrid, () => setSearching(false))
          break;
        case "astarsearch":
          aStarSearch(cols, start, goal, animate, updateGrid, () => setSearching(false))
          break;
        default:
          return
      }
    }
  }

  /**
   * Function to handle generating a maze
   * @param {*} _ Ignored event of the click
   */
   const mazeGenClicked = (_) => {
    //Ensure only one search can happen at once
    if (!generating) {
      setGenerating(true)

      searchResetGrid()

      //Activate the search 
      switch (mazeAlgorithm) {
        case "prim":
          primGeneration(cols, start, animate, (x, y) => setGoal([x, y]), updateGrid, () => setGenerating(false))
          return
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

  const theme = createTheme({
    palette: {
      primary: {
        main: '#7f5af0',
      },
    },
  });

  return (
    <div style={{
      margin: "15px",
      padding: "15px",
      backgroundColor: "#242629",
      borderRadius: "15px"
    }}>
      <Header />
      <br />
      <Buttons
        resetGrid={resetGrid}
        generateClicked={mazeGenClicked}
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
            backgroundColor: "#16161a",
            padding: "15px",
            marginRight: "10px",
            marginBottom: "10px",
            borderRadius: "15px",
            height: "fit-content",
            minWidth: "220px"
            }}>
          <div style={{
            display: "flex",
            alignItems: "center"
          }}>
            <ThemeProvider theme={theme}>
              <ToggleButtonGroup
                value={tool}
                aria-label="text formatting"
                exclusive
                onChange={(_, tool) => {
                  setTool(tool)
                }}
                style={{marginRight:"10px"}}
                size="small"
                >
                <ToggleButton sx={{
                  color: "#72757e"
                }} color="primary" value="pen" aria-label="pen">
                  <Edit/>
                </ToggleButton>
                <ToggleButton sx={{
                  color: "#72757e"
                }} color="primary" value="heavypen" aria-label="heavypen">
                  <WeightIcon/>
                </ToggleButton>
                <ToggleButton sx={{
                  color: "#72757e"
                }} color="primary" value="eraser" aria-label="eraser">
                  <EraserIcon/>
                </ToggleButton>
              </ToggleButtonGroup>
            </ThemeProvider>
          </div>
          <br/>
          <FormGroup>
            <FormControlLabel className="secondaryText" control={
              <Checkbox sx={{
                color: "#72757e",
                '&.Mui-checked': {
                  color: "#7f5af0",
                },
              }} checked={animate} onChange={
                (_, value) => setAnimate(value)} defaultChecked />
              } label={
                <p style={{color: "#94a1b2"}}> 
                  Animate
                </p>
              } />
          </FormGroup>
          <br/>
          <FormControl>
            <FormLabel id="algo-selection" style={{
              color: "#fffffe"
            }}>Search Algorithm</FormLabel>
            <br/>
            <RadioGroup
              row
              aria-labelledby="algorithm-selection"
              name="algorithm-selection"
              defaultValue="breadthfirstsearch"
              onChange={(_, value) => {setSearch(value)}}>
              <FormControlLabel value="breadthfirstsearch" control={
                <Radio sx={{
                  color: "#72757e",
                  '&.Mui-checked': {
                    color: "#7f5af0",
                  },
                }}/>
              } label={<p style={{color: "#94a1b2"}}>Breadth First Search</p>} />
              <FormControlLabel className="secondaryText" value="depthfirstsearch" control={
                <Radio sx={{
                  color: "#72757e",
                  '&.Mui-checked': {
                    color: "#7f5af0",
                  },
                }}/>
              } label={<p style={{color: "#94a1b2"}}>Depth First Search</p>} />
              <FormControlLabel className="secondaryText" value="bestfirstsearch" control={
                <Radio sx={{
                  color: "#72757e",
                  '&.Mui-checked': {
                    color: "#7f5af0",
                  },
                }}/>
              } label={<p style={{color: "#94a1b2"}}>Best First Search</p>} />
              <FormControlLabel className="secondaryText" value="astarsearch" control={
                <Radio sx={{
                  color: "#72757e",
                  '&.Mui-checked': {
                    color: "#7f5af0",
                  },
                }}/>
              } label={<p style={{color: "#94a1b2"}}>A* Search</p>} />
            </RadioGroup>
            <br/>
          </FormControl>

          <br/>

          <FormControl>
            <FormLabel id="algo-selection" style={{
              color: "#fffffe"
            }}>Maze Generation Algorithm</FormLabel>
            <br/>
            <RadioGroup
              row
              aria-labelledby="maze-algorithm-selection"
              name="maze-algorithm-selection"
              defaultValue="prim"
              onChange={(_, value) => {setMazeAlgorithm(value)}}>
              <FormControlLabel value="prim" control={
                <Radio sx={{
                  color: "#72757e",
                  '&.Mui-checked': {
                    color: "#7f5af0",
                  },
                }}/>
              } label={<p style={{color: "#94a1b2"}}>Prim</p>} />
            </RadioGroup>
            <br/>
          </FormControl>

          <br/>

          <Typography variant="h6" style={{
            color: "#fffffe"
          }}>X size</Typography>
          <ThemeProvider theme={theme}>
            <Slider color="primary" onChange={updateXSize } min={2} max={50} valueLabelDisplay="auto" aria-label="x-slider" defaultValue={columns} />
          </ThemeProvider>

          <Typography variant="h6" style={{
            color: "#fffffe"
          }}>Y size</Typography>
          <ThemeProvider theme={theme}>
            <Slider color="primary" onChange={updateYSize } min={2} max={50} valueLabelDisplay="auto" aria-label="y-slider" defaultValue={rows} />
          </ThemeProvider>
        </MaterialGrid>
        <div
          item
          xs={10}
          style={{
            padding: "25px",
            backgroundColor: "#16161a",
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
