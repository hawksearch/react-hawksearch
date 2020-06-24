import React from 'react';
import { useHawksearch } from 'components/StoreProvider';
import ToolRow from 'components/ui/Results/ToolRow';
import ResultListing from 'components/ui/Results/ResultListing';
import Selections from 'components/ui/Facets/Selections';
import { default as DefaultResultItem, ResultItemProps } from 'components/ui/Results/ResultItem';
import SearchResultsLabel from 'components/ui/Facets/SearchResultsLabel';
import { useTranslation } from 'react-i18next';

export interface ResultsProps {
	ResultItem?: React.ComponentType<ResultItemProps>;
}

function Results({ ResultItem = DefaultResultItem }: ResultsProps) {
	const {
		store: { isLoading, searchResults, requestError },
	} = useHawksearch();

	const { t, i18n } = useTranslation();

	if (requestError) {
		return <span>An error occurred while searching for your results. Please contact the site administrator.</span>;
	}

	// end of overrides
	if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
		return <span>{t('No Results')}</span>;
	}

	return (
		<div className="hawk-results">
			<SearchResultsLabel />
			<Selections />

			<div className="hawk-results__top-tool-row">
				<ToolRow />
			</div>

			<ResultListing ResultItem={ResultItem} />

			<div className="hawk-results__bottom-tool-row">
				<ToolRow />
			</div>
		</div>
	);
}

export default Results;
