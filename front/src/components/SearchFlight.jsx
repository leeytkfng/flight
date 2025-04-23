import {useState} from "react";
import "./SearchFlight.css";


const SearchFlight = ({onSearch}) => {
  const [tripType, setTripType] = useState("round"); // round, oneway, multi
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");


  const handleSearch = () => {
    if (!departure || !arrival) {
      alert("출발 , 도착을 입력해라");
      return;
    }
    onSearch({ tripType, departure, arrival, date, returnDate });
  };

  const handleSwap = () => {
    const temp = departure;
    setDeparture(arrival);
    setArrival(temp);
  }

  return(
      <div className="flight-search-box">
        <div className="trip-tabs">
          <button
              className={tripType === "round" ? "active" : ""}
              onClick={() => setTripType("round")}
          >
            왕복
          </button>
          <button
              className={tripType === "oneway" ? "active" : ""}
              onClick={() => setTripType("oneway")}
          >
            편도
          </button>
          <h2 style={{marginLeft:"275px"}}>항공권 검색</h2>
        </div>

        <div className="form-row">
          <input
              type="text"
              placeholder="출발지 (예: 김포)"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
          />
          <button type="button" onClick={handleSwap}>⇄</button>
          <input
              type="text"
              placeholder="도착지 (예: 제주)"
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
          />
          <div className="form-row">
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {tripType === "round" && (
              <div className="form-row">
                <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                />
              </div>
          )}

          <div className="form-row">
            <button className="search-btn" onClick={handleSearch}>
              검색
            </button>
          </div>
        </div>
      </div>
  );
}

export default SearchFlight;