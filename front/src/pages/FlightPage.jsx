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
        // searchData가 비어있는 값이 있을 경우 검증
        const { departure, arrival, date, tripType, returnDate } = searchData;

        if (!departure || !arrival || !date) {
            alert("모든 정보를 입력해주세요!");
            return;
        }
        if (tripType === "round" && !returnDate) {
            alert("왕복일 경우 귀국 날짜도 필요합니다.");
            return;
        }

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
