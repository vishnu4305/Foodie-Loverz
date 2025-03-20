import { useState } from 'react';

import PlacesCard from '../../../utils/Cards/card3/PlacesCard'
import ShowMore from '../../../utils/Cards/card3/ShowMore'

import css from './PopularPlaces.module.css';

let PopularPlaces = () => {
    let [showMore, setShowMore] = useState();
    return <div className={css.outerDiv}>
        <div className={css.title}><span className={css.titleTxt}>Popular localities in and around</span> <span className={css.bld}>Hyderabad</span></div>
        <div className={css.placesCards}>
            <PlacesCard place="Guntur" count="143" link='/Guntur' />
            <PlacesCard place="Guntur" count="143" link='/Guntur' />
            <PlacesCard place="Guntur" count="143" link='/Guntur' />
            <PlacesCard place="Guntur" count="143" link='/Guntur' />
            <ShowMore setShowMore={setShowMore} />
        </div>
    </div>
}

export default PopularPlaces;