import React from 'react';

import Results from './Results';
import Facets from './Facets';

function Search() {
	return (
		<>
			<Facets />
			<hr />
			<Results />
		</>
	);
}

export default Search;
