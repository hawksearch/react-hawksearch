import React from "react";

import { useHawksearch } from 'components/StoreProvider';
import { ContentType } from 'models/Search/ContentType';
import { PageContentItem } from '../../../models/Search/Merchandising';
import { default as TrackingEvent } from 'components/TrackingEvent';

export interface MerchandisingBannerProps {
	BannerZone: string;
}

interface TrackEventPayloadProps {
	bannerId: number;
	campaignId: number;
	trackingId?: string;
}

function MerchandisingBanner({ BannerZone }: MerchandisingBannerProps) {
	const {
		store: { isLoading, searchResults },
	} = useHawksearch();

	let matchedMerchandisingItems: PageContentItem[] = searchResults
		? searchResults.Merchandising.Items.filter(i => i.Zone === BannerZone)
		: [];

	matchedMerchandisingItems = matchedMerchandisingItems.concat(
		searchResults ? searchResults.FeaturedItems.Items.filter(i => i.Zone === BannerZone) : []
	)
		;
	function getBannerHtml(matchedMerchandisingItem: PageContentItem) {
		return { __html: matchedMerchandisingItem.Output };
	}

	function renderBanner(merchandisingItem: PageContentItem, bannerIndex: number) {
		function trackEvent(type: string, trackEventPayload: TrackEventPayloadProps) {
			if (searchResults && searchResults.TrackingId) {
				TrackingEvent.track(type, {
					...trackEventPayload,
					trackingId: searchResults.TrackingId,
				});
			}
		}

		switch (merchandisingItem.ContentType) {
			case ContentType.Custom:
				return (
					<div key={bannerIndex}>
						<div
							onClick={() => {
								trackEvent('bannerclick', {
									bannerId: merchandisingItem.BannerId,
									campaignId: merchandisingItem.CampaignId,
								});
							}}
							className="text-left"
							dangerouslySetInnerHTML={getBannerHtml(merchandisingItem)}
						/>
					</div>
				);

			case ContentType.Widget:
				return (
					<div key={bannerIndex}>
						<div
							onClick={() => {
								trackEvent('bannerclick', {
									bannerId: merchandisingItem.BannerId,
									campaignId: merchandisingItem.CampaignId,
								});
							}}
							className="text-left"
							dangerouslySetInnerHTML={getBannerHtml(merchandisingItem)}
						/>
					</div>
				);

			case ContentType.Image:
				const absoluteUrlTester = new RegExp('^https?://|^//', 'i');
				let imageURL = merchandisingItem.ImageUrl;
				return (
					<div className="text-left" key={bannerIndex}>
						<a
							onClick={() => {
								trackEvent('bannerclick', {
									bannerId: merchandisingItem.BannerId,
									campaignId: merchandisingItem.CampaignId,
								});
							}}
							href={merchandisingItem.ForwardUrl}
							title={merchandisingItem.ImageTitle}
						>
							<img
								onLoad={() => {
									trackEvent('bannerimpression', {
										bannerId: merchandisingItem.BannerId,
										campaignId: merchandisingItem.CampaignId,
									});
								}}
								src={imageURL}
								title={merchandisingItem.ImageTitle}
								alt={merchandisingItem.AltTag}
							/>
						</a>
					</div>
				);

			default:
				return null;
		}
	}

	if (matchedMerchandisingItems.length > 0) {
		return (
			<div className="hawk-preview__banner-container">
				{matchedMerchandisingItems.map((merchendisingItem, index) => {
					return renderBanner(merchendisingItem, index);
				})}
			</div>
		);
	} else {
		return null;
	}
}
export default MerchandisingBanner;