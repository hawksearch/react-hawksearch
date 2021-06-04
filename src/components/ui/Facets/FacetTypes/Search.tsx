import React, { useState } from 'react';

import { useHawksearch } from 'components/StoreProvider';
import { useFacet } from 'components/ui/Facets/Facet';
import { useTranslation } from 'react-i18next';

function Search() {
	const { store, actor: hawkActor } = useHawksearch();
	const { facet, actor } = useFacet();

	const [input, setInput] = useState<string | undefined>(undefined);

	const { t, i18n } = useTranslation();

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
		return decodeURIComponent(store.pendingSearch.SearchWithin || '');
	}

	return (
		<>
			<div className="hawk-facet-rail__facet-values">
				<div className="hawk-facet-rail__facet-values__search">
					<input
						value={getInputValue()}
						onChange={e => setInput(e.currentTarget.value)}
						onKeyDown={onKeyDown}
					/>
				</div>
			</div>
			{store.pendingSearch.SearchWithin && (
				<div className="hawk-facet-rail__facet-values__search-clear">
					<button className="link-button" onClick={clearFacet}>
						{t('Clear')}
					</button>
				</div>
			)}
		</>
	);
}

export default Search;
