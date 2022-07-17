import PropTypes from 'prop-types'
import { MazeIcon } from '../icons/Icons'

import { createTheme, ThemeProvider } from '@mui/material'

const Header = ({ title }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#7f5af0',
      },
    },
  });

  return (
    <header>
      <div style={{
        display: "flex",
        alignItems: "center",
      }}>
        <ThemeProvider theme={theme}>
          <MazeIcon fontSize="large" color="primary"/>
        </ThemeProvider>
        <h1 style={{
          color: "#fffffe",
          marginLeft: "10px"
        }}>{title}</h1>
      </div>
    </header>
  )
}

Header.defaultProps = {
  title: 'Graph Search'
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header