import React from 'react';

import { Sorting, Pagination } from './Tools';

function ToolRow() {
	return (
		<div className="hawk__tool-row">
			<Sorting />

			<Pagination />
		</div>
	);
}

export default ToolRow;
