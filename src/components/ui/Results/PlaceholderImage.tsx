import React from 'react';
import PlaceHolderSVG from 'components/svg/PlaceholderSVG';

export interface PlaceholderImageProps {
	/** Whether or not to display a spinner in the center of the placeholder. */
	showSpinner: boolean;
}

function PlaceholderImage({ showSpinner }: PlaceholderImageProps) {
	return (
		<div className="hawk-results__item-placeholder">
			<PlaceHolderSVG class="hawk-placeholderSVG" />
		</div>
	);
}

export default PlaceholderImage;
