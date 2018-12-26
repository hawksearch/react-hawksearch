import { useState, Dispatch } from 'react';

type SetStateAction<T> = Partial<T> | ((prevState: T) => Partial<T>);

export function useMergableState<T>(
	initialValue: T,
	typeConstructor: new (init: Partial<T>) => T
): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState(new typeConstructor(initialValue));

	function setStateAndMerge(value: SetStateAction<T>) {
		if (typeof value === 'function') {
			// if we're being passed a function, we're setting state in the form of setState(prevState => ...).

			setState(prevState => {
				// so we derive the new state from the previous state
				const newState = value(prevState);

				// and then set the new merged state
				return new typeConstructor({ ...prevState, ...newState });
			});

			return;
		}

		// otherwise, the new state was simply passed in
		setState(prevState => {
			// merge state together and set it
			return new typeConstructor({ ...prevState, ...value });
		});
	}

	return [state, setStateAndMerge];
}
