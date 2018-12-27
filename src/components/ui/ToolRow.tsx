import React from 'react';

import Sorting from './Sorting';
import Pagination from './Pagination';

function ToolRow() {
	return (
		<div className="hawk__tool-row">
			<Sorting />

			<Pagination />
		</div>
	);
}

export default ToolRow;
