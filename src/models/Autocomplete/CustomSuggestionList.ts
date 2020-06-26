import { DownshiftProps, ControllerStateAndHelpers } from 'downshift';
import { ResponseProps } from './Response';
import { Suggestion } from './Suggestion';

export interface CustomSuggestionListProps {
	downshift: DownshiftProps<object>;
	searchResults: ResponseProps;
	onViewMatches: (downshift: ControllerStateAndHelpers<Suggestion>) => void;
	isLoading: boolean;
}
