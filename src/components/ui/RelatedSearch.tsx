import React from 'react';
import { useHawksearch } from 'components/StoreProvider';

function RelatedSearch() {
	const {
		actor: hawkActor,
		store: { searchResults },
	} = useHawksearch();
	const relatedFacet = searchResults && searchResults.Facets.find(facet => facet.FacetType === 'related');

	function searchWithKeyword(keyword) {
		hawkActor.setSearch({
			Keyword: keyword,
		});
	}

	if (!relatedFacet) {
		return null;
	}
	return (
		<>
			<div className="hawk-related_search-container">
				<span className="heading">Related Searches: </span>
				{relatedFacet.Values.map((item, index) => (
					<span key={index} onClick={() => searchWithKeyword(item.Value)} className="related-searched-words">
						{' '}
						{item.Label} {index < relatedFacet.Values.length - 1 && <>|</>}
					</span>
				))}
			</div>
		</>
	);
}

export default RelatedSearch;
