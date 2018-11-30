import React, { useEffect, useState } from 'react';
import TestRenderer from 'react-test-renderer';

import { useHawkState } from 'store/Store';
import HawkClient from 'net/HawkClient';
import { SearchResult, SearchRequest, Facet } from 'models';

jest.mock('net/HawkClient');
const HawkClientMock = HawkClient as jest.Mock<HawkClient>;

const searchMock = jest.fn(
	(request: SearchRequest): Promise<SearchResult> => {
		return Promise.resolve({
			Success: true,
			Results: [
				{
					DocId: '123',
					Document: { a: ['b'] },
					Score: 1.0,
				},
			],
			Facets: [
				{
					FacetId: 123,
					Name: '123',
					Field: '123',
					FieldType: 'search',
					FacetType: 'checkbox',
					DisplayType: 'default',
					MaxCount: 10,
					MinHitCount: 1,
				} as Facet,
			],
			Pagination: {},
			DidYouMean: ['test'],
			Keyword: request.Keyword || '',
			SearchDuration: 100,
			Selections: [],
		});
	}
);

HawkClientMock.mockImplementation(() => {
	return {
		search: searchMock,
	};
});

describe('Store', () => {
	it('performs a search', async done => {
		let searchPromise;

		// arrange
		function StoreComponent() {
			const [store, storeMutator] = useHawkState();

			// act
			useEffect(() => {
				searchPromise = storeMutator.search('this is my keyword');
			}, []);

			return <div>{JSON.stringify(store)}</div>;
		}

		const renderer = TestRenderer.create(<StoreComponent />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<StoreComponent />);

		searchPromise.then(() => {
			// assert
			expect(searchMock).toHaveBeenCalledWith(expect.objectContaining({ Keyword: 'this is my keyword' }));
			expect(renderer.toJSON()).toMatchSnapshot();

			done();
		});
	});
});
