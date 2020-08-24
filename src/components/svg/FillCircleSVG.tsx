import * as React from 'react';

interface FillCircleSVGProps {
	class: string;
}

/**
 * FillCirclemark SVG
 *
 * @returns
 */
function FillCircleSVG(props: FillCircleSVGProps) {
	return (
		<svg viewBox="0 0 32 32" className={'icon ' + props.class} focusable="false" aria-hidden="true">
			<circle cx="15" cy="15" r="15" />
		</svg>
	);
}

export default FillCircleSVG;
