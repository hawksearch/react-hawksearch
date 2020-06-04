import React from 'react';

import { useTranslation } from 'react-i18next';

export interface SpinnerProps {
	isVisible: boolean;
}

function Spinner({ isVisible }: SpinnerProps) {
	const { t, i18n } = useTranslation();

	if (!isVisible) {
		return null;
	}

	return (
		<div className={'hawk-modal'}>
			<div className={'hawk-modal__content'}>{t('Loading')}...</div>
		</div>
	);
}

export default Spinner;
