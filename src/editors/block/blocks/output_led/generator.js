import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	parseInstacePropertyAssignment,
	setInstacePropertyOneTimeAssignment
} from '../../utils/parsing'

const generator = ({ value, next }, structure) => {
	const placeBlock = getValueBlockByAttributeName(value, 'PLACE')
	if (!placeBlock) {
		parseNext(next, structure)
		return
	}
	const place = getBlockBody(placeBlock, structure)
	const lightBlock = getValueBlockByAttributeName(value, 'LIGHT')
	if (!lightBlock) {
		parseNext(next, structure)
		return
	}
	const type = 'Led'
	const instance = computeInstanceName(structure, type, place)

	parseInstaceDefinition(structure, instance, type)
	setInstacePropertyOneTimeAssignment(structure, instance, 'place', place)
	setInstacePropertyOneTimeAssignment(structure, instance, 'light', '0')
	structure.body += '// Set LED light intensity:\n'
	parseInstacePropertyAssignment(lightBlock, structure, instance, 'light')

	parseNext(next, structure)
}

export default generator
