package com.adobe.prj.dto;

import com.adobe.prj.dao.BillsDao;
import com.adobe.prj.entity.Bill;
import com.adobe.prj.service.TransactionService;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Builder
//@AllArgsConstructor
@Data
public class BillDto {
    private String billId;
    private String billName;
    private String description;
    private double minAmount;
    private double maxAmount;
    private Date billDate;
    private String repeats;
    private int skipCount;
    private Date paidOnPeriod;
    private Date nextExpectedMatch;

    public BillDto(String billId, String billName, String description, double minAmount, double maxAmount, Date billDate, String repeats, int skipCount, Date paidOnPeriod,
     Date nextExpectedMatch) {
        this.billId = billId;
        this.billName = billName;
        this.description = description;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.billDate = billDate;
        this.repeats = repeats;
        this.skipCount = skipCount;
        this.paidOnPeriod = paidOnPeriod;
        this.nextExpectedMatch = nextExpectedMatch;
    }
}
