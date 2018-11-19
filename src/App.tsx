import { hot } from 'react-hot-loader';
import React from 'react';
import Store from 'store/Store';

class App extends React.Component<{ store: Store }> {
	constructor(props) {
		super(props);
	}

	public componentDidMount() {
		this.props.store.search('');

		// setTimeout(() => {
		// 	this.forceUpdate();
		// }, 1000);
	}

	public shouldComponentUpdate(): boolean {
		console.log('sCU');
		return true;
	}

	public render() {
		const { store } = this.props;

		console.log('rend:', store);

		return store.Results ? (
			<div>
				{store.Results.Results.map(item => (
					<li key={item.DocId}>{item.DocId}</li>
				))}
			</div>
		) : null;
	}
}

export default hot(module)(App);
