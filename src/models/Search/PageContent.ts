import { PageContentItem } from './Merchandising';

export class PageContent {
	public ZoneName: string;
	public Items: PageContentItem[];
	public constructor(init: PageContent) {
		Object.assign(this, init);
		this.Items = init.Items.map(i => new PageContentItem(i));
	}
}
