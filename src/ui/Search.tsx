import React from 'react';

import Results from './Results';
import Facets from './Facets';
import SearchBox from './SearchBox';

function Search() {
	return (
		<>
			<div style={{ display: 'flex', flexFlow: 'row wrap' }}>
				<div style={{ flex: '0 0 100%' }}>
					<SearchBox />
				</div>
				<div style={{ width: '300px' }}>
					<Facets />
				</div>
				<div style={{}}>
					<Results />
				</div>
			</div>
		</>
	);
}

export default Search;
