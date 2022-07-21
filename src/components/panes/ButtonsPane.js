import { Clear, Delete, Search } from '@mui/icons-material'
import { Button, LoadingButton } from '../Buttons'

import React from 'react'
import { MazeIcon } from '../../icons/Icons'

const ButtonsPane = (props) => {

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
        disabled={props.generating || props.searching}
        startIcon={<Delete />}
        text="Reset Grid"/>

      <LoadingButton 
        onClick={props.generateClicked} 
        startIcon={<MazeIcon />}
        text="Generate Maze"
        loading={props.generating}
        disabled={props.generating || props.searching}/>

      <LoadingButton 
        onClick={props.searchClicked}
        startIcon={<Search />}
        text="Search"
        loading={props.searching}
        disabled={props.generating || props.searching}/>

      <Button 
        onClick={props.clearSearch}
        disabled={props.generating || props.searching}
        startIcon={<Clear />}
        text="Clear Search"/>
    </div>
  )
}

export default ButtonsPane