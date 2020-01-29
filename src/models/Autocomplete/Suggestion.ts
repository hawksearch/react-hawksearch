import { ControllerStateAndHelpers } from 'downshift';

export enum SuggestionType {
	Product = 'product',
	Category = 'category',
	Content = 'content',
	Popular = 'popular',
}
export abstract class Suggestion {
	public SuggestionType: SuggestionType;
	public constructor(suggestionType: SuggestionType) {
		this.SuggestionType = suggestionType;
	}
}

export interface SuggestionStrategy {
	handleItemChange(item: Suggestion, downshift: ControllerStateAndHelpers<Suggestion>): void;
	toString(item: Suggestion): string;
}

export interface SuggestionStrategyMatch {
	SuggestionType: SuggestionType;
	SuggestionStrategy: SuggestionStrategy;
}
