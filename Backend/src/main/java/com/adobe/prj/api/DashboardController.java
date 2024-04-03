package com.adobe.prj.api;

import com.adobe.prj.dto.DashboardAccountDto;
import com.adobe.prj.dto.DashboardDisplayDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.service.DashboardService;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("api/dashboard")
public class DashboardController {
    @Autowired
    private DashboardService service;

    // Get the dashboard summary for a user, including net income, net expense, bills to pay, and money left to spend
    @GetMapping("/dashboardSummary/{userid}")
    public DashboardDisplayDto getDashboardSummary(@PathVariable("userid") String userid) {
        List<Double> netInAndOutAmount = service.netInAndOutAmount(userid);
        double billToPay = service.billsToPay(userid);
//        double billToPay = 100.0;
        double moneyLeftToSpend = service.moneyLeftToSpend(userid, 2023,8);
        String currentMonth = service.getCurrentMonth();
        return new DashboardDisplayDto(netInAndOutAmount, billToPay, moneyLeftToSpend, currentMonth);
    }

    @GetMapping("/NetBalance/{userid}")
    public Map<String,Double> calculateNetBalance(@PathVariable("userid")String userid){
        return service.calculateNetBalance(userid);
    }

    @GetMapping("/NetWorth/{userid}")
    public double calculateNetWorth(@PathVariable("userid")String userid) {
        return service.calculateNetWorth(userid);
    }

    @GetMapping("/getAccountDashboardData/{userid}")
    public List<DashboardAccountDto> getAccountDashboardData(@PathVariable("userid") String userid) {
        return service.loopDashboardData(userid);
    }


//    @GetMapping("/getAccountDashboardData/{userid}/{accountid}")
//    public DashboardAccountDto getAccountDashboardData(@PathVariable("accountid") String accountid) {
//        return service.getAccountDashboardData(accountid);
//    }

    @GetMapping("/date-wise-networth/{userId}")
    public ResponseEntity<List<Map<String,List<Double>>>> getDateWiseAccountBalance(@PathVariable String userId, @RequestParam int year, @RequestParam int month) {
        List<Map<String,List<Double>>> dateWiseNetWorth = service.getDateWiseAccountBalance(userId, year, month);
        return new ResponseEntity<>(dateWiseNetWorth, HttpStatus.OK);
    }
}
