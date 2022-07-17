import { AddCircle, Clear, Delete, Edit, FitnessCenter, Search } from '@mui/icons-material'
import { Button, ToggleButtonGroup, ToggleButton, Typography } from '@mui/material'

import React from 'react'

const Buttons = (props) => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#E3E3E3",
      borderRadius: "15px",
      padding: "15px"
    }}>
      <Button 
        onClick={props.resetGrid} 
        variant="contained" 
        startIcon={<Delete />}
        className="toolbarButton">
        Reset Grid
      </Button>

      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <Typography variant="h6" style={{
          marginRight: "10px",
          marginLeft: "10px"}}>Tool: </Typography>

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
      </div>

      <Button 
        onClick={props.generateClicked} 
        variant="contained" 
        startIcon={<AddCircle />}
        className="toolbarButton">
        Generate Maze
      </Button>

      <Button 
        onClick={props.searchClicked} 
        variant="contained" 
        startIcon={<Search />}
        className="toolbarButton">
        Search
      </Button>

      <Button 
        onClick={props.clearSearch} 
        variant="contained" 
        startIcon={<Clear />}
        className="toolbarButton">
        Clear Search
      </Button>
    </div>
  )
}

export default Buttons
