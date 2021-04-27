import React, { useEffect, useState } from 'react';
import { useHawksearch } from '../StoreProvider';

interface LanguageSelectorProps {
	title: string;
	facetName?: string;
	languages: Array<{ value: string; label: string }>;
}

function LanguageSelector({ title, languages, facetName }: LanguageSelectorProps) {
	const {
		store: { pendingSearch },
		actor,
	} = useHawksearch();
	const [selectedValue, setValue] = useState('sl');

	useEffect(() => {
		if (facetName) {
			const languageFacet = ((pendingSearch || {}).FacetSelections || {})[facetName];

			if (languageFacet) {
				setValue(languageFacet[0]);
			}
		}
	}, [pendingSearch.FacetSelections]);

	function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
		if (facetName) {
			actor.setSearch({
				FacetSelections: { [facetName]: [event.currentTarget.value] },
			});
		}
	}

	return (
		<div className="hawk-language">
			<span className="hawk-language__label">{title}</span>

			<select value={selectedValue} onChange={onChange}>
				{[{ value: 'sl', label: title }].concat(languages).map(language => (
					<option
						key={language.value}
						value={language.value}
						selected={selectedValue === language.value}
						disabled={language.value === 'sl'}
					>
						{language.label}
					</option>
				))}
			</select>
		</div>
	);
}

export default LanguageSelector;
