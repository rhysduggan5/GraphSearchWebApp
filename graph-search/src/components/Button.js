import {Button as B} from '@mui/material'

export const Button = (props) => {
  return (
    <B 
      style={{
        backgroundColor: "#7f5af0"
      }}
      onClick={props.onClick} 
      variant="contained" 
      startIcon={props.startIcon}
      className="toolbarButton">
      <p style={{
        color: "#fffffe"
      }}>
        {props.text}
      </p>
    </B>
  );
}