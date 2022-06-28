import { Clear, Delete, Edit, FitnessCenter, Search } from '@mui/icons-material'
import { Button, ToggleButtonGroup, ToggleButton } from '@mui/material'

import React from 'react'

const Buttons = (props) => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "center"
    }}>
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
        <ToggleButton value="pen" aria-label="pen">
          <Edit/>
        </ToggleButton>
        <ToggleButton value="heavypen" aria-label="heavypen">
          <FitnessCenter/>
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="eraser">
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
    </div>
  )
}

export default Buttons
