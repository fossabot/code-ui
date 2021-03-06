import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ParameterHandle from 'src/editors/flow/components/parameterHandle'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ParameterHandleContainer = (props) =>
	<ParameterHandle {...props} />

ParameterHandleContainer.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
}

const parameterHandleContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ParameterHandleContainer)

export default parameterHandleContainerConnected
