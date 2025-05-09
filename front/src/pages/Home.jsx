import SearchFlight from "../components/SearchFlight";
import AdBanner from '../components/AdBanner';

import '../style/Home.css';
import QuickLink from "../components/QuickLink";
import Hotplace from "../components/Hotplace";
import SimpleAirportMap from "../components/SimpleAirportMap.jsx";

function Home() {
    return (
        <div className="home">
            <div className="banner">
                <img
                    src="/images/img1.jpg"
                    alt="Banner Image"
                />
            </div>

            <div className="contents-box">
                <SearchFlight />
                <SimpleAirportMap/>
                <QuickLink />
                <AdBanner />
                <Hotplace />
            </div>
        </div>
    )
}

export default Home