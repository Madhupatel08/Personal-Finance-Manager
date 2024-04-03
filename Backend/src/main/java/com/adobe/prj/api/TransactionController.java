package com.adobe.prj.api;

import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Transaction;
import com.adobe.prj.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("api/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private TransactionDao transactionDao;

    @PostMapping
    public String addTransaction(@RequestBody Transaction b){
        transactionService.addTransaction(b);
        return "Success";
    }
    @GetMapping("/{userid}/{transactionType}")
    public List<TransactionDto> getTransaction(@PathVariable("userid")String userid, @PathVariable("transactionType")String transactionType) {
        return transactionService.getTransactions(userid,transactionType);
    }

    @PutMapping
    public String updateTransaction(@RequestBody Transaction transaction) {
        transactionService.updateTransaction(transaction);
        return "Success";
    }

    @DeleteMapping({"/{transactionId}"})
    public String deleteTransaction(@PathVariable("transactionId")String transactionId) {
        transactionService.deleteTransaction(transactionId);
        return "transactiom deleted!";
    }

}