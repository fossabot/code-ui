const path = require('path')
const rmdir = require('../utils/rmdir')
const mkdir = require('../utils/mkdir')
const cpdir = require('../utils/cpdir')
const modulePath = require('../utils/modulePath')

module.exports = async () => {
	await rmdir('static/lib/nprogress.css')
	await cpdir(
		path.join(modulePath('nprogress'), 'nprogress.css'),
		'static/lib/nprogress.css'
	)
	await rmdir('static/lib/scratch-blocks')
	await mkdir('static/lib/scratch-blocks/media')
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'media'),
		'static/lib/scratch-blocks/media'
	)
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'dist', 'web', 'vertical.js'),
		'static/lib/scratch-blocks/vertical.js'
	)
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'blockly_compressed_vertical.js'),
		'static/lib/scratch-blocks/blockly.js'
	)
	await cpdir(
		path.join(modulePath('scratch-blocks'), 'blocks_compressed_vertical.js'),
		'static/lib/scratch-blocks/blocks.js'
	)
}
