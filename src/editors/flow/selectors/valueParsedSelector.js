import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'
import instanceIconSelector from 'src/editors/flow/selectors/instanceIconSelector'
import instanceNameSelector from 'src/editors/flow/selectors/instanceNameSelector'
import baseConstantDefinitionsSelector from 'src/editors/flow/selectors/baseConstantDefinitionsSelector'
import propsValueSelector from 'src/editors/flow/selectors/propsValueSelector'
import stateSelector from 'src/editors/flow/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import icons from 'src/editors/flow/assets/icons'

export default () => createSelector(
	[
		sourceSelector(),
		baseConstantDefinitionsSelector(),
		propsValueSelector(),
		stateSelector(),
	],
	(
		source,
		constants,
		value,
		state,
	) => {
		if (typeof value === 'undefined') {
			return null
		}
		// Convert value to string
		value = value.toString()
		let result
		// Check if it is a constant
		const getConstant = () => {
			const id = constants[value]
			if (!id) {
				return null
			}
			return {
				type    : 'CONSTANT',
				display : makeStringSelector(`flow.constant.${id}`)(state),
				code    : value,
				icon    : icons.constants[id]
			}
		}
		result = getConstant()
		if (result) {
			return result
		}
		// Check if it is a outlet
		const getOutlet = () => {
			// Can we parse a instance.outlet?
			const valueArray = value.split('.')
			if (valueArray.length !== 2) {
				return null
			}
			const [instanceId, outletId] = valueArray
			// Find the instance
			const instance = source.filter(({ id }) => id === instanceId).pop()
			if (!instance) {
				return null
			}
			// Find the outlet
			const outletIds = instanceOutletIdsSelector()(state, { id : instanceId })
			if (outletIds.indexOf(outletId) === -1) {
				return null
			}
			// Ok! valid connection
			return {
				type    : 'OUTLET',
				display : `${instanceNameSelector()(state, { id : instanceId })}.${outletId}`,
				code    : `${instanceNameSelector()(state, { id : instanceId })}.${outletId}`,
				icon    : instanceIconSelector()(state, { id : instanceId })
			}
		}
		result = getOutlet()
		if (result) {
			return result
		}
		// Check if it is a number
		const getNumber = () => {
			let text = parseFloat(value)
			// basic check
			// eslint-disable-next-line no-self-compare
			if ((/* cross browser isNaN -> */ text !== text) ||
				!Number.isFinite(text)) {
				return null
			}
			// aestetics cleanup (remove trailing '0's)
			if (text % 1 === 0) {
				text.toFixed(0)
			} else {
				text = text.toFixed(3)
				while (text[text.length - 1] === '0') {
					text = text.slice(0, -1)
				}
			}
			return {
				type    : 'NUMBER',
				display : text,
				code    : text,
				icon    : null
			}
		}
		result = getNumber()
		if (result) {
			return result
		}
		// Return default
		return null
	}
)
