package com.adobe.prj.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Date;
import java.util.List;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardDisplayDto {

    // List of net income and net expense amounts
    private List<Double> netInAndOutAmount;
    private double billToPay;
    private double moneyLeftToSpend;
    private String date;
}
