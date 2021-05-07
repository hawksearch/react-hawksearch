import React from 'react';
import { useHawksearch } from 'components/StoreProvider';

function RelatedSearch() {
	const {
		actor: hawkActor,
		store: { searchResults },
	} = useHawksearch();
	const relatedFacet = searchResults && searchResults.Facets.find(facet => facet.FacetType === 'related');
	console.log(relatedFacet);

	function searchWithKeyword(keyword) {
		hawkActor.setSearch({
			Keyword: keyword,
		});
	}
	return (
		<>
			{relatedFacet && (
				<div className="hawk-related_search-container">
					<span className="heading">Related Searches: </span>
					{relatedFacet.Values.map((item, index) => {
						console.log(index, relatedFacet.Values.length);
						return (
							<span
								key={index}
								onClick={() => searchWithKeyword(item.Value)}
								className="related-searched-words"
							>
								{' '}
								{item.Label} {index < relatedFacet.Values.length - 1 && <>|</>}
							</span>
						);
					})}
				</div>
			)}
		</>
	);
}

export default RelatedSearch;
