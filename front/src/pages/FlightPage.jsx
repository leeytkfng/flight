import { useEffect, useState } from "react";
import SearchFlight from "../component/SearchFlight.jsx";
import FlightList from "./FlightList.jsx";
import axios from "axios";

function FlightPage() {
    const [filters, setFilters] = useState(null);
    const [allFlights, setAllFlights] = useState([]);

    useEffect(() => {
        const fetchInitial = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/flights");
                setAllFlights(res.data);
            } catch (error) {
                console.error("초기 항공편 데이터 불러오기 실패", error);
            }
        };

        if (!filters) {
            fetchInitial();
        }
    }, [filters]);

    const handleSearch = (searchData) => {
        setFilters(searchData); // 상태 전달
    };



    return (
        <div>
            <SearchFlight onSearch={handleSearch} />
            {/* filters가 있으면 필터 기반 검색, 없으면 전체 항공 리스트 전달 */}
            <FlightList filters={filters} allFlights={allFlights} />
        </div>
    );
}

export default FlightPage;
