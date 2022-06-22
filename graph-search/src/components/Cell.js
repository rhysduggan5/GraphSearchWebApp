import React from 'react'

const Cell = ({x, y, clicked}) => {

    const handleClick = (event) => {
        if (event.buttons === 1) {
            clicked = true;
            event.target.style.backgroundColor = clicked ? "black" : "white";
        }
    }

    return (
        <div className="cell" onMouseMove={handleClick}>
            
        </div>
    )
}


Cell.defaultProps = {
    columns: -1,
    rows: -1,
    clicked: false
}

export default Cell
