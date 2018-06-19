export default (type) => {
	switch (type) {
		case 'flow':
			return []
		case 'scratch':
			return '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="event_power_on" id="rootblock" deletable="false" x="50" y="50"></block></xml>'
		case 'text':
			return '#include "Quirkbot.h"\n\nvoid setup(){\n\t\n}\n\nvoid loop(){\n\t\n}'
		default:
			return null
	}
}
