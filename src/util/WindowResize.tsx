import React, { useEffect, useState } from 'react';

const throttle = <T extends []>(callback: (..._: T) => void, wait: number): ((..._: T) => void) => {
	let timeout: NodeJS.Timeout | any;
	let lastArgs: T;
	const next = () => {
		timeout = clearTimeout(timeout) as undefined;
		callback(...lastArgs);
	};

	return (...args: T) => {
		lastArgs = args;

		if (timeout === void 0) {
			timeout = setTimeout(next, wait);
		}
	};
};

// Hook
export function useWindowSize() {
	const [windowSize, setWindowSize] = useState({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		const handleResize = throttle(() => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}, 600);

		// Add Resize event listener
		window.addEventListener('resize', handleResize);

		// Call handleResize event so state gets updated initially
		handleResize();

		// Remove event listener on cleanup
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}
