import { sanitizeCPPVariableName } from 'src/utils/string'
import {
	parseNext,
	parseInstaceDefinition,
} from '../../utils/simulatorParsing'

const generator = ({ field, next }, structure) => {
	const name = sanitizeCPPVariableName(`list_${field && field[0]}`)
	if (!name) {
		parseNext(next, structure)
		return
	}
	parseInstaceDefinition(structure, name, 'Vector')

	structure.body += `/* length of list */ ${name}.size()`

	parseNext(next, structure)
}

export default generator
