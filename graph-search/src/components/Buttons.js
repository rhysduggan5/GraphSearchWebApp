import { Clear, Delete, Edit, Search } from '@mui/icons-material'
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
        onClick={props.searchClicked} 
        variant="outlined" 
        startIcon={<Search />}
        className="toolbarButton">
        Search
      </Button>

      <FormControl>
        <FormLabel id="algo-selection">Algorithm</FormLabel>
        <RadioGroup
          row
          aria-labelledby="algorithm-selection"
          name="algorithm-selection"
          defaultValue="breadthfirstsearch"
          onChange={props.alterAlgo}
        >
          <FormControlLabel value="breadthfirstsearch" control={<Radio />} label="Breadth First Search" />
          <FormControlLabel value="depthfirstsearch" control={<Radio />} label="Depth First Search" />
          <FormControlLabel value="bestfirstsearch" control={<Radio />} label="Best First Search" />
          <FormControlLabel value="astarsearch" control={<Radio />} label="A* Search" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Buttons
