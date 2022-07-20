import React from 'react'
import Cell from './Cell'

const Grid = (props) => {

  return (
    <div className='grid' style={{
      borderColor: "#72757e",
      border: "2px"
    }}>
      {props.grid.map((col, colNumber) => <div key={`col:${colNumber}`} className='col'>
        {col.map(val => <Cell
          key={`tile:${val.xPos}:${val.yPos}`}
          xPos={val.xPos}
          yPos={val.yPos}
          state={val.state}
          extra={val.extra}
          hover={val.hover}
          cellClicked={props.cellClicked}
          cellDragged={props.cellDragged}
          onTileStartDrag={props.onTileStartDrag}
          onTileDrop={props.onTileDrop}
          onTileDragEnter={props.onTileDragEnter}
          onTileDragExit={props.onTileDragExit}
        />)}
      </div>)}
    </div>
  )
}

Grid.defaultProps = {
  cols: []
}

export default Grid
