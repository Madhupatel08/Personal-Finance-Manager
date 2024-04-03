package com.adobe.prj.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
//@AllArgsConstructor
@Data


public class TransactionDto {
    private String transactionId;
    private String budgetId;
    private String billId;
    private String sourceAccount;
    private String destinationAccount;
    private double amount;
    private Date transactionDate;
    private String description;
    private String transactionType; // expense, revenue, transfer

    public TransactionDto(String transactionId, String budgetId, String billId, String sourceAccount, String destinationAccount, double amount, Date transactionDate, String description, String transactionType) {         this.transactionId = transactionId;         this.budgetId = budgetId;         this.billId = billId;         this.sourceAccount = sourceAccount;         this.destinationAccount = destinationAccount;         this.amount = amount;         this.transactionDate = transactionDate;        this.description = description;         this.transactionType = transactionType;     }
}
