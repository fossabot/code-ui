import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import rawNodes from 'src/editors/flow/data/nodes.json'
import rawCategories from 'src/editors/flow/data/categories.json'
import rawConstants from 'src/editors/flow/data/constants.json'
import Editor from 'src/editors/flow/components/editor'
import SourceSyncManager from 'src/editors/flow/containers/sourceSyncManager'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class EditorContainer extends React.Component {
	constructor(props) {
		super(props)
		const {
			setNodeDefinitions,
			setCategoryDefinitions,
			setConstantDefinitions,
		} = props
		setNodeDefinitions(rawNodes)
		setCategoryDefinitions(rawCategories)
		setConstantDefinitions(rawConstants)
	}

	render() {
		return (
			<React.Fragment>
				<SourceSyncManager/>
				<Editor/>
			</React.Fragment>
		)
	}
}

EditorContainer.propTypes = {
	setNodeDefinitions     : PropTypes.func,
	setCategoryDefinitions : PropTypes.func,
	setConstantDefinitions : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorContainer)
