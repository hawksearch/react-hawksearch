import { ContentType } from './ContentType';
import { Result } from './Result';
import { BannerTrigger } from './Trigger';

export class FeaturedItems {
	public Items: FeaturedItem[];

	public constructor(init: FeaturedItems) {
		Object.assign(this, init);
		if (init && init.Items) {
			this.Items = init.Items.map(i => new FeaturedItem(i));
		}
	}
}

export class Merchandising {
	public Items: MerchandisingItem[];

	public constructor(init: Merchandising) {
		Object.assign(this, init);
		if (init && init.Items) {
			this.Items = init.Items.map(i => new MerchandisingItem(i));
		}
	}
}

export class PageContentItem {
	public Zone: string;
	public ContentType: ContentType;
	public ImageUrl: string;
	public AltTag: string;
	public ForwardUrl: string;
	public Output: any;
	public WidgetArgs: string;
	public Title: string;
	public Name: string;
	public DateFrom: string;
	public DateTo: string;
	public IsMobile: boolean;
	public MobileContentType: string;
	public MobileImageUrl: string;
	public MobileOutput: string;
	public MobileWidgetArgs: string;
	public IsTrackingEnabled: boolean;
	public MobileIsTrackingEnabled?: boolean;
	public FeaturedItems: Result[];
	public Items: Result[];
	public Target: string;
	public MobileTarget: string;
	public MobileAltTag: string;
	public MobileForwardUrl: string;
	public MobileWidth: string;
	public MobileHeight: string;
	public Trigger: BannerTrigger;

	public constructor(init: PageContentItem) {
		Object.assign(this, init);
		if (init.FeaturedItems) {
			this.FeaturedItems = init.FeaturedItems.map(i => new Result(i));
		}
		if (init.Trigger) {
			this.Trigger = new BannerTrigger(init.Trigger);
		}
	}
}

export class FeaturedItem extends PageContentItem {
	public Items: Result[];

	public constructor(init: FeaturedItem) {
		super(init);
		Object.assign(this, init);
		this.Items = init.Items.map(i => new Result(i));
	}
}

export class MerchandisingItem extends PageContentItem {
	public constructor(init: MerchandisingItem) {
		super(init);
		Object.assign(this, init);
	}
}
