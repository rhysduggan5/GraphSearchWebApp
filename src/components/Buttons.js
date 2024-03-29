import {Button as B} from '@mui/material'
import {LoadingButton as LB} from '@mui/lab'

export const Button = (props) => {
  let backgroundColor = "";

  if (props.disabled) {
    backgroundColor = "#72757e"
  } else {
    backgroundColor = "#7f5af0"
  }

  return (
    <B 
      style={{
        backgroundColor: backgroundColor
      }}
      onClick={props.onClick} 
      variant="contained" 
      startIcon={props.startIcon}
      disabled={props.disabled}
      className="toolbarButton">
      <p style={{
        color: "#fffffe"
      }}>
        {props.text}
      </p>
    </B>
  );
}

export const LoadingButton = (props) => {
  let backgroundColor = "";

  if (props.disabled) {
    backgroundColor = "#72757e"
  } else {
    backgroundColor = "#7f5af0"
  }

  return (
    <LB 
      style={{
        backgroundColor: backgroundColor
      }}
      disabled={props.disabled}
      loading={props.loading}
      onClick={props.onClick} 
      variant="contained" 
      startIcon={props.startIcon}
      loadingPosition="start"
      className="toolbarButton">
      <p style={{
        color: "#fffffe"
      }}>
        {props.text}
      </p>
    </LB>
  );
}