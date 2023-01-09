import React from "react";
import { useHawksearch } from 'components/StoreProvider';

function CustomPageHtml() {

    const { store: { searchResults } } = useHawksearch();

    if (searchResults && searchResults.CustomHtml !== undefined) {
        return (
            <div className="hawkpagecustomhtml" dangerouslySetInnerHTML={{ __html: searchResults?.CustomHtml }} />
        );
    } else {

        return <></>
    }
}
export default CustomPageHtml;