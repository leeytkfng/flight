package com.example.airlist.service;

import com.example.airlist.dto.FlightDto;
import com.example.airlist.entity.Flight_info;
import com.example.airlist.repository.FlightInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FlightSearchService {

    private final FlightInfoRepository flightInfoRepository;

    public FlightSearchService(FlightInfoRepository flightInfoRepository){
        this.flightInfoRepository = flightInfoRepository;
    }

    public List<FlightDto> findOneWays(String departure, String arrival, String date){
        LocalDate targetDate = LocalDate.parse(date);
        return flightInfoRepository.findByDepartureAndArrivalAndDate(departure, arrival, targetDate)
                .stream()
                .map(this::toDto)
                .toList(); // Java 16 이상, 이전이면 .collect(Collectors.toList())
    }

    private FlightDto toDto(Flight_info flight){
        return new FlightDto(
                flight.getId(),
                flight.getDeparture().getANameKor(),
                flight.getArrival().getANameKor(),
                flight.getDepartureTime().toString(),   // 출발 시간
                flight.getArrivalTime().toString(),     // 도착 시간
                flight.getAircraft().getCModel(),       // 항공기 모델명
                flight.getFlightClass(),
                flight.getSeatCount(),
                150000 // 💡 예시로 고정된 가격 (필요 시 DB 컬럼 추가)
        );
    }
}
