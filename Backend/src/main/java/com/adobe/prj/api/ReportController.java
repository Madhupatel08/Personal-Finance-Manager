package com.adobe.prj.api;

import com.adobe.prj.dto.IncomeDto;
import com.adobe.prj.dto.IncomeVsExpenseDto;
import com.adobe.prj.entity.JwtResponse;
import com.adobe.prj.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @GetMapping("/income/{userid}")
    public ResponseEntity<List<IncomeVsExpenseDto>> getIncomeVsExpenseGraph(@RequestParam String year, @PathVariable("userid")String userid) {
        List<IncomeVsExpenseDto> response = reportService.getIncomeVsExpenseGraph(year,userid);
        return new ResponseEntity<>(response, HttpStatus.OK);

    }
    @GetMapping("/tabular/income/{userid}")
    public ResponseEntity<List<IncomeDto>> getIncomeTabularData(@RequestParam String year, @PathVariable("userid")String userid) {
        List<IncomeDto> response = reportService.getIncomeOrExpenseTabularData(userid, year, "REVENUE");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @GetMapping("/tabular/expense/{userid}")
    public ResponseEntity<List<IncomeDto>> getExpenseTabularData(@RequestParam String year, @PathVariable("userid")String userid) {
        List<IncomeDto> response = reportService.getIncomeOrExpenseTabularData(userid, year, "EXPENSE");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}
