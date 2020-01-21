import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Spinner from 'src/components/spinner'
import plusIcon from 'src/assets/icons/general/plus.svg'
import debounce from 'src/utils/debounce'
import {
	GRAY,
	WHITE,
	BLUE
} from 'src/constants/colors'
import sortBlocklyDomNode from './utils/sortBlocklyDomNode'
import toolboxToXmlString from './utils/toolboxToXmlString'
import xmlToJson from './utils/xmlToJson'
import blocks from './blocks/index'
import toolbox from './toolbox'

class Container extends React.Component {
	constructor(props) {
		super(props)
		this.ref = React.createRef()
	}

	componentDidMount() {
		this.props.onMount(this.ref.current)
	}

	render() {
		return (
			<React.Fragment>
				<style jsx>{`
					.workspace {
						box-sizing: border-box;
						width: calc(100%);
						height: 100px;
					}
					.controls {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-bottom: 0.5rem;
					}
					.controls :global(> *) {
						margin: 0 0.25rem;
					}
				`}</style>
				<div className='controls'>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_number'
						onClick={this.props.onAddNumber}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_boolean'
						onClick={this.props.onAddBoolean}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_label'
						onClick={this.props.onAddLabel}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
				</div>
				<div className='workspace' ref={this.ref}/>
			</React.Fragment>
		)
	}
}

class BlockEditor extends React.Component {
	constructor(props) {
		super(props)
		this.mainWorkspaceContainer = React.createRef()
	}

	loadSource = (source) => {
		const {
			Blockly
		} = window
		this.mainWorkspace.clear()

		// important to sort the xml here, beacuse some sources may have the
		// "<variables>" node in the end, and that will cause a bug on blockly
		// once it loads it.
		const sourceXml = Blockly.Xml.textToDom(source)
		sortBlocklyDomNode(sourceXml)

		Blockly.Xml.domToWorkspace(
			sourceXml,
			this.mainWorkspace
		)
		// eslint-disable-next-line no-underscore-dangle
		this.mainWorkspace.refreshToolboxSelection_()
	}

	componentDidMount() {
		const {
			Blockly
		} = window

		const {
			strings,
			mediaPath
		} = this.props
		// Load the correct strings
		Blockly.Msg = strings['_scracth-blocks']

		// Load and register all blocks
		Object.keys(blocks).forEach(id => {
			const { definition } = blocks[id]
			if (definition) {
				Blockly.Blocks[id] = {
					/* eslint-disable-next-line object-shorthand,func-names */
					init : function () { this.jsonInit(definition(strings)) }
				}
			}
			delete Blockly.Blocks.data_showvariable
			delete Blockly.Blocks.data_hidevariable
			delete Blockly.Blocks.data_showlist
			delete Blockly.Blocks.data_hidelist
			delete Blockly.Blocks.data_listcontents
		})
		// Load toolbox
		const toolboxXmlString = toolboxToXmlString(toolbox(strings))
		const toolboxXml = Blockly.Xml.textToDom(toolboxXmlString)
		delete Blockly.Blocks.defaultToolbox

		// Setup workspace
		const { mainWorkspaceContainer } = this
		this.mainWorkspace = Blockly.inject(mainWorkspaceContainer.current, {
			toolbox : toolboxXml,
			media   : mediaPath,
			sounds  : false,
			zoom    : {
				controls   : true,
				wheel      : true,
				startScale : 0.66
			},
			trashcan : true,
			colours  : {
				scrollbar : 'rgba(0, 0, 0, 0.05)',
			}
		})
		window.workspace = this.mainWorkspace

		// HACK: as way to avoid spurious variables from being created at
		// random while moving blocks around.
		Blockly.FieldVariable.prototype.initModel = () => {}

		// Handle the source changes
		const {
			onSourceChange,
			refEditorSource
		} = this.props
		this.source = refEditorSource
		this.mainWorkspace.addChangeListener((e) => {
			// It seems that if we call .workspaceToDom on ALL changes, lots
			// of spurious variables are created. I could not single out what
			// is the offending event, but UI seems a obvious one to avoid.
			// Still, it's not 100% solid, so added a debounce, that seems to
			// solve the issue.
			if (e.type === 'ui') {
				return
			}
			this.cancelSourceUpdate = debounce('update block source', () => {
				try {
					const xml = Blockly.Xml.workspaceToDom(this.mainWorkspace)
					// it's importat to sort the node before comparing it, as
					// sometimes blockly will change the internal order of the Xml
					// nodes, causing the comparisson to be a false positive, and
					// that causes all sorts of problems
					sortBlocklyDomNode(xml)
					const currentSource = Blockly.Xml.domToText(xml)
					if (this.source !== currentSource) {
						this.source = currentSource
						onSourceChange(currentSource)
					}
				} catch (error) {
					console.log('Error handling blockly source', error)
				}
			}, 1000)
		})
		// Load the initial source
		this.loadSource(refEditorSource)

		// Override blockly alert
		this.originalBlocklyAlert = Blockly.alert
		Blockly.alert = (m, cb) => setTimeout(() => this.props.openAlert(m, cb), 0)
		// Override blockly confirm
		this.originalBlocklyConfirm = Blockly.confirm
		Blockly.confirm = (m, cb) => setTimeout(() => this.props.openConfirm(m, cb), 0)
		// Override blockly prompt
		this.originalBlocklyPrompt = Blockly.prompt
		Blockly.prompt = (m, d, cb) => setTimeout(() => this.props.openPrompt(m, d, cb), 0)

		const { DataCategory } = Blockly
		DataCategory.createValue = (valueName, type, value) =>
			`<value name="${valueName}">
				<shadow type="math_number">
				<field name="NUM">${value}</field>
				</shadow>
			</value>`
		DataCategory.addSetVariableTo = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_setvariableto', 'VARIABLE', ['VALUE', 'math_number', 0]
		)
		DataCategory.addAddToList = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_addtolist', 'LIST', ['ITEM', 'math_number', 0.5]
		)
		DataCategory.addInsertAtList = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_insertatlist', 'LIST', ['INDEX', 'math_integer', 1], ['ITEM', 'math_number', 0.5]
		)
		DataCategory.addReplaceItemOfList = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_replaceitemoflist', 'LIST', ['INDEX', 'math_integer', 1], ['ITEM', 'math_number', 0.5]
		)
		DataCategory.addItemNumberOfList = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_itemnumoflist', 'LIST', ['ITEM', 'math_number', 0.5]
		)
		DataCategory.addListContainsItem = (xmlList, variable) => DataCategory.addBlock(
			xmlList, variable, 'data_listcontainsitem', 'LIST', ['ITEM', 'math_number', 0.5]
		)


		// Handle custom blocks creation
		this.proceduresMutationRoot = null
		this.proceduresCallback = null

		// HACK start ----------------------------------------------------------
		/* So this is massive hack to enable us to to know if the
		 * `externalProcedureDefCallback` is being called to "create" or to
		 * "edit" a block. There is a nasty edge case where if there is an
		 * existing block named "block name" (the default name of a procedure),
		 * and we try to create a new block, it becomes impossible to determine
		 * if we are editing or crating a new one.
		 * This hack works by hijacking the function that calls
		 * `externalProcedureDefCallback` and setting a flag in this scope.
		 * Then, inside `externalProcedureDefCallback` we can check for this
		 * flag to decide if it's a new procedure or not.
		 */
		// eslint-disable-next-line no-underscore-dangle
		this.originalBlocklyCreateProcedureDefCallback_ = Blockly.Procedures.createProcedureDefCallback_
		const proceduresFlags = {}
		// eslint-disable-next-line no-underscore-dangle,func-names
		Blockly.Procedures.createProcedureDefCallback_ = (workspace) => {
			proceduresFlags.isNew = true
			// eslint-disable-next-line no-underscore-dangle
			this.originalBlocklyCreateProcedureDefCallback_(workspace)
		}
		// HACK end ------------------------------------------------------------

		Blockly.Procedures.externalProcedureDefCallback = async (mutation, cb) => {
			// Figure out if this is a new procedure or if we are editing an
			// existing one.
			// HACK start ----------------------
			const isNew = proceduresFlags.isNew === true
			delete proceduresFlags.isNew
			// HACK end -------------------------

			const setup = (container) => {
				if (this.proceduresWorkspace) {
					this.proceduresWorkspace.dispose()
				}
				this.proceduresWorkspace = Blockly.inject(container, {
					media : mediaPath,
					zoom  : {
						startScale : 0.66
					},
					colours : {
						scrollbar : 'rgba(0, 0, 0, 0)',
					},
					scrollbars : true
				})
				this.proceduresWorkspace.addChangeListener(() => {
					if (this.proceduresMutationRoot) {
						this.proceduresMutationRoot.onChangeFn()
					}
				})
				this.proceduresCallback = cb
				this.proceduresWorkspace.clear()
				this.proceduresMutationRoot = this.proceduresWorkspace.newBlock('procedures_declaration')
				this.proceduresMutationRoot.translate(20, 45)
				// this.proceduresMutationRoot.setMovable(false)
				this.proceduresMutationRoot.domToMutation(mutation)
				this.proceduresMutationRoot.initSvg()
				this.proceduresMutationRoot.render(false)
			}

			this.props.openDialog(
				{
					titleKey        : isNew ? 'block.procedures.title' : 'block.procedures.edit.title',
					confirmLabelKey : isNew ? 'block.procedures.confirm' : 'block.procedures.edit.confirm',
					onConfirm       : () => {
						// Extract the proceure mutation (the actual data that
						// create/modify a procedure).
						const procedureMutation = this.proceduresMutationRoot.mutationToDom(true)
						// Extract the procedureCode (will be used as the id
						// of the procedure).
						const procedureCode = this.proceduresMutationRoot.getProcCode()
						// Check if procedureCode is empty. If so, cancel early
						if (!procedureCode) {
							this.proceduresCallback = null
							this.proceduresMutationRoot = null
							this.proceduresWorkspace.clear()
							// eslint-disable-next-line no-underscore-dangle
							this.mainWorkspace.refreshToolboxSelection_()
							return
						}
						// Check if there is any procedure with the same
						// proccode. If so, cancel.
						const procedureSource = xmlToJson(Blockly.Xml.workspaceToDom(this.mainWorkspace))
						const existingProcedure =
							procedureSource &&
							procedureSource.BLOCK &&
							procedureSource.BLOCK.filter(block =>
								block.attributes &&
								block.attributes.type === 'procedures_definition'
							).filter(block =>
								block.STATEMENT &&
								block.STATEMENT[0] &&
								block.STATEMENT[0].SHADOW &&
								block.STATEMENT[0].SHADOW[0] &&
								block.STATEMENT[0].SHADOW[0].MUTATION &&
								block.STATEMENT[0].SHADOW[0].MUTATION[0] &&
								block.STATEMENT[0].SHADOW[0].MUTATION[0].attributes &&
								block.STATEMENT[0].SHADOW[0].MUTATION[0].attributes.proccode &&
								block.STATEMENT[0].SHADOW[0].MUTATION[0].attributes.proccode === procedureCode
							).pop()
						const existingProcedureArgumentIds = JSON.parse((
							existingProcedure &&
							existingProcedure.STATEMENT &&
							existingProcedure.STATEMENT[0] &&
							existingProcedure.STATEMENT[0].SHADOW &&
							existingProcedure.STATEMENT[0].SHADOW[0] &&
							existingProcedure.STATEMENT[0].SHADOW[0].MUTATION &&
							existingProcedure.STATEMENT[0].SHADOW[0].MUTATION[0] &&
							existingProcedure.STATEMENT[0].SHADOW[0].MUTATION[0].attributes &&
							existingProcedure.STATEMENT[0].SHADOW[0].MUTATION[0].attributes.argumentids
						) || '[]')
						const originalMutationArgumentIds = JSON.parse(mutation.getAttribute('argumentids'))
						if (
							// Creating a new block and it already exists a
							// block with the same proccode.
							(
								isNew &&
								existingProcedure
							) ||
							// Editing a existing block and it already exists a
							// block with the same proccode. The existing
							// block and the one being edited don't have the
							// same number of arguments, so they are certainly
							// not the same.
							(
								!isNew &&
								existingProcedure &&
								existingProcedureArgumentIds.length !==
								originalMutationArgumentIds.length
							) ||
							// Editing a existing block and it already exists a
							// block with the same proccode. The existing
							// block and the one being edited have some
							// arguments, but their id's don't match, so they
							// are not the same.
							(
								!isNew &&
								existingProcedure &&
								existingProcedureArgumentIds.length &&
								existingProcedureArgumentIds.join() !==
								originalMutationArgumentIds.join()
							) ||
							// This is the ambiguos case.
							// Editing a existing block and it already exists a
							// block with the same proccode. The existing
							// block and the one being edited don't have
							// arguments, but their id's don't match, so they
							// are not the same.
							(
								!isNew &&
								existingProcedure &&
								!existingProcedureArgumentIds.length &&
								!originalMutationArgumentIds.length
							)
						) {
							// If we got here, it means the new procedure will
							// clash with an existing one. At this point, the
							// only thing to do is to cancel and give a warning.
							this.proceduresCallback = null
							this.proceduresMutationRoot = null
							this.proceduresWorkspace.clear()
							// eslint-disable-next-line no-underscore-dangle
							this.mainWorkspace.refreshToolboxSelection_()
							// Show warning that block was not created
							setTimeout(() => this.props.openDialog({
								descriptionKey : 'block.procedures.error.existing.description',
								displayCancel  : false,
								limitWidth     : true
							}), 0)
							return
						}

						// Make sure all the arguments have unique names (by
						// adding a counter increment to the name)
						const argumentNames = JSON.parse(procedureMutation.getAttribute('argumentnames'))
						if (argumentNames.length) {
							const nameHash = {}
							const uniqueArgumentNames = argumentNames.map(name => {
								if (typeof nameHash[name] === 'undefined') {
									nameHash[name] = 1
									return name
								}
								nameHash[name]++
								return `${name}${nameHash[name]}`
							})
							procedureMutation.setAttribute('argumentnames', JSON.stringify(uniqueArgumentNames))
						}
						procedureMutation.setAttribute('exists', 'true')
						this.proceduresCallback(procedureMutation)
						this.proceduresCallback = null
						this.proceduresMutationRoot = null
						this.proceduresWorkspace.clear()
						// eslint-disable-next-line no-underscore-dangle
						this.mainWorkspace.refreshToolboxSelection_()
					},
					onCancel : () => {
						this.proceduresCallback = null
						this.proceduresMutationRoot = null
						this.proceduresWorkspace.clear()
						// eslint-disable-next-line no-underscore-dangle
						this.mainWorkspace.refreshToolboxSelection_()
					}
				},
				<Container
					onMount={setup}
					onAddNumber={() => this.proceduresMutationRoot.addStringNumberExternal()}
					onAddBoolean={() => this.proceduresMutationRoot.addBooleanExternal()}
					onAddLabel={() => this.proceduresMutationRoot.addLabelExternal()}
				/>
			)
		}
	}

	componentWillUnmount() {
		const {
			Blockly
		} = window

		if (this.cancelSourceUpdate) {
			this.cancelSourceUpdate()
		}
		this.mainWorkspace.dispose()

		// restore procedures HACK
		/* eslint-disable no-underscore-dangle */
		if (this.originalBlocklyCreateProcedureDefCallback_) {
			Blockly.Procedures.createProcedureDefCallback_ = this.originalBlocklyCreateProcedureDefCallback_
			delete this.originalBlocklyCreateProcedureDefCallback_
		}
		/* eslint-enable no-underscore-dangle */

		// restore blockly alert
		if (this.originalBlocklyAlert) {
			Blockly.alert = this.originalBlocklyAlert
			delete this.originalBlocklyAlert
		}
		// restore blockly confirm
		if (this.originalBlocklyConfirm) {
			Blockly.confirm = this.originalBlocklyConfirm
			delete this.originalBlocklyConfirm
		}
		// restore blockly prompt
		if (this.originalBlocklyPrompt) {
			Blockly.prompt = this.originalBlocklyPrompt
			delete this.originalBlocklyPrompt
		}
	}

	componentDidUpdate() {
		const { refEditorSource } = this.props
		const { source } = this
		if (refEditorSource !== source) {
			this.loadSource(refEditorSource)
		}
	}

	render() {
		return (
			<div className='root editor block'>
				<style jsx>{`
					.root {
						position: relative;
						width: 100%;
						height: 100%;
					}
					.workspace  {
						position: absolute;
						width: 100%;
						height: 100%;
						background-color: ${tinycolor(WHITE).toRgbString()};
					}
					.workspace :global(.blocklyFlyout) {
						border: solid 1px rgba(0,0,0,0.1);
						border-top: none;
						border-bottom: none;
					}
					.procedures {
						position: fixed;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						background-color: ${tinycolor(GRAY).setAlpha(0.5)};
					}
				`}</style>
				<div
					className='workspace'
					ref={ this.mainWorkspaceContainer }
				/>
			</div>
		)
	}
}

BlockEditor.propTypes = {
	mediaPath       : PropTypes.string,
	strings         : PropTypes.object,
	refEditorSource : PropTypes.string,
	onSourceChange  : PropTypes.func,
	openDialog      : PropTypes.func,
	openAlert       : PropTypes.func,
	openConfirm     : PropTypes.func,
	openPrompt      : PropTypes.func,
}

const BlockEditorWithStrings = (props) => {
	// as the editor breaks if the correct strings are not in place,
	// we need to make sure they are loaded before diplaying it
	if (!props.strings) {
		return <Spinner />
	}
	return (
		<BlockEditor {...props}/>
	)
}
export default BlockEditorWithStrings

// after finding numerous bugs with blockly remounting, decided to skip the
// dynamic loading of the script file and just load blockly on the <head>
// instead, like a normal script...
// const BlockEditorWithScript = ({
// 	scriptPath,
// 	...props
// }) => {
// 	const Editor = withScript(
// 		[scriptPath],
// 		BlockEditorWithStrings,
// 		Spinner
// 	)
// 	return <Editor {...props}/>
// }
// export default BlockEditorWithScript
