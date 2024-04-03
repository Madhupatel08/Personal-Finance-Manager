package com.adobe.prj.api;

import java.util.List;

import com.adobe.prj.dto.BillDto;
import com.adobe.prj.entity.Bill;
import com.adobe.prj.service.BillsService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/bills")
@CrossOrigin
public class BillController {
    @Autowired
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})

    private BillsService service;
    public List<Bill>getBills(@PathVariable("userid")String userid){
        return service.getBills(userid);
    }
//    @GetMapping("/{userid}")
//    public Bill getBill(@PathVariable("userid")String userid){
//        return service.getBill(userid);
//    }
    @GetMapping("/{userid}")
    public List<BillDto>getBillsDto(@PathVariable("userid") String userid){
        return service.getBillsDto(userid);
    }
    @PostMapping
    public Bill addBill(@RequestBody Bill b) {
        return service.addBill(b);
    }
    @PutMapping ()
    public String updateBill(@RequestBody Bill bill) {
        try {
            service.updateBill(bill);
            return "Success";
        }
        catch(Exception ex){
            return ex.getMessage();
        }
    }
    @DeleteMapping("/{billId}")
    public String deleteBill(@PathVariable("billId") String billId) {
        service.deleteBill(billId);
        return "Bill deleted!";
    }
}