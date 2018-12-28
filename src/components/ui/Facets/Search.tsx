import React, { useState } from 'react';

import { useHawkSearch } from 'components/StoreProvider';
import { useFacet } from './Facet';

function Search() {
	const { store, actor: hawkActor } = useHawkSearch();
	const { facet, actor } = useFacet();

	const [input, setInput] = useState<string | undefined>(undefined);

	function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			setInput(undefined); // clear the user's entered value as we want to be driven by the store again

			actor.selectFacet(event.currentTarget.value);
		}
	}

	function clearFacet() {
		setInput(undefined); // clear the user's entered value as we want to be driven by the store again

		hawkActor.clearFacet(facet);
	}

	function getInputValue() {
		if (input !== undefined) {
			// if the user type an input, that's the value for the input
			return input;
		}

		// otherwise, use the value from the store
		return store.pendingSearch.SearchWithin || '';
	}

	return (
		<>
			<div className="hawk__facet-rail__facet-values">
				<div className="hawk__facet-rail__facet-values__search">
					<input
						value={getInputValue()}
						onChange={e => setInput(e.currentTarget.value)}
						onKeyDown={onKeyDown}
					/>
				</div>
			</div>

			<div className="hawk__facet-rail__facet-values__search-clear">
				<span onClick={clearFacet}>Clear</span>
			</div>
		</>
	);
}

export default Search;
