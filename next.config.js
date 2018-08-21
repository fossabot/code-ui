const routes = require('./static/routes')

const configMode = process.env.CONFIG || 'dev'
const publicRuntimeConfig = {
	dev : {
		CANONICAL_URL          : 'http://localhost:3000',
		COMPILER_URL           : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api.quirkbot.com',
		GAID                   : 'UA-69443341-6',
	},
	stage : {
		CANONICAL_URL          : 'https://code-stage.strawbees.com',
		COMPILER_URL           : 'https://compiler-stage.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api-stage.quirkbot.com',
		GAID                   : 'UA-69443341-6',
	},
	production : {
		CANONICAL_URL          : 'https://code.strawbees.com',
		COMPILER_URL           : 'https://compiler.quirkbot.com',
		STRAWBEES_CODE_API_URL : 'https://api.quirkbot.com',
		GAID                   : 'XXXXXXXXXXXX',
	}
}
// eslint-disable-next-line no-console
console.log('Using config -> ', process.env.CONFIG || 'dev')

module.exports = {
	exportPathMap             : () => routes,
	publicRuntimeConfig       : publicRuntimeConfig[configMode],
	useFileSystemPublicRoutes : false,
}
