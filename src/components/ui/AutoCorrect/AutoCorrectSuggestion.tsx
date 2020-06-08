import React, { useState } from 'react';
import { useHawkSearch } from 'components/StoreProvider';

function AutoCorrectSuggestion() {
	const {
		store: { searchResults },
		actor: hawkActor,
	} = useHawkSearch();
	function selectKeyword(keyword: string) {
		hawkActor.setSearch({
			Keyword: keyword,
		});
	}
	return (
		<div className="hawk-autocorrect-suggestion-container">
			{searchResults && searchResults.DidYouMean ? (
				<ul className="hawk-autocorrect-suggestion">
					<h3>Did you mean?</h3>
					{searchResults.DidYouMean.map((keyword: string, index: number) => (
						<li onClick={() => selectKeyword(keyword)} key={index}>
							{keyword}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
}

export default AutoCorrectSuggestion;
