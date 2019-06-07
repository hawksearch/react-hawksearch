import * as React from 'react';

interface XCircleSVGProps {
	class?: string;
}

/**
 * X Circle SVG
 *
 * @returns
 */
function XCircleSVG(props: XCircleSVGProps) {
	return (
		<svg
			viewBox="0 0 32 32"
			className={'icon icon-help-header ' + props.class}
			focusable="false"
			aria-hidden="true"
		>
			<path
				fill="#d9534f"
				d="M15.998 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16v0c0-8.837 7.163-16 16-16v0z"
			/>
			<path
				fill="#fff"
				d="M13.6 11.646l7.171 7.171c0.541 0.541 0.541 1.417 0 1.958l0.002-0.002c-0.541 0.541-1.417 0.541-1.958 0l-7.171-7.171c-0.541-0.541-0.541-1.417 0-1.958l-0.002 0.002c0.541-0.541 1.417-0.541 1.958 0z"
			/>
			<path
				fill="#fff"
				d="M20.774 13.6l-7.174 7.174c-0.54 0.54-1.415 0.54-1.955 0l-0.002-0.002c-0.54-0.54-0.54-1.415 0-1.955l7.174-7.174c0.54-0.54 1.415-0.54 1.955 0l0.002 0.002c0.54 0.54 0.54 1.415 0 1.955z"
			/>
		</svg>
	);
}

export default XCircleSVG;
