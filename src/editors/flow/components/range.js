import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { GRAY, BLACK, WHITE, YELLOW } from 'src/constants/colors'

class Range extends React.Component {
	constructor(props) {
		super(props)
		this.input = React.createRef()
	}
	onKeyDown = (e) => {
		if (e.keyCode !== 13) {
			return
		}
		if (this.props.blurOnEnter) {
			this.input.current.blur()
		}
	}
	render() {
		const {
			onKeyDown
		} = this
		const {
			value,
			onChange,
			min,
			max,
			step,
		} = this.props

		return (
			<div className='root range'>
				<style jsx>{`
					.root {
						height: 1.25rem;
						position: relative;
						background-color: ${tinycolor(WHITE).toRgbString()};
						display: flex;
						flex-direction: column;
					}
					.container {
						height: 100%;
						margin: 0 0.25rem;
						position: relative;
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					.container .track {
						position: absolute;
						width: calc(100% - 1.25rem);
						box-sizing: border-box;
						height: 0.25rem;
						background-color: ${tinycolor(GRAY).lighten(20).toRgbString()};
						margin: 0 0.625rem;
						border-radius: 0.5rem;
					}
					.container .progress {
						position: absolute;
						height: 100%;
						width: ${Math.min(100 * ((value - min) / (max - min)), 100)}%;
						background-color: ${tinycolor(YELLOW).darken(5).toRgbString()};
						border-radius: 0.5rem;
					}
					input[type=range] {
						position: absolute;
						-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
						width: 100%; /* Specific width is required for Firefox. */
						background: transparent; /* Otherwise white in Chrome */
						margin: 0;
					}

					input[type=range]:focus {
						outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
					}
					input[type=range]::-webkit-slider-thumb {
						-webkit-appearance: none;
						border: none;
						height: 1rem;
						width: 1rem;
						border-radius: 1rem;
						background: ${tinycolor(BLACK).toRgbString()};
						cursor: pointer;
						margin-top: 0;
					}
					input[type=range]::-moz-range-thumb {
						border: none;
						height: 1rem;
						width: 1rem;
						border-radius: 1rem;
						background: ${tinycolor(BLACK).toRgbString()};
						cursor: pointer;
						margin-top: 0;
					}
					input[type=range]::-ms-thumb {
						border: none;
						height: 1rem;
						width: 1rem;
						border-radius: 1rem;
						background: ${tinycolor(BLACK).toRgbString()};
						cursor: pointer;
						margin-top: 0;
					}
					input[type=range]:focus::-webkit-slider-thumb{
						border: solid 0.1rem ${tinycolor(YELLOW).darken(5).toRgbString()};
					}

					input[type=range]::-webkit-slider-runnable-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-moz-range-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-ms-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-ms-fill-lower {
						background: rgba(0,0,0,0);
						border: none;
					}
					input[type=range]::-ms-fill-upper {
						background: rgba(0,0,0,0);
						border: none;
					}
				`}</style>
				<div className='container'>
					<div className='track'>
						<div className='progress'></div>
					</div>
					<input
						type='range'
						ref={this.input}
						min={min}
						max={max}
						step={step}
						value={value}
						onKeyDown={onKeyDown}
						onChange={(e) => onChange(e.target.value)}
					/>
				</div>
			</div>
		)
	}
}


Range.defaultProps = {
	min  : 0,
	max  : 1,
	step : 0.01
}

Range.propTypes = {
	min         : PropTypes.number,
	max         : PropTypes.number,
	step        : PropTypes.number,
	value       : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange    : PropTypes.func,
	blurOnEnter : PropTypes.bool,
}

export default Range
