import {
	BP2,
	BP4,
} from './core/constants'
import {
	Node,
	Input,
	Output,
	HasInterval
} from './CommonNodeIncludes'

export const QB_IR_PROXIMITY_OUTPUT_PIN = BP4
export const QB_IR_PROXIMITY_INPUT_PIN = BP2
export const QB_IR_PROXIMITY_MAX = 120

export class IRProximity extends HasInterval(Node) {
	nodeType = 'IRProximity'

	constructor(...args) {
		super(...args)

		this.registerInput(this.min)
		this.registerInput(this.max)

		this.min.set(0)
		this.max.set(1)
		this.interval.set(0.05)
	}

	destructor() {
		super.destructor()
	}

	onInterval() {
		if (this.externalData) {
			this.out.set(this.Bot.map(this.externalData.value, 0, QB_IR_PROXIMITY_MAX, this.this.min.get(), this.max.get()))
		}
	}

	min = new Input()

	max = new Input()

	out = new Output()

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			min      : this.min.get(),
			max      : this.max.get(),
			out      : this.out.get(),
		}
	}
}
