package com.example.airlist.repository;

import com.example.airlist.entity.Flight_info;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface FlightInfoRepository extends JpaRepository<Flight_info, Long> {

    @Query("SELECT f FROM Flight_info f " +
            "WHERE f.departure.aNameKor = :departure " +
            "AND f.arrival.aNameKor = :arrival " +
            "AND FUNCTION('DATE', f.departureTime) = :date")
    List<Flight_info> findByDepartureAndArrivalAndDate(@Param("departure") String departure,
                                                       @Param("arrival") String arrival,
                                                       @Param("date") LocalDate date);
}
