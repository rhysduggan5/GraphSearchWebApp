import PropTypes from 'prop-types'

const Header = ({ title }) => {
  return (
    <header>
      <h1 style={{
        color: "#fffffe"
      }}>{title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title: 'Graph Searcher'
}

Header.propTypes = {
  title: PropTypes.string,
}

export default Header