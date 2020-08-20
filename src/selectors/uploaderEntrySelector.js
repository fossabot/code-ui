import { createSelector } from 'reselect'
import uploaderEntitiesSelector from 'src/selectors/uploaderEntitiesSelector'
import hashCode from 'src/utils/hashCode'

const selector = () => createSelector(
	[
		uploaderEntitiesSelector(),
		(state, { hex, runtimeId }) => hashCode(`${hex}${runtimeId}`),
	],
	(
		compilerEntities,
		id,
	) => compilerEntities[id]
)

export default selector
