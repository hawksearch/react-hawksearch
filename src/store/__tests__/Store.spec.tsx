import React, { useEffect } from 'react';
import { CancelToken } from 'axios';
import TestRenderer from 'react-test-renderer';

import { useHawkState } from 'store/HawkState';
import HawkClient from 'net/HawkClient';
import { Request, Response } from 'models/Search';
import ConfigProvider from 'components/ConfigProvider';

jest.mock('net/HawkClient');
const HawkClientMock = HawkClient as jest.Mock<HawkClient>;

const searchMock = jest.fn(
	(request: Request, cancellationToken?: CancelToken): Promise<Response> => {
		const response = {
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
					SortBy: 'name',
					ExpandSelection: false,
					IsNumeric: false,
					IsCurrency: false,
					IsCollapsible: true,
					IsCollapsedDefault: false,
					IsVisible: true,
					IsSearch: false,
					ScrollHeight: 100,
					ScrollThreshold: 200,
					TruncateThreshold: 200,
					SearchThreshold: 200,
					AlwaysVisible: true,
					SortOrder: 1,
					NofVisible: 10,
					SwatchData: [],
					FacetRangeDisplayType: 100,
					PreloadChildren: true,
					ShowSliderInputs: false,
					Ranges: [],
					Values: [],
				},
			],
			Pagination: {
				CurrentPage: 0,
				Items: [],
				MaxPerPage: 24,
				NofPages: 1,
				NofResults: 1,
			},
			Sorting: {
				Items: [],
			},
			DidYouMean: ['test'],
			Keyword: request.Keyword || '',
			SearchDuration: 100,
			Selections: {},
		};

		return Promise.resolve<Response>(new Response((response as unknown) as Response));
	}
);

HawkClientMock.mockImplementation(() => {
	return ({
		baseUrl: '',
		search: searchMock,
		autocomplete: jest.fn(),
	} as unknown) as HawkClient;
});

describe('Store', () => {
	it('performs a search', async done => {
		let searchPromise;

		// arrange
		function StoreComponent() {
			const [store, actor] = useHawkState();

			// act
			useEffect(() => {
				actor.setSearch({
					Keyword: 'this is my keyword',
				});

				searchPromise = actor.search();
			}, []);

			return <div>{JSON.stringify(store, null, 2)}</div>;
		}

		function TestedComponent() {
			return (
				<ConfigProvider config={{ clientGuid: '123' }}>
					<StoreComponent />
				</ConfigProvider>
			);
		}

		const renderer = TestRenderer.create(<TestedComponent />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<TestedComponent />);

		await searchPromise;

		// assert
		expect(searchMock).toHaveBeenCalledWith(
			expect.objectContaining({ Keyword: 'this is my keyword' }),
			expect.anything()
		);
		expect(renderer.toJSON()).toMatchSnapshot();

		done();
	});
});
