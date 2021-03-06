import { connect } from 'react-redux'
import Head from 'src/components/head'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const HeadContainer = (props) =>
	<Head {...props}/>

const headContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(HeadContainer)

export default headContainerConnected
