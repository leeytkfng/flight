package com.example.airlist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FlightDto {
    private Long id;
    private String departureName;
    private String arrivalName;
    private String departureTime;
    private String arrivalTime;
    private String aircraftType;
    private String flightClass;
    private int seatCount;
    private int price;

}
