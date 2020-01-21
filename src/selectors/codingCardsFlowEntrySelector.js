import { createSelector } from 'reselect'
import codingCardsFlowFormatedEntitiesSelector from 'src/selectors/codingCardsFlowFormatedEntitiesSelector'

export default () => createSelector(
	[
		(_, props) => props && props.id,
		codingCardsFlowFormatedEntitiesSelector(),
	],
	(
		id,
		codingCardsFlowFormatedEntities,
	) => codingCardsFlowFormatedEntities && codingCardsFlowFormatedEntities[id]
)
