import React from 'react'

const Cell = (props) => {


  const backgroundColorGen = (state) => {
    switch(state) {
      case "blank":
        return "white"
      case "wall":
        return "black"
      case "start":
        return "green"
      case "goal":
        return "red"
      case "lookingAt":
        return "blue"
      case "inQueue":
        return "grey"
      case "searched":
        return "darkgrey"
      case "path":
        return "purple"
      default:
        return "white"
    }
  }

  const borderColorGen = (state) => {
    switch(state) {
      case "blank":
        return "#888"
      case "wall":
        return "#888"
      case "start":
        return "rgb(37, 109, 37)"
      case "goal":
        return "rgb(168, 36, 36)"
      default:
        return "#888"
    }
  }

  const cellStyle = {
    backgroundColor : backgroundColorGen(props.state),
    border: "solid 1px " + borderColorGen(props.state)
  }

  return (
    <div
      className="cell"
      onClick={e => props.cellClicked(e, props.xPos, props.yPos)}
      onMouseEnter={e => props.cellDragged(e, props.xPos, props.yPos)}
      style={cellStyle}>

    </div>
  )
}

export default Cell
