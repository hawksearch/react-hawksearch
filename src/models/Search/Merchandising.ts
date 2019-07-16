import { ContentType } from './ContentType';

export class Merchandising {
	public Items?: MerchandisingItem[];
}

export class MerchandisingItem {
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
	public FeaturedItems: any;
	public Target: string;
	public MobileTarget: string;
	public MobileAltTag: string;
	public MobileForwardUrl: string;
	public MobileWidth: string;
	public MobileHeight: string;
}
