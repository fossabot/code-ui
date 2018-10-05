import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GlobalBannerContainer from 'src/containers/globalBannerContainer'
import PageError from 'src/components/pageError'
import PageHomeContainer from 'src/containers/pageHomeContainer'
import PageFlowContainer from 'src/containers/pageFlowContainer'
import PageBlockContainer from 'src/containers/pageBlockContainer'
import PageTextContainer from 'src/containers/pageTextContainer'
import PageUserContainer from 'src/containers/pageUserContainer'
import PageMDContainer from 'src/containers/pageMDContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


const PageContainer = (props) => {
	const components = {
		home  : PageHomeContainer,
		flow  : PageFlowContainer,
		block : PageBlockContainer,
		text  : PageTextContainer,
		user  : PageUserContainer,
		md    : PageMDContainer,
	}
	const RefComponent = components[props.queryRef] || PageError
	return (
		<div className='root page'>
			<style jsx>{`
				.root {
					overflow-y: auto;
					-webkit-overflow-scrolling: touch;
					overscroll-behavior: none;
					display: flex;
					flex-direction: column;
					align-items: stretch;
				}
			`}</style>
			<GlobalBannerContainer />
			<RefComponent {...props}/>
		</div>
	)
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'home',
		'flow',
		'block',
		'text',
		'error',
		'user',
		'md'
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)
