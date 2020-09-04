import {
	DISCONNECTED
} from './core/constants'
import {
	Node,
	Input
} from './CommonNodeIncludes'

export class Led extends Node {
	nodeType = 'Led'

	constructor(Bot, id) {
		super(Bot, id)

		this.registerInput(this.light)
		this.registerInput(this.place)

		this.light.set(1)
		this.place.set(DISCONNECTED)
	}

	destructor() {
		super.destructor()
	}

	light = new Input()

	place = new Input()

	report() {
		return {
			nodeType : this.nodeType,
			id       : this.id,
			light    : this.light.get(),
			place    : this.place.get(),
		}
	}
}

export default Led
