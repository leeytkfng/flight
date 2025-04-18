import { useEffect, useState } from "react";
import axios from "axios";
import './FlightList.css';

function FlightList({ filters, allFlights = [] }) {
    const [oneWayFlights, setOneWayFlights] = useState([]);
    const [roundTripFlights, setRoundTripFlights] = useState([]);
    const [selectedFlightId, setSelectedFlightId] = useState(null);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                if (filters) {
                    const cleanParams = { ...filters };
                    // ❗ 빈 문자열 값 제거
                    Object.keys(cleanParams).forEach((key) => {
                        if (key !== "tripType" && cleanParams[key] === "") {
                            delete cleanParams[key];
                        }
                    });

                    const res = await axios.get("http://localhost:8080/api/flights/search", {
                        params: cleanParams
                    });

                    if (filters.tripType === "round") {
                        setRoundTripFlights(res.data);
                        setOneWayFlights([]);
                    } else {
                        setOneWayFlights(res.data);
                        setRoundTripFlights([]);
                    }
                } else {
                    setOneWayFlights(allFlights); // 전체 초기 리스트
                }
            } catch (error) {
                console.error("항공편 데이터 로딩 실패", error);
            }
        };

        fetchFlights();
    }, [filters, allFlights]);


    const formatTime = (str) =>
        new Date(str).toLocaleTimeString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });

    const getFlightDuration = (start, end) => {
        const diff = new Date(end) - new Date(start);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}시간 ${minutes}분`;
    };

    const renderOneWay = () =>
        oneWayFlights.map((flight, idx) => (
            <div key={flight.id}>
                <div
                    className={`flight-card ${selectedFlightId === flight.id ? 'selected' : ''}`}
                    onClick={() =>
                        setSelectedFlightId(selectedFlightId === flight.id ? null : flight.id)
                    }
                >
                    <div className="section section-left">
                        <h3>{flight.aircraftType}</h3>
                        <p>{flight.departureTime.split("T")[0]}</p>
                    </div>

                    <div className="section section-center">
                        <div className="center-twin">
                            <div className="time-info">
                                <p className="time">{formatTime(flight.departureTime)}</p>
                                <p className="location">{flight.departureName}</p>
                            </div>
                            <div className="duration-info">
                                ✈️ {getFlightDuration(flight.departureTime, flight.arrivalTime)}
                            </div>
                            <div className="time-info">
                                <p className="time">{formatTime(flight.arrivalTime)}</p>
                                <p className="location">{flight.arrivalName}</p>
                            </div>
                        </div>
                    </div>

                    <div className="section section-right">
                        <p className="price">₩ {flight.price}</p>
                        <p className="seats">좌석 {flight.seatCount}석</p>
                    </div>
                </div>

            </div>
        ));

    const renderRoundTrip = () =>
        roundTripFlights.map((pair, idx) => (
            <div key={idx} className="flight-card" onClick={() => setSelectedFlightId(idx)}>
                <div className="section section-left">
                    <h3>{pair.go.aircraftType}</h3>
                    <p>{pair.go.departureTime.split("T")[0]}</p>
                </div>

                <div className="section section-center">
                    <div className="center-twin">
                        <div className="time-info">
                            <p className="time">{formatTime(pair.go.departureTime)}</p>
                            <p className="location">{pair.go.departureName}</p>
                        </div>
                        <div className="duration-info">
                            ✈️ {getFlightDuration(pair.go.departureTime, pair.go.arrivalTime)}
                        </div>
                        <div className="time-info">
                            <p className="time">{formatTime(pair.go.arrivalTime)}</p>
                            <p className="location">{pair.go.arrivalName}</p>
                        </div>
                    </div>
                </div>

                <div className="section section-right">
                    <p className="price">₩ {pair.go.price}</p>
                    <p className="seats">좌석 {pair.go.seatCount}석</p>
                </div>
            </div>
        ));

    return (
        <div className="flight-list">
            {filters
                ? (filters.tripType === "round" ? renderRoundTrip() : renderOneWay())
                : renderOneWay()}
        </div>
    );
}

export default FlightList;
