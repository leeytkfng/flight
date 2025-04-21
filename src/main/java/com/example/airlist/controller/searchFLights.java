package com.example.airlist.controller;

import com.example.airlist.dto.FlightDto;
import com.example.airlist.dto.RountTripDto;
import com.example.airlist.repository.FlightInfoRepository;
import com.example.airlist.service.FlightSearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/flights")
public class searchFLights {

    private final FlightSearchService flightSearchService;

    public searchFLights(FlightSearchService flightInfoRepository){
        this.flightSearchService = flightInfoRepository;
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchFlights(@RequestParam("tripType") String tripType,
                                           @RequestParam String departure,
                                           @RequestParam String arrival,
                                           @RequestParam(value = "date" , required = false) String date,
                                           @RequestParam(required = false) String returnDate) {
        if(tripType.equals("oneway")){
            List<FlightDto> result = flightSearchService.findOneWays(departure,arrival,date);
            return ResponseEntity.ok(result);
        }

        if (tripType.equals("round")){
            List<FlightDto> goList = flightSearchService.findOneWays(departure,arrival,date);
            List<FlightDto> backList = flightSearchService.findOneWays(arrival,departure,returnDate);

            List<RountTripDto> combined =new ArrayList<>();
            for (FlightDto go : goList){
                for (FlightDto back: backList){
                    combined.add(new RountTripDto(go, back));
                }
            }

            return ResponseEntity.ok(combined);
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("안된다 이용수야");
    }

    @GetMapping("/search/split")
    public ResponseEntity<?> searchRoundTripSplit(@RequestParam String departure,
                                                  @RequestParam String arrival,
                                                  @RequestParam(value = "date" , required = false) String date,
                                                  @RequestParam(required = false) String returnDate) {
        Map<String, List<FlightDto>> result = flightSearchService.findRoundTripSeperate(departure,arrival,date,returnDate);
        return ResponseEntity.ok(result);
    }
}
