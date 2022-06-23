import { Clear, Delete, Edit, Search } from '@mui/icons-material'
import { Button, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React from 'react'

const Buttons = (props) => {

  return (
    <div>
      <Button onClick={props.resetGrid} variant="outlined" startIcon={<Delete />}>
        Reset Grid
      </Button>

      <ToggleButtonGroup
        value={props.tool}
        aria-label="text formatting"
        exclusive
        onChange={props.alterTool}
        style={{marginLeft:"10px"}}
        >
        <ToggleButton value="pen" aria-label="bold">
          <Edit/>
        </ToggleButton>
        <ToggleButton value="eraser" aria-label="italic">
          <Clear/>
        </ToggleButton>
      </ToggleButtonGroup>

      <Button onClick={props.searchClicked} variant="outlined" startIcon={<Search />}>
        Search
      </Button>
    </div>
  )
}

export default Buttons
