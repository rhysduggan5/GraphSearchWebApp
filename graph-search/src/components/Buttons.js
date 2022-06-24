import { Clear, Delete, Edit, Park, ShowChart } from '@mui/icons-material'
import { Button, ToggleButtonGroup, ToggleButton, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const Buttons = (props) => {

  return (
    <div style={{}}>
      <Button 
        onClick={props.resetGrid} 
        variant="outlined" 
        startIcon={<Delete />}
        className="toolbarButton">
        Reset Grid
      </Button>

      <ToggleButtonGroup
        value={props.tool}
        aria-label="text formatting"
        exclusive
        onChange={props.alterTool}
        style={{marginRight:"10px"}}
        size="small"
        >
        <ToggleButton value="pen" aria-label="bold">
          <Edit/>
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="italic">
          <Clear/>
        </ToggleButton>
      </ToggleButtonGroup>

      <Button 
        onClick={props.treeSearchClicked} 
        variant="outlined" 
        startIcon={<Park />}
        className="toolbarButton">
        Tree Search
      </Button>

      <Button 
        onClick={props.graphSearchClicked} 
        variant="outlined" 
        startIcon={<ShowChart />}
        className="toolbarButton">
        Graph Search
      </Button>

      <FormControl>
        <FormLabel id="algo-selection">Algorithm</FormLabel>
        <RadioGroup
          row
          aria-labelledby="algorithm-selection"
          name="algorithm-selection"
          defaultValue="bfs"
          onChange={props.alterAlgo}
        >
          <FormControlLabel value="bfs" control={<Radio />} label="Breadth First Search" />
          <FormControlLabel value="dfs" control={<Radio />} label="Depth First Search" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Buttons
