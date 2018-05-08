import { connect } from 'react-redux'
import VisualToTextEditor from 'src/components/editors/visualToText'
import FlowEditor from 'src/components/editors/flow'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageFlowContainer = (props) =>
	<VisualToTextEditor
		VisualEditor={FlowEditor}
		{...props}
	/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageFlowContainer)
