import {
	parseNext,
	getBlockBody,
	getValueBlockByAttributeName,
	computeInstanceName,
	parseInstaceDefinition,
	setInstacePropertyOneTimeAssignment,
	parseInstacePropertyAssignmentFromValue,
} from '../../utils/simulatorParsing'

const generator = ({ value, next }, structure) => {
	const keyBlock = getValueBlockByAttributeName(value, 'KEY')
	if (!keyBlock) {
		parseNext(next, structure)
		return
	}
	const key = getBlockBody(keyBlock, structure)

	const type = 'KeyPress'
	const instance = computeInstanceName(structure, type, key)

	parseInstaceDefinition(structure, instance, type)

	setInstacePropertyOneTimeAssignment(structure, instance, 'key', key)

	structure.body += '// Quickly tap a key:\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 1)
	structure.body += 'await pt.Sleep(100);\n'
	parseInstacePropertyAssignmentFromValue(structure, instance, 'trigger', 0)

	parseNext(next, structure)
}

export default generator