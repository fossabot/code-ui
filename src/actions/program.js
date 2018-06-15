import Router from 'next/router'
import { compileCode } from 'src/actions/compiler'
import {
	setFlowName,
	setFlowSource,
	setFlowId,
	setFlowProgram,

	setScratchName,
	setScratchSource,
	setScratchId,
	setScratchProgram,

	setTextName,
	setTextSource,
	setTextId,
	setTextProgram
} from 'src/actions/editor'
import {
	openModal,
	openDialogModal
} from 'src/actions/modal'
import {
	addProgram,
	getProgram,
	updateProgramName,
	updateProgramSource,
	removeProgram
} from 'src/utils/storage'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import formatedProgramSelector from 'src/selectors/formatedProgramSelector'
import editorSelector from 'src/selectors/editorSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'
import FormInput from 'src/components/formInput'
import S from 'src/containers/sManager'
import UploadAreaContainer from 'src/containers/uploadAreaContainer'

export const resetEditorProgramByType = (type) => (dispatch) => {
	const program = {
		id     : null,
		name   : null,
		source : generateNewProgramSource(type)
	}
	if (type === 'flow') {
		dispatch(setFlowProgram(program))
	} else if (type === 'scratch') {
		dispatch(setScratchProgram(program))
	} else if (type === 'text') {
		dispatch(setTextProgram(program))
	}
}
export const resetCurrentEditorProgram = () => (dispatch, getState) => {
	const state = getState()
	const type = refEditorTypeSelector()(state)
	dispatch(resetEditorProgramByType(type))
}
export const saveCurrentEditorProgram = () => async (dispatch, getState) => {
	const state = getState()
	const name = refEditorNameSelector()(state)
	const source = refEditorSourceSelector()(state)
	const type = refEditorTypeSelector()(state)
	const { id } = await addProgram(type, name, source)
	if (type === 'flow') {
		dispatch(setFlowId(id))
	} else if (type === 'scratch') {
		dispatch(setScratchId(id))
	} else if (type === 'text') {
		dispatch(setTextId(id))
	}
}
export const updateCurrentEditorProgramName = (name) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector()(state)
	const type = refEditorTypeSelector()(state)
	const saved = refEditorSavedSelector()(state)
	if (type === 'flow') {
		dispatch(setFlowName(name))
	} else if (type === 'scratch') {
		dispatch(setScratchName(name))
	} else if (type === 'text') {
		dispatch(setTextName(name))
	}
	if (saved) {
		await updateProgramName(id, name)
	}
}
export const updateCurrentEditorProgramSource = (source) => async (dispatch, getState) => {
	const state = getState()
	const id = refEditorIdSelector()(state)
	const type = refEditorTypeSelector()(state)
	const saved = refEditorSavedSelector()(state)
	if (type === 'flow') {
		dispatch(setFlowSource(source))
	} else if (type === 'scratch') {
		dispatch(setScratchSource(source))
	} else if (type === 'text') {
		dispatch(setTextSource(source))
	}
	if (saved) {
		await updateProgramSource(id, source)
	}
}
export const duplicateProgramById = (id, newName) => async (dispatch) => {
	const program = await getProgram(id)
	dispatch(duplicateProgramData(program, newName))
}
export const duplicateProgramData = (program, newName) => async () => {
	const { type, source } = program
	await addProgram(
		type,
		newName,
		source
	)
}
export const removeProgramByIdAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = await getProgram(id)
	await removeProgram(id)
	const editorId = editorSelector()(state)[type].id
	if (editorId === id) {
		dispatch(resetEditorProgramByType(type))
	}
}
export const openProgramByIdAndGoToEditor = (id) => async (dispatch) => {
	const { type, name, source } = await getProgram(id)
	const program = {
		id,
		type,
		name,
		source
	}
	dispatch(openProgramDataAndGoToEditor(program))
}
export const openProgramDataAndGoToEditor = (program) => (dispatch, getState) => {
	const state = getState()
	const editorUrl = makeStringSelector(`${program.type}.url`)(state)
	const { href, as } = resolveLinkUrl(editorUrl)
	href.query.program = JSON.stringify(program)
	// Router.push(href, `${as}/${program.id}`)
	Router.push(href, as)
}

// Modal actions
export const modalRemoveProgram = (id) => async (dispatch) => {
	dispatch(openDialogModal(
		<S value='modal.program.remove-confirmation'/>,
		{
			confirmLabelKey : 'ui.editor.remove',
			onConfirm       : () => dispatch(removeProgramByIdAndClearEditor(id))
		}
	))
}
export const modalDuplicateProgramById = (id) => async (dispatch, getState) => {
	const state = getState()
	const { name } = formatedProgramSelector()(state, { id })

	let newName = `${name} copy`
	dispatch(openDialogModal(
		<FormInput
			defaultValue={newName}
			labelKey={'modal.program.duplicate-confirmation'}
			onChange={e => newName = e}
		/>,
		{
			confirmLabelKey : 'ui.editor.duplicate',
			onConfirm       : () => dispatch(duplicateProgramById(id, newName))
		}
	))
}
export const modalDuplicateProgramData = (program) => async (dispatch) => {
	const { name } = program

	let newName = `${name} copy`
	dispatch(openDialogModal(
		<FormInput
			defaultValue={newName}
			labelKey={'modal.program.duplicate-confirmation'}
			onChange={e => newName = e}
		/>,
		{
			confirmLabelKey : 'ui.editor.duplicate',
			onConfirm       : () => dispatch(duplicateProgramData(program, newName))
		}
	))
}
export const modalUploadCode = (code) => async (dispatch) => {
	dispatch(compileCode(code))
	dispatch(openModal(
		<UploadAreaContainer
			code={code}
		/>
	))
}
