import React from 'react';

import { Sorting, Pagination } from './Tools';

function ToolRow() {
	return (
		<div className="hawk-tool-row">
			<div className="hawk-tool-row__item">
				<Sorting />
			</div>

			<div className="hawk-tool-row__item">
				<Pagination />
			</div>
		</div>
	);
}

export default ToolRow;
