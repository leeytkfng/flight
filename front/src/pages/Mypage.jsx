import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/Mypage.css";

function MyPage() {
    const [user, setUser] = useState(null);
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");

        if (loggedUser) {
            const userData = JSON.parse(loggedUser);
            setUser(userData);

            const fetchReservations = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:5000/reservations?userId=${userData.id}`
                    );
                    setReservations(response.data);
                } catch (error) {
                    console.error("예약을 불러오는 데 실패했습니다.", error);
                }
            };

            fetchReservations();
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="my-page">
            {user ? (
                <>
                    <h2>마이 페이지</h2>
                    <p><strong>이메일:</strong> {user.username}</p>
                    <p><strong>이름:</strong> {user.name}</p>

                    <h3>예약 목록</h3>
                    {reservations.length > 0 ? (
                        <div className="reservation-list">
                            {reservations.map((reservation) => (
                                <div className="reservation-card" key={reservation.id}>
                                    <h4>예약 번호: {reservation.id}</h4>
                                    <p><strong>항공편:</strong> {reservation.flight.aircraftType}</p>
                                    <p><strong>출발지 / 도착지:</strong> {reservation.flight.departure} / {reservation.flight.arrival}</p>
                                    <p><strong>출발 시간:</strong> {reservation.flight.departureTime}</p>
                                    <p><strong>좌석 번호:</strong> {reservation.selectedSeats.join(', ')}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>현재 예약이 없습니다.</p>
                    )}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default MyPage;
