//
// this file acts as the entry point for bundling the hawk components as an ES module
//

import 'styles/app.scss';

export { default as tConfig } from 'util/i18n';

// context providers
export { default as HawkSearch } from 'components/HawkSearch';
export { default as ConfigProvider } from 'components/ConfigProvider';
export { default as StoreProvider } from 'components/StoreProvider';

// search boxes
export { default as GlobalSearchBox } from 'components/ui/SearchBox/GlobalSearchBox';
export { default as SearchBox } from 'components/ui/SearchBox/SearchBox';

// facets
export { default as FacetRail } from 'components/ui/Facets/FacetRail';
export { default as FacetList } from 'components/ui/Facets/FacetList';
export { default as Facet } from 'components/ui/Facets/Facet';
export { default as Selections } from 'components/ui/Facets/Selections';
export { default as SearchResultsLabel } from 'components/ui/Facets/SearchResultsLabel';
export * from 'components/ui/Facets/FacetTypes';
export { FacetType } from 'models/Facets/FacetType';
export { FacetSelectionState } from 'store/Store';

// results (tools)
export { default as Sorting } from 'components/ui/Results/Tools/Sorting';
export { default as Pagination } from 'components/ui/Results/Tools/Pagination';

// results
export { default as Results } from 'components/ui/Results/Results';
export { default as ResultListing } from 'components/ui/Results/ResultListing';
export { default as ResultImage } from 'components/ui/Results/ResultImage';
export { default as ToolRow } from 'components/ui/Results/ToolRow';
export { ContentType } from 'models/Search/ContentType';
export { RuleType, RuleOperatorType } from 'models/Search/Rule';
export * from 'models/Autocomplete/Suggestion';
export { default as PlaceholderItem } from 'components/ui/Results/PlaceholderItem';
export { default as Spinner } from 'components/ui/Spinner';

// hooks
export { useHawkSearch } from 'components/StoreProvider';
export { useFacet } from 'components/ui/Facets/Facet';

// utils
export { default as QueryStringListener } from 'components/QueryStringListener';
export * from 'util/QueryString';

export { default as Auth } from 'components/Auth';