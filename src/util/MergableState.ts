import { useState, Dispatch } from 'react';

type SetStateAction<T> = Partial<T> | ((prevState: T) => Partial<T>);

export function useMergableState<T>(initialValue: T): [T, Dispatch<SetStateAction<T>>] {
	const [state, setState] = useState(initialValue);

	function setStateAndMerge(value: SetStateAction<T>) {
		let newState: Partial<T> = {};

		if (typeof value === 'function') {
			// if we're being passed a function, we're setting state in the form of setState(prevState => ...).
			// so we derive the new state from the previous state (stored in `state`)
			newState = value(state);
		} else {
			// otherwise, the new state was simply passed in
			newState = value;
		}

		// merge state together and set it
		setState({ ...(state as any), ...(newState as any) });
	}

	return [state, setStateAndMerge];
}
