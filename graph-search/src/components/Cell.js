import { WeightIcon } from '../icons/Icons'
import React from 'react'

const Cell = (props) => {

  const backgroundColorGen = (state, extra) => {
    switch (extra) {
      case "starthover":
        return "rgba(0, 128, 0, 0.5)"
      case "goalhover":
        return "rgba(256, 0, 0, 0.5)"
      case "inQueue":
        return "rgba(255, 255, 255, 0.4)"
      case "searched":
        return "rgba(255, 255, 255, 0.6)"
      case "path":
        return "#7f5af0"
      case "lookingAt":
        return "blue"
      default:
        break;
    }

    switch (state) {
      case "blank":
        return "white"
      case "wall":
        return "black"
      case "start":
        return "green"
      case "goal":
        return "red"
      case "heavyfloor":
        return "darkgrey"
      default:
        return "white"
    }
  }

  const borderColorGen = (state, extra) => {
    switch (extra) {
      case "inQueue":
        return "rgb(115, 115, 118)"
      case "path":
        return "#7f5af0"
      default:
        break;
    }

    switch (state) {
      case "blank":
        return "#888"
      case "wall":
        return "black"
      case "start":
        return "green"
      case "goal":
        return "red"
      default:
        return "#888"
    }
  }

  const cellStyle = {
    backgroundColor: backgroundColorGen(props.state, props.extra),
    border: "solid 1px " + borderColorGen(props.state, props.extra)
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

        {props.state === "heavyfloor" ? <WeightIcon /> : <div />}

      </div>
    )
  }
}

export default Cell
