import React from 'react'
import { connect } from 'react-redux'
import RemoteStorage from 'remotestoragejs'
import RemoteStorageDocuments from 'remotestorage-module-documents'
import RemoteStorageWidget from 'remotestorage-widget'
import { registerRemoteStorage } from 'src/utils/storage'
import debounce from 'src/utils/debounce'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class StorageManager extends React.Component {
	componentDidMount() {
		const {
			setReady,
			// setPrograms,
			addProgram,
			updateProgram,
			removeProgram,
			removeAllPrograms
		} = this.props

		RemoteStorageDocuments.name = 'strawbeescode'
		const rs = new RemoteStorage({
			changeEvents : {
				local     : true,
				window    : true,
				remote    : true,
				conflicts : true
			},
			// logging : true,
			modules : [RemoteStorageDocuments]
		})
		registerRemoteStorage(rs)
		rs.setApiKeys({
			dropbox     : 'zd6wx3xxewwjdf5',
			googledrive : '797731471383-guaj6k58h14fp8g787o210m533m5scng.apps.googleusercontent.com'
		})
		rs.access.claim('strawbeescode', 'rw')
		rs.caching.enable('/strawbeescode/')
		const client = rs.strawbeescode.privateList('programs')
		client.on('change', ({ newValue, oldValue, relativePath }) => {
			const data = { ...newValue }
			delete data['@context']
			const id = relativePath
			if (newValue && !oldValue) {
				addProgram({ id, data })
			} else if (!newValue && oldValue) {
				removeProgram({ id })
			} else if (newValue && oldValue) {
				updateProgram({ id, data })
				// // programs can update *very* frequently (like when dragging a
				// // node around), so we wanna debounce this call
				// debounce(
				// 	`StorageManager.update.${id}`,
				// 	() => updateProgram({ id, data }),
				// 	1000
				// )
			}
		})

		// hookup to storage actions
		rs.on('ready', async () => {
			setReady(true)
		})
		rs.on('disconnected', () => {
			// remove all programs
			removeAllPrograms()
			// mark the storage as not ready
			setReady(false)
		})
		const widget = new RemoteStorageWidget(rs, {
			leaveOpen : true
		})
		widget.attach('remotestorage-widget-container')
	}

	render() {
		return null
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageManager)
