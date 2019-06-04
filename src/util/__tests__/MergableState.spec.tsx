import React, { useEffect } from 'react';
import TestRenderer from 'react-test-renderer';

import { useMergableState } from 'util/MergableState';

describe('MergableState', () => {
	class MergableStore {
		public initial?: string;
		public otherState?: string;
		public counter?: number;

		public constructor(init?: Partial<MergableStore>) {
			Object.assign(this, init);
		}
	}

	it('sets initial state', () => {
		// arrange
		function MergableState() {
			const [state] = useMergableState<MergableStore>(
				{
					initial: 'state',
				},
				MergableStore
			);

			return <div>{JSON.stringify(state)}</div>;
		}
		const renderer = TestRenderer.create(<MergableState />);

		// act & assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});

	it('merges new state', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState<MergableStore>(
				{
					initial: 'state',
				},
				MergableStore
			);

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
			const [state, setState] = useMergableState<MergableStore>(
				{
					initial: 'state',
				},
				MergableStore
			);

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
			const [state, setState] = useMergableState<MergableStore>(
				{
					initial: 'state',
				},
				MergableStore
			);

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
			const [state, setState] = useMergableState<MergableStore>(
				{
					initial: 'state',
					counter: 1,
				},
				MergableStore
			);

			// act
			useEffect(() => {
				setState(prevState => {
					return {
						otherState: 'other value',
						initial: 'should be different',
						counter: prevState.counter! + 2,
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

	it('merges existing state multiple times', () => {
		// arrange
		function MergableState() {
			const [state, setState] = useMergableState<MergableStore>(
				{
					initial: 'state',
				},
				MergableStore
			);

			// act
			useEffect(() => {
				setState({
					otherState: 'other value',
					initial: 'should be different',
				});

				setState({
					initial: 'should really be different',
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

	it('retains methods on the state object', () => {
		class StoreWithMethods {
			public initial: string;

			public constructor(init: Partial<StoreWithMethods>) {
				Object.assign(this, init);
			}

			public doSomething() {
				return this.initial;
			}
		}

		// arrange
		function MergableState() {
			const [state, setState] = useMergableState(
				new StoreWithMethods({
					initial: 'state',
				}),
				StoreWithMethods
			);

			// act
			useEffect(() => {
				setState({
					initial: 'should be different',
				});
			}, []);

			return (
				<>
					<div>{JSON.stringify(state)}</div>
					{/* should render out the function, if the test is successful */}
					<div>{state.doSomething.toString()}</div>
				</>
			);
		}

		const renderer = TestRenderer.create(<MergableState />);

		// trigger an update so that the `useEffect` is triggered
		renderer.update(<MergableState />);

		// assert
		expect(renderer.toJSON()).toMatchSnapshot();
	});
});
