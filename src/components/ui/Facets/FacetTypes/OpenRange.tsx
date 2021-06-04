import React, { useState } from 'react';
import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import OpenRangeDatetime from './OpenRangeDatetime';
import OpenRangeNumber from './OpenRangeNumber';

function OpenRange() {
	const { facet } = useFacet();

	if (facet.DataType && facet.DataType === 'datetime') {
		return <OpenRangeDatetime />;
	}

	return <OpenRangeNumber />;
}

export default OpenRange;
