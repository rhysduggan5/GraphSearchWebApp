import { AddCircle, Clear, Delete, Search } from '@mui/icons-material'
import { Button } from './Button'

import React from 'react'

const Buttons = (props) => {

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#16161a",
      borderRadius: "15px",
      padding: "15px"
    }}>
      <Button 
        onClick={props.resetGrid}
        startIcon={<Delete />}
        text="Reset Grid"/>

      <Button 
        onClick={props.generateClicked} 
        startIcon={<AddCircle />}
        text="Generate Maze"/>

      <Button 
        onClick={props.searchClicked}
        startIcon={<Search />}
        text="Search"/>

      <Button 
        onClick={props.clearSearch}
        startIcon={<Clear />}
        text="Clear Search"/>
    </div>
  )
}

export default Buttons
