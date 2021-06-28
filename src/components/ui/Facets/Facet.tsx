import React, { useContext, useState, useRef, MouseEvent } from 'react';
import { useCookies } from 'react-cookie';
import { Facet as FacetModel, Value } from 'models/Facets';
import { useHawksearch } from 'components/StoreProvider';
import PlusSVG from 'components/svg/PlusSVG';
import MinusSVG from 'components/svg/MinusSVG';
import QuestionmarkSVG from 'components/svg/QuestionmarkSVG';

const FacetContext = React.createContext({} as FacetContextValue);

import { useTranslation } from 'react-i18next';

export interface FacetProps {
	facet: FacetModel;
	children: React.ReactNode;
}

interface FacetContextValue {
	facet: FacetModel;
	state: FacetState;
	actor: FacetActor;
	renderer: FacetRenderer;
}

export interface FacetState {
	facetValues: Value[];
	filter: string;
	isTruncated: boolean;
	isCollapsed: boolean;
	remainingFacets: number;
	decimalPrecision: number;
}

export interface FacetActor {
	selectFacet(facetValue: Value | string): void;
	negateFacet(facetValue: Value | string): void;
	setFacets(facetValues: Value[] | string[]): void;
	setFilter(filter: string): void;
	setTruncated(truncated: boolean): void;
	setCollapsed(collapsed: boolean): void;
}

export interface FacetRenderer {
	renderTruncation();
}

function getInitialCollapsibleState(facet: FacetModel, cookies: { [key: string]: string }) {
	const cookieValue = cookies[facet.Field];
	if (cookieValue !== undefined) {
		return cookieValue === 'true'
	}
	return facet.IsCollapsible && facet.IsCollapsedDefault;
}

function Facet({ facet, children }: FacetProps) {
	const { actor: searchActor } = useHawksearch();
	const wrapperRef = useRef<HTMLInputElement>(null);
	const [filter, setFilter] = useState('');
	const [isTruncated, setTruncated] = useState(facet.shouldTruncate);
	const [cookies, setCookie] = useCookies([facet.Field]);
	const [isCollapsed, setCollapsed] = useState(getInitialCollapsibleState(facet, cookies));
	const { t, i18n } = useTranslation();

	function selectFacet(facetValue: Value | string): void {
		setFilter('');
		searchActor.toggleFacetValue(facet, facetValue);
	}

	function setFacets(values: Value[] | string[]): void {
		setFilter('');
		searchActor.setFacetValues(facet, values);
	}

	function negateFacet(facetValue: Value | string): void {
		setFilter('');
		searchActor.toggleFacetValue(facet, facetValue, /* negate */ true);
	}

	function renderTruncation() {
		return (
			<>
				{facet.shouldTruncate && !filter && (
					<button onClick={() => actor.setTruncated(!isTruncated)} className="hawk-facet-rail__show-more-btn">
						{isTruncated ? `(+) Show ${remainingFacets} More` : '(-) Show Less'}
					</button>
				)}
			</>
		);
	}

	let facetValues = facet.Values;

	if (facet.shouldSearch && filter) {
		facetValues = facet.Values.filter(val => {
			if (!val.Label) {
				return false;
			}
			return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
		});
	}

	let remainingFacets = 0;

	if (facet.shouldTruncate && isTruncated) {
		const valuesBeforeTrunc = facetValues.length;

		facetValues = facetValues.slice(0, facet.TruncateThreshold);

		remainingFacets = valuesBeforeTrunc - facet.TruncateThreshold;
	}

	const actor: FacetActor = {
		selectFacet,
		negateFacet,
		setFacets,
		setFilter,
		setTruncated,
		setCollapsed,
	};

	const state: FacetState = {
		facetValues,
		filter,
		isTruncated,
		isCollapsed,
		remainingFacets,
		decimalPrecision: 2,
	};

	const renderer: FacetRenderer = {
		renderTruncation,
	};

	function toggleCollapsible(event: MouseEvent) {
		if (wrapperRef.current && wrapperRef.current.contains(event.target as Node)) {
			return;
		}
		setCookie(facet.Field, !isCollapsed);
		setCollapsed(!isCollapsed);
	}

	return (
		<FacetContext.Provider value={{ facet, state, actor, renderer }}>
			<div className="hawk-facet-rail__facet">
				<div className="hawk-facet-rail__facet-heading" onClick={event => toggleCollapsible(event)}>
					<h4>{facet.Name}</h4>
					{facet.Tooltip && (
						<div className="custom-tooltip" ref={wrapperRef}>
							<QuestionmarkSVG class="hawk-questionmark" />
							<div className="right">
								<div dangerouslySetInnerHTML={{ __html: facet.Tooltip }} />
								<i />
							</div>
						</div>
					)}
					{isCollapsed ? (
						<>
							<PlusSVG /> <span className="visually-hidden">Expand facet category</span>{' '}
						</>
					) : (
						<>
							<MinusSVG /> <span className="visually-hidden">Collapse facet category</span>
						</>
					)}
				</div>

				{!isCollapsed && (
					<div className="hawk-facet-rail__facet-body">
						{facet.shouldSearch && (
							<div className="hawk-facet-rail__facet__quick-lookup">
								<input
									value={filter}
									onChange={e => setFilter(e.currentTarget.value)}
									type="text"
									placeholder={t('Quick Lookup')}
								/>
							</div>
						)}

						{/* render listing component */}
						{children}
					</div>
				)}
			</div>
		</FacetContext.Provider>
	);
}

export function useFacet() {
	return useContext(FacetContext);
}

export default Facet;
