import React from 'react'
import Cell from './Cell'

const Grid = (props) => {

  const cellClicked = props.cellClicked;
  const cellDragged = props.cellDragged;

  return (
    <div className='grid'>
      {props.grid.map((col, colNumber) => <div key={`col:${colNumber}`} className='col'>
        {col.map(val => <Cell
          key={`tile:${val.xPos}:${val.yPos}`}
          xPos={val.xPos}
          yPos={val.yPos}
          state={val.state}
          cellClicked={cellClicked}
          cellDragged={cellDragged}
        />)}
      </div>)}
    </div>
  )
}

Grid.defaultProps = {
  cols: []
}

export default Grid
