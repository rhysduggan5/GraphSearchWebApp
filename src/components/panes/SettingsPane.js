import { Edit } from '@mui/icons-material'

import { ThemeProvider, 
  ToggleButtonGroup, 
  Typography, 
  ToggleButton, 
  FormGroup, 
  FormControlLabel, 
  Checkbox,
  Radio,
  Grid as MaterialGrid,
  Slider,
  FormControl,
  FormLabel,
  RadioGroup } from '@mui/material'

import { WeightIcon, EraserIcon } from '../../icons/Icons'


export const SettingsPane = (props) => {

  return (
    <MaterialGrid
      item
      xs={2}
      style={{
        backgroundColor: "#16161a",
        padding: "15px",
        marginRight: "10px",
        marginBottom: "10px",
        borderRadius: "15px",
        height: "fit-content",
        minWidth: "220px"
      }}>
      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <ThemeProvider theme={props.theme}>
          <ToggleButtonGroup
            value={props.tool}
            aria-label="text formatting"
            exclusive
            onChange={(_, tool) => {
              props.setTool(tool)
            }}
            style={{ marginRight: "10px" }}
            size="small"
          >
            <ToggleButton sx={{
              color: "#72757e"
            }} color="primary" value="pen" aria-label="pen">
              <Edit />
            </ToggleButton>
            <ToggleButton sx={{
              color: "#72757e"
            }} color="primary" value="heavypen" aria-label="heavypen">
              <WeightIcon />
            </ToggleButton>
            <ToggleButton sx={{
              color: "#72757e"
            }} color="primary" value="eraser" aria-label="eraser">
              <EraserIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </ThemeProvider>
      </div>
      <br />
      <FormGroup>
        <FormControlLabel className="secondaryText" control={
          <Checkbox sx={{
            color: "#72757e",
            '&.Mui-checked': {
              color: "#7f5af0",
            },
          }} checked={props.animate} onChange={
            (_, value) => props.setAnimate(value)
          } defaultChecked />
        } label={
          <p style={{ color: "#94a1b2" }}>
            Animate
          </p>
        } />
      </FormGroup>
      <br />
      <FormControl>
        <FormLabel id="algo-selection" style={{
          color: "#fffffe"
        }}>Search Algorithm</FormLabel>
        <br />
        <RadioGroup
          row
          aria-labelledby="algorithm-selection"
          name="algorithm-selection"
          defaultValue="breadthfirstsearch"
          onChange={(_, value) => { props.setSearch(value) }}>
          <FormControlLabel value="breadthfirstsearch" control={
            <Radio sx={{
              color: "#72757e",
              '&.Mui-checked': {
                color: "#7f5af0",
              },
            }} />
          } label={
            <p style={{ color: "#94a1b2" }}>Breadth First Search</p>
          } />
          <FormControlLabel className="secondaryText" value="depthfirstsearch" control={
            <Radio sx={{
              color: "#72757e",
              '&.Mui-checked': {
                color: "#7f5af0",
              },
            }} />
          } label={
            <p style={{ color: "#94a1b2" }}>Depth First Search</p>
          } />
          <FormControlLabel className="secondaryText" value="bestfirstsearch" control={
            <Radio sx={{
              color: "#72757e",
              '&.Mui-checked': {
                color: "#7f5af0",
              },
            }} />
          } label={
            <p style={{ color: "#94a1b2" }}>Best First Search</p>
          } />
          <FormControlLabel className="secondaryText" value="astarsearch" control={
            <Radio sx={{
              color: "#72757e",
              '&.Mui-checked': {
                color: "#7f5af0",
              },
            }} />
          } label={
            <p style={{ color: "#94a1b2" }}>A* Search</p>
          } />
        </RadioGroup>
        <br />
      </FormControl>

      <br />

      <FormControl>
        <FormLabel id="algo-selection" style={{
          color: "#fffffe"
        }}>Maze Generation Algorithm</FormLabel>
        <br />
        <RadioGroup
          row
          aria-labelledby="maze-algorithm-selection"
          name="maze-algorithm-selection"
          defaultValue="prim"
          onChange={(_, value) => { props.setMazeAlgorithm(value) }}>
          <FormControlLabel value="prim" control={
            <Radio sx={{
              color: "#72757e",
              '&.Mui-checked': {
                color: "#7f5af0",
              },
            }} />
          } label={
            <p style={{ color: "#94a1b2" }}>Prim</p>
          } />
        </RadioGroup>
        <br />
      </FormControl>

      <br />

      <Typography variant="h6" style={{
        color: "#fffffe"
      }}>X size</Typography>
      <ThemeProvider theme={props.theme}>
        <Slider color="primary" onChange={props.updateXSize} min={2} max={50} valueLabelDisplay="auto" aria-label="x-slider" defaultValue={props.columns} />
      </ThemeProvider>

      <Typography variant="h6" style={{
        color: "#fffffe"
      }}>Y size</Typography>
      <ThemeProvider theme={props.theme}>
        <Slider color="primary" onChange={props.updateYSize} min={2} max={50} valueLabelDisplay="auto" aria-label="y-slider" defaultValue={props.rows} />
      </ThemeProvider>
    </MaterialGrid>
  );
}