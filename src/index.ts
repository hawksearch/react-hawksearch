const fn = (arg: unknown) => {
	console.log('hello world');
};

const test = {
	something: 'other;',
};

fn({ ...test });
