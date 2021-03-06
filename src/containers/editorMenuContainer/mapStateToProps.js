import { createStructuredSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import factoryCodeSelector from 'src/selectors/factoryCodeSelector'
import storageStatusSelector from 'src/selectors/storageStatusSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const mapStateToProps = () => createStructuredSelector({
	type               : refEditorTypeSelector(),
	id                 : refEditorIdSelector(),
	source             : refEditorSourceSelector(),
	name               : refEditorNameSelector(),
	safeName           : refEditorNameSelector(true),
	saved              : refEditorSavedSelector(),
	generatedCode      : refEditorGeneratedCodeSelector(),
	factoryCode        : factoryCodeSelector(),
	storageStatus      : storageStatusSelector(),
	placeholderName    : makeStringSelector('ui.editor.program_placeholder_name'),
	newFlowProgramUrl  : makeStringSelector('routes.flow'),
	newBlockProgramUrl : makeStringSelector('routes.block'),
	newTextProgramUrl  : makeStringSelector('routes.text'),
})

export default mapStateToProps
