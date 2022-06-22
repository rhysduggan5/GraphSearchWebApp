import React from 'react'
import Cell from './Cell'

const Grid = ({columns, rows}) => {

    var cols = []

    for (let x = 0; x < rows; x++) {
        cols.push([])
    }

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < columns; y++) {
            cols[x].push(x+":"+y)
        }
    }

    console.log(cols);

    return (
        <div className='grid'>
            {cols.map(col => <div className='col'>
                {col.map(val => <Cell key={`${val}`} />)}
            </div>)}
        </div>
    )
}

Grid.defaultProps = {
    columns: 25,
    rows: 50
}

export default Grid
