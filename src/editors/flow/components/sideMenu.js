import PropTypes from 'prop-types'
import Toggle from 'src/editors/flow/components/toggle'
import CategoryMenuContainer from 'src/editors/flow/containers/categoryMenuContainer'
import tinycolor from 'tinycolor2'
import { GRAY } from 'src/constants/colors'

const SideMenu = ({
	setDisplayAdancedNodes,
	displayAdvancedNodes,
	categoryIds,
}) =>
	<div className='root sideMenu'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-items: center;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				box-sizing: border-box;
				border-right: solid 0.4rem ${tinycolor(GRAY).lighten(20).toRgbString()};
				min-height: 0;
				min-width: 0;
				user-select: none;
			}
			.root :global(>*:nth-child(1)) {
				min-height: 2rem;
				margin: 0.5rem;
			}

			.root :global(>*:nth-child(2)) {
				/*overflow-y: auto;*/
				flex-grow: 1;
				margin-left: 0.5rem;
				padding-right: 0.5rem;
			}
			.categoryMenus {
				overflow-y: auto;
			}
			.categoryMenus :global(>*) {
				margin-bottom: 0.5rem;
				position: relative;
			}
			@media (max-width: 600px) {
				.root :global(>.toggle) {
					padding: 0.2rem;
					margin: 0.5rem 0.2rem;
				}
				.root :global(>.toggle .label) {
					display: none;
				}
			}
		`}</style>
		<Toggle
			on={displayAdvancedNodes}
			onChange={setDisplayAdancedNodes}
			offLabel='flow.menu.toggle.simple'
			onLabel='flow.menu.toggle.advanced'
		/>
		<span className='categoryMenus'>
			{categoryIds && categoryIds.map(id =>
				<CategoryMenuContainer key={id} id={id} />
			)}
		</span>
	</div>

SideMenu.propTypes = {
	setDisplayAdancedNodes : PropTypes.func,
	displayAdvancedNodes   : PropTypes.bool,
	categoryIds            : PropTypes.arrayOf(PropTypes.string),
}

export default SideMenu
