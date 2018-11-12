const fn = (arg: unknown) => {
	document.write('hello world');
};

const test = {
	something: 'other',
};

fn({ ...test });
