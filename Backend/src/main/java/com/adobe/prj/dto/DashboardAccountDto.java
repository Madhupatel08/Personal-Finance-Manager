package com.adobe.prj.dto;

import com.adobe.prj.entity.Transaction;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.adobe.prj.dto.TransactionDto;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DashboardAccountDto {
    private String accountName;
    private double initialBalance;
    private List<TransactionDto> lastTransactions;
}
