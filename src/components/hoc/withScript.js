import React from 'react'
import Script from 'react-load-script'

const CACHE = {}

export default (scripts, Child, PreloadChild) => class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loaded : scripts.reduce((e, s) => e && CACHE[s], true)
		}
	}

	handleScriptLoad(script) {
		CACHE[script] = true
		this.setState({
			loaded : scripts.reduce((e, s) => e && CACHE[s], true)
		})
	}

	render() {
		const {
			loaded
		} = this.state

		if (loaded) {
			return <Child {...this.props}/>
		}

		const unloadedScripts = scripts.filter(script => !CACHE[script])

		return (
			<div className='root withScript'>
				{unloadedScripts.map((script, key) =>
					<Script
						key={key}
						url={script}
						onLoad={() => this.handleScriptLoad(script)}
					/>
				)}
				{PreloadChild &&
					<PreloadChild {...this.props}/>
				}
			</div>
		)
	}
}
