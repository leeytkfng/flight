import { useEffect, useState } from "react";
import SearchFlight from "../component/SearchFlight.jsx";
import FlightList from "./FlightList.jsx";
import axios from "axios";

function FlightPage() {
    const [filters, setFilters] = useState(null);
    const [allFlights, setAllFlights] = useState([]);
    const [selectedFlights, setSelectedFlights] = useState([]);

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

    const sendTokafka = async () =>{
        try {
            for (const flight of selectedFlights) {
                await axios.post("http://localhost:8080/api/kafka/publish" ,flight)
            }
            alert("Kafka 전송완료");
        } catch (error) {
            console.error("Kafka 전송실패:", error);
            alert("전송실패");
        }
    }


    return (
        <div>
            <SearchFlight onSearch={handleSearch} />
            {/* filters가 있으면 필터 기반 검색, 없으면 전체 항공 리스트 전달 */}
            {selectedFlights.length > 0 && (
                <div className="selected-flights-box">
                    <h3>선택된 항공편</h3>
                    {selectedFlights.map((flight,idx)=> (
                        <div key={idx} className="selected-flight">
                            {flight.departureName} ->{flight.arrivalName} ({flight.departureName})
                        </div>
                    ))}
                    <button onClick={sendTokafka}>예약 전송</button>
                </div>
            )}
            <FlightList filters={filters} allFlights={allFlights} onSelectedFlights={setSelectedFlights} />
        </div>
    );
}

export default FlightPage;
