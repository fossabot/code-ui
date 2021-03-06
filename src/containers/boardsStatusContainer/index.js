import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import BoardsStatus from 'src/components/boardsStatus'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const BoardsStatusContainer = (props) =>
	<BoardsStatus {...props}/>

BoardsStatusContainer.propTypes = {
	scale : PropTypes.number,
}

const boardsStatusContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(BoardsStatusContainer)

export default boardsStatusContainerConnected
