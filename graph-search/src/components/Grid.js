import React from 'react'
import Cell from './Cell'

const Grid = (props) => {

  const cellClicked = props.cellClicked;

  return (
    <div className='grid'>
      {props.grid.map(col => <div className='col'>
        {col.map(val => <Cell
          key={`${val.xPos}:${val.yPos}`}
          xPos={val.xPos}
          yPos={val.yPos}
          state={val.state}
          cellClicked={cellClicked}
        />)}
      </div>)}
    </div>
  )
}

Grid.defaultProps = {
  cols: []
}

export default Grid
