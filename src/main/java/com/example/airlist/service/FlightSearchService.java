package com.example.airlist.service;

import com.example.airlist.dto.FlightDto;
import com.example.airlist.entity.Flight_info;
import com.example.airlist.repository.FlightInfoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FlightSearchService {

    private final FlightInfoRepository flightInfoRepository;

    public FlightSearchService(FlightInfoRepository flightInfoRepository){
        this.flightInfoRepository = flightInfoRepository;
    }

    public List<FlightDto> findOneWays(String departure, String arrival, String date) {
        if (date == null || date.isBlank()) {
            return flightInfoRepository.findByDepartureAAndArrival(departure, arrival)
                    .stream().map(this::toDto).toList();
        }
        LocalDate targetDate = LocalDate.parse(date);
        return flightInfoRepository.findByDepartureAndArrivalAndDate(departure, arrival, targetDate)
                .stream().map(this::toDto).toList();
    }


    public Map<String, List<FlightDto>> findRoundTripSeperate(String dep,String arr,String goDate,String backDate) {
        Map<String , List<FlightDto>> result = new HashMap<>();
        result.put("goList", findOneWays(dep, arr,goDate));
        result.put("backList", findOneWays(arr, dep,backDate));
        return result;
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
