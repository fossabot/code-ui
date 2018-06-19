import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import { BLUE } from 'src/constants/colors'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import LocalesMenuContainer from 'src/containers/localesMenuContainer'
import EditorMenuContainer from 'src/containers/editorMenuContainer'
import logoIcon from 'src/assets/icons/logos/strawbeesCode.svg'
import logoCompactIcon from 'src/assets/icons/logos/strawbeesCodeCompact.svg'

const Header = ({
	editorMenu,
	homeUrl,
	flowUrl,
	scratchUrl,
	textUrl
}) =>
	<div className='root header'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				background-color: ${tinycolor(BLUE).setAlpha(0.5).toRgbString()};
				position: relative;
				width: 100%;
				padding: 0 1rem;
			}
			.root .editor {
				flex: 1;
				height: 100%;
			}
			.root .editor :global(>*){
				height: 100%;
			}
			.root .logo :global(>.svgIcon) {
				width: 10rem;
				height: 2rem;
			}
			.root .logo-compact :global(>.svgIcon) {
				display: none;
				height: 2.5rem;
				width: 3.5rem;
			}
			.root .logo :global(>.svgIcon),
			.root .logo-compact :global(>.svgIcon) {
				margin-right: 1rem;
			}
			@media (max-width: 600px) {
				.root {
					padding: 0 0.5rem;
				}
				.root .logo :global(>.svgIcon) {
					display: none;
				}
				.root .logo-compact :global(>.svgIcon) {
					display: inherit;
				}
			}
		`}</style>

		<Link to={homeUrl}>
			<div className='logo'>
				<SvgIcon icon={logoIcon} />
			</div>
			<div className='logo-compact'>
				<SvgIcon icon={logoCompactIcon} />
			</div>
		</Link>

		<div className='editor'>
			{editorMenu &&
				<EditorMenuContainer />
			}
		</div>
		<LocalesMenuContainer />
	</div>

Header.propTypes = {
	editorMenu : PropTypes.bool,
	homeUrl    : PropTypes.string,
	flowUrl    : PropTypes.string,
	scratchUrl : PropTypes.string,
	textUrl    : PropTypes.string,
}

export default Header
