import s from 'src/utils/s'

const definition = (strings) => ({
	message0 : '%1',
	args0    : [
		{
			type : 'field_label_serializable',
			name : 'VALUE'
		}
	],
	output          : 'Boolean',
	colour          : '#FF6680',
	colourSecondary : '#FF4D6A',
	colourTertiary  : '#FF3355',
	outputShape     : window.Blockly.OUTPUT_SHAPE_HEXAGONAL
})

export default definition
