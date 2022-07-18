import { Clear, Delete, Search } from '@mui/icons-material'
import { Button, LoadingButton } from '../Button'

import React from 'react'
import { MazeIcon } from '../../icons/Icons'

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

      <LoadingButton 
        onClick={props.generateClicked} 
        startIcon={<MazeIcon />}
        text="Generate Maze"
        loading={props.generating}/>

      <LoadingButton 
        onClick={props.searchClicked}
        startIcon={<Search />}
        text="Search"
        loading={props.searching}/>

      <Button 
        onClick={props.clearSearch}
        startIcon={<Clear />}
        text="Clear Search"/>
    </div>
  )
}

export default Buttons
