import React, { useEffect } from 'react';
import TestRenderer from 'react-test-renderer';

import { useMergableState } from 'util/MergableState';

describe('MergableState', () => {
	it('sets initial state', () => {
		// arrange
		function MergableState() {
			const [state] = useMergableState({
				initial: 'state',
			});

			return <div>{JSON.stringify(state)}</div>;
		}
		const renderer = TestRenderer.create(<MergableState />);

		// act & assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});

	it('merges new state', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState({
				initial: 'state',
			} as any);

			// act
			useEffect(() => {
				setState({
					otherState: 'other value',
				});
			}, []);

			return <div>{JSON.stringify(state)}</div>;
		}

		const renderer = TestRenderer.create(<MergableState />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<MergableState />);

		// assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});

	it('merges new state with function pattern', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState({
				initial: 'state',
			} as any);

			// act
			useEffect(() => {
				setState(prevState => {
					return {
						otherState: 'other value',
					};
				});
			}, []);

			return <div>{JSON.stringify(state)}</div>;
		}

		const renderer = TestRenderer.create(<MergableState />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<MergableState />);

		// assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});

	it('merges existing state', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState({
				initial: 'state',
			} as any);

			// act
			useEffect(() => {
				setState({
					otherState: 'other value',
					initial: 'should be different',
				});
			}, []);

			return <div>{JSON.stringify(state)}</div>;
		}

		const renderer = TestRenderer.create(<MergableState />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<MergableState />);

		// assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});

	it('merges existing state with function pattern', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState({
				initial: 'state',
				counter: 1,
			} as any);

			// act
			useEffect(() => {
				setState(prevState => {
					return {
						otherState: 'other value',
						initial: 'should be different',
						counter: prevState.counter + 2,
					};
				});
			}, []);

			return <div>{JSON.stringify(state)}</div>;
		}

		const renderer = TestRenderer.create(<MergableState />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<MergableState />);

		// assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});
});
