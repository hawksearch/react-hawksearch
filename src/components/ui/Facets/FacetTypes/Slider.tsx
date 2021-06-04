import React from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import SliderDate from './SliderDate';
import SliderNumeric from './SliderNumeric';

function Slider() {
	const { facet } = useFacet();
	if (facet.DataType && facet.DataType === 'datetime') {
		return <SliderDate />;
	}
	return <SliderNumeric />;
}

export default Slider;
