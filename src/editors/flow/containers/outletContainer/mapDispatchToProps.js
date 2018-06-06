import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setOutletTransferDragMethods,
} from 'src/editors/flow/actions'

export default autobindDispatchToActionCreators({
	setInstanceParameter,
	highlightInstanceParameterDropArea,
	setIsDraggingOutlet,
	setOutletTransferDragMethods,
})
