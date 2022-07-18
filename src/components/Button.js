import {Button as B} from '@mui/material'
import {LoadingButton as LB} from '@mui/lab'

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

export const LoadingButton = (props) => {
  return (
    <LB 
      style={{
        backgroundColor: "#7f5af0"
      }}
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