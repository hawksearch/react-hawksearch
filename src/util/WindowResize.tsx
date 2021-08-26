import React, { useEffect, useState } from 'react';

function throttle(func, timeout) {
	let ready: boolean = true;
	return (...args) => {
		if (!ready) {
			return;
		}

		ready = false;
		func(...args);
		setTimeout(() => {
			ready = true;
		}, timeout);
	};
}

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
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []); // Empty array ensures that effect is only run on mount

	return windowSize;
}
