import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
//import { useWindowSize } from '@react-hook/window-size';
import { useWindowSize } from 'util/WindowResize';

function StickyComponent({ children }: { children: React.ReactElement[] }) {
	//const [width] = useWindowSize();
	const size = useWindowSize();

	if (size.width > 767) {
		return <>{children}</>;
	} else {
		const header = children.filter(child => child.props.className === 'header'); // Extract header
		const body = children.filter(child => child.props.className !== 'header'); // Extract body
		return (
			<StickyContainer>
				<Sticky>
					{({ style, isSticky }) => (
						<header
							className={'sticky-carousel hawk-facet-rail ' + (isSticky ? 'sticky' : '')}
							style={style}
						>
							{header}
						</header>
					)}
				</Sticky>
				{body}
			</StickyContainer>
		);
	}
}

export default StickyComponent;
