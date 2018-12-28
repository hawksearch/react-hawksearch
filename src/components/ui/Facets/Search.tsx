import React, { useState } from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from './Facet';

function Search() {
	const { actor: hawkActor } = useHawkSearch();
	const { facet, actor } = useFacet();

	const [input, setInput] = useState('');

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			actor.selectFacet(input);
		}
	}

	function clearFacet() {
		hawkActor.clearFacet(facet);
	}

	return (
		<>
			<div className="hawk__facet-rail__facet-values">
				<div className="hawk__facet-rail__facet-values__search">
					<input value={input} onChange={e => setInput(e.currentTarget.value)} onKeyDown={onKeyDown} />
				</div>
			</div>

			<div className="hawk__facet-rail__facet-values__search-clear">
				<span onClick={clearFacet}>Clear</span>
			</div>
		</>
	);
}

export default Search;
