import { createStructuredSelector } from 'reselect'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'

const mapStateToProps = () => createStructuredSelector({
	name  : nodeNameSelector(),
	color : nodeColorSelector(),
	icon  : nodeIconSelector(),
})

export default mapStateToProps
