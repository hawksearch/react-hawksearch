import React from 'react';
import { Result } from 'models/Search';

interface CompareTilesProps {
	imageURL: string;
	itemName: string;
	item?: Result;
	onSelectTiles: (item: Result) => void;
}

interface CompareItemProps {
	itemsList: Result[];
	onSelectCompareItems: () => void;
	clearItems: () => void;
	onSelectTiles: (item: Result) => void;
}

function CompareTiles({ imageURL, itemName, onSelectTiles, item }: CompareTilesProps) {
	if (item && onSelectTiles) {
		return (
			<div onClick={() => onSelectTiles(item)} className="hawk__compare-tiles">
				{imageURL && <img src={imageURL} alt={itemName} />}
			</div>
		);
	}
	return <div className="hawk__compare-tiles">{imageURL && <img src={imageURL} alt={itemName} />}</div>;
}

function CompareItems({ itemsList, onSelectCompareItems, clearItems, onSelectTiles }: CompareItemProps) {
	return (
		<div className="hawk__compare-container">
			<div className="hawk__compare-container__list">
				{[...Array(5)].map((_, index) => {
					if (itemsList && itemsList.length && itemsList[index]) {
						const imageURL = itemsList[index].getDocumentValue('image');
						const itemName = itemsList[index].getDocumentValue('itemname');
						return (
							<CompareTiles
								onSelectTiles={onSelectTiles}
								imageURL={imageURL || ''}
								itemName={itemName || ''}
								item={itemsList[index]}
								key={index}
							/>
						);
					}
					return <CompareTiles onSelectTiles={onSelectTiles} imageURL={''} itemName={''} key={index} />;
				})}
			</div>
			<div>
				<button
					disabled={itemsList.length < 2}
					onClick={() => onSelectCompareItems()}
					className="hawk-btn hawk-btn-primary-outline"
				>
					Compare
				</button>
				<button onClick={() => clearItems()} className="hawk-btn hawk-btn-primary-outline">
					Clear
				</button>
			</div>
		</div>
	);
}

export default CompareItems;
