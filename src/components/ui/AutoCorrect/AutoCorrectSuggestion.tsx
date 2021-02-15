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
				<div className="hawk-autocorrect-suggestion">
					<h3>Did you mean?</h3>
					{searchResults.DidYouMean.map((keyword: string, index: number) => (
						<span onClick={() => selectKeyword(keyword)} key={index}>
							{keyword}
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}

export default AutoCorrectSuggestion;
