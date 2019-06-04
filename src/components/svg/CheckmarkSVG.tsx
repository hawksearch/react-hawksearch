import * as React from 'react';

interface CheckmarkSVGProps {
	class: string;
}

/**
 * Checkmark SVG
 *
 * @returns
 */
function CheckmarkSVG(props: CheckmarkSVGProps) {
	return (
		<svg viewBox="0 0 32 32" className={'icon ' + props.class} focusable="false" aria-hidden="true">
			<path d="M27 4l-15 15-7-7-5 5 12 12 20-20z" />
		</svg>
	);
}

export default CheckmarkSVG;
