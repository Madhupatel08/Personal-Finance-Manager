package com.adobe.prj.service;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

import com.adobe.prj.dao.BillsDao;
import com.adobe.prj.dto.BillDto;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class BillsService {
    @Autowired
    private BillsDao billsDao;
    @Autowired
    private TransactionService transactionService;
    public List<Bill>getBills(String userid){
        return billsDao.getBills(userid);
    }
    public List<BillDto>getBillsDto(String userid){//DTO
        List<BillDto> finalAns= getBillsPaid(userid);
        //Build DTO
        return finalAns;
    }
    public List<BillDto> getBillsPaid(String userid){
        List<BillDto>billDto = new ArrayList<>();
        List<TransactionDto> allTransactions = transactionService.getTransactions(userid, "EXPENSE");//DTO
        List<Bill>allBills = billsDao.getBills(userid);//Bill
        for(Bill b: allBills) {
            boolean billPaid = false;
            for (TransactionDto d : allTransactions) {
                if (b.getBillId().equals(d.getBillId())) {
                    b.setPaidOnPeriod(d.getTransactionDate());

                    Calendar calendar = Calendar.getInstance();
//                    calendar.setTime(b.getPaidOnPeriod());
                    if (b.getRepeats().equals("Monthly")) {
                        calendar.add(Calendar.MONTH, 1* b.getSkipCount());
                    }else if (b.getRepeats().equals("Yearly")) {
                        calendar.add(Calendar.MONTH, 12*b.getSkipCount());
                    }else {
                        calendar.add(Calendar.MONTH, 3*b.getSkipCount());
                    }
//                    b.setNextExpectedMatch(calendar.getTime());

                    BillDto billDto1 =
                            BillDto.builder().billId(b.getBillId()).billName(b.getBillName()).description(b.getDescription()).minAmount(b.getMinAmount()).maxAmount(b.getMaxAmount()).billDate(b.getBillDate()).repeats(b.getRepeats()).skipCount(b.getSkipCount()).build();
                    billDto.add(billDto1);
                    billPaid = true; // Set the flag to indicate the bill is paid
                    break;
                }
            }
            if(!billPaid){
                b.setPaidOnPeriod(null);
                BillDto billDto1 =
                        BillDto.builder().billId(b.getBillId()).billName(b.getBillName()).description(b.getDescription()).minAmount(b.getMinAmount()).maxAmount(b.getMaxAmount()).billDate(b.getBillDate()).repeats(b.getRepeats()).skipCount(b.getSkipCount()).paidOnPeriod(b.getPaidOnPeriod()).nextExpectedMatch(b.getNextExpectedMatch()).build();
                billDto.add(billDto1);
            }
        }
        return billDto;
    }
    public Bill addBill(Bill b) {
        b.setBillId(UUID.randomUUID().toString());
        b.setArchived(false);
        return billsDao.save(b);
    }
    public void updateBill(Bill b){
        if(billsDao.existsById(b.getBillId()) && !b.isArchived()) {
            Bill updateBill = billsDao.getReferenceById(b.getBillId());
            updateBill.setBillName(b.getBillName());
            updateBill.setDescription(b.getDescription());
            updateBill.setMinAmount(b.getMinAmount());
            updateBill.setMaxAmount(b.getMaxAmount());
            updateBill.setBillDate(b.getBillDate());
            updateBill.setRepeats(b.getRepeats());
            updateBill.setSkipCount(b.getSkipCount());
            billsDao.save(updateBill);
        }
    }
    public String deleteBill(String billId) {
        billsDao.deleteBill(billId);
        return "Bill deleted!";
    }

//    public List<Double> getBillsPaid(String userId) {
//
//    }
}
