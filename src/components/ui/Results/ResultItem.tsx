import React from 'react';

import { Result } from 'models/Search';

export interface ResultItemProps {
	item: Result;
}

function ResultItem({ item }: ResultItemProps) {
	return (
		<div className="hawk__results__item">
			<div className="hawk__results__item-image">
				<img src={item.Document.image} />
			</div>

			<div className="hawk__results__item-name">
				<span>{item.Document.itemname}</span>
			</div>
		</div>
	);
}

export default ResultItem;
