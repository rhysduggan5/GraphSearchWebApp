import React from 'react'

const Cell = (props) => {


  const backgroundColorGen = (state, extra) => {
    switch(extra) {
      case "starthover":
        return "rgba(0, 128, 0, 0.5)"
      case "goalhover":
        return "rgba(256, 0, 0, 0.5)"
      default:
        break;
    }

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
    backgroundColor : backgroundColorGen(props.state, props.extra),
    border: "solid 1px " + borderColorGen(props.state)
  }

  if (props.state === "start" || props.state === "goal") {
    return (
      <div
        className="cell"
        onClick={e => props.cellClicked(e, props.xPos, props.yPos)}
        onMouseEnter={e => props.cellDragged(e, props.xPos, props.yPos)}
        style={cellStyle}
        draggable="true"
        onDragStart={(e) => {
          props.onTileStartDrag(e, props.state, props.xPos, props.yPos)
        }}>
      </div>
    )
  } else {
    return (
      <div
        className="cell"
        onClick={e => props.cellClicked(e, props.xPos, props.yPos)}
        onMouseEnter={e => props.cellDragged(e, props.xPos, props.yPos)}
        style={cellStyle}
        onDrop={(e) => {
          props.onTileDrop(e, props.xPos, props.yPos)
        }}
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDragEnter={(e) => {
          props.onTileDragEnter(e, props.xPos, props.yPos)
        }}
        onDragLeave={(e) => {
          props.onTileDragExit(e, props.xPos, props.yPos)
        }}>  
        
      </div>
    )
  }
}

export default Cell
