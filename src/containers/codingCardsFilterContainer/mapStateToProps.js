import { createStructuredSelector } from 'reselect'
import codingCardsHardwareIdsSelector from 'src/selectors/codingCardsHardwareIdsSelector'
import codingCardsFlowFilterIdsSelector from 'src/selectors/codingCardsFlowFilterIdsSelector'
import codingCardsBlockFilterIdsSelector from 'src/selectors/codingCardsBlockFilterIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	filterIds      : codingCardsHardwareIdsSelector(),
	flowFilterIds  : codingCardsFlowFilterIdsSelector(),
	blockFilterIds : codingCardsBlockFilterIdsSelector(),
})

export default mapStateToProps
