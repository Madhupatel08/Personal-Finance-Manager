package com.adobe.prj.service;

import com.adobe.prj.dao.AccountDao;
import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.IncomeDto;
import com.adobe.prj.dto.IncomeVsExpenseDto;
import com.adobe.prj.dto.TransactionDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReportService {
    @Autowired
    private TransactionDao transactionDao;
    @Autowired
    private AccountDao accountDao;

    public List<IncomeVsExpenseDto> getIncomeVsExpenseGraph(String year, String userid) {
        List<TransactionDto> allTransactions = transactionDao.findAllByUserId(userid);
        List<IncomeVsExpenseDto> incomeVsExpenseDtos = new ArrayList<>();
        for (int month =0; month <12 ; month ++) {
            incomeVsExpenseDtos.add(new IncomeVsExpenseDto());
        }
        for (TransactionDto transaction : allTransactions) {
            int monthTransaction = extractMonthFromDate(transaction.getTransactionDate());
            String yearTransaction = extractYearFromDate(transaction.getTransactionDate());
            if (yearTransaction.equals(year)) {
                if (transaction.getTransactionType().toUpperCase().equals("EXPENSE")) {
                    double prevExpense = incomeVsExpenseDtos.get(monthTransaction-1).getExpense();
                    incomeVsExpenseDtos.get(monthTransaction-1).setExpense(prevExpense + transaction.getAmount());
                }
                else if (transaction.getTransactionType().toUpperCase().equals("REVENUE")) {
                    double prevRevenue = incomeVsExpenseDtos.get(monthTransaction-1).getIncome();
                    incomeVsExpenseDtos.get(monthTransaction-1).setIncome(prevRevenue + transaction.getAmount());
                }
            }
        }
        return incomeVsExpenseDtos;
    }

    public List<IncomeDto> getIncomeOrExpenseTabularData(String userid, String year, String transactionType) {
        List<TransactionDto> transactionDtos = transactionDao.findAllByUserIdAndTransactionType(userid,
                transactionType);
        Map<String, Double> sumMap = new HashMap<>();
        Map<String, Integer> countMap = new HashMap<>();
        ArrayList<IncomeDto> incomesOrExpense = new ArrayList<>();
        for (TransactionDto transactionDto : transactionDtos) {
            String yearTransaction = extractYearFromDate(transactionDto.getTransactionDate());
            if (yearTransaction.equals(year) && transactionType.equalsIgnoreCase("REVENUE")) {

                sumMap.put(accountDao.getReferenceById(transactionDto.getSourceAccount()).getAccountName(), sumMap.getOrDefault(
                        accountDao.getReferenceById(transactionDto.getSourceAccount()).getAccountName(),
                        0.0) + transactionDto.getAmount());
                countMap.put(accountDao.getReferenceById(transactionDto.getSourceAccount()).getAccountName(), countMap.getOrDefault(
                        accountDao.getReferenceById(transactionDto.getSourceAccount()).getAccountName(),
                        0) + 1);
            } else if (yearTransaction.equals(year) && transactionType.equalsIgnoreCase("EXPENSE")) {
                sumMap.put(transactionDto.getDestinationAccount(), sumMap.getOrDefault(transactionDto.getDestinationAccount(),
                        0.0) + transactionDto.getAmount());
                countMap.put(transactionDto.getDestinationAccount(), countMap.getOrDefault(transactionDto.getDestinationAccount(),
                        0) + 1);
            }

        }
        for (Map.Entry<String, Double> entry : sumMap.entrySet()) {
            String sourceAccount = entry.getKey();
            double totalSum = entry.getValue();
            int count = countMap.get(sourceAccount);
            double average = totalSum / count;
            incomesOrExpense.add(new IncomeDto(sourceAccount, totalSum, average));
        }
        return incomesOrExpense;
    }

    private int extractMonthFromDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("MM", Locale.ENGLISH);
        String monthString = dateFormat.format(date);
        return Integer.parseInt(monthString);
    }

    private String extractYearFromDate(Date date) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY", Locale.ENGLISH);
        String yearString = dateFormat.format(date);
        return yearString;
    }

}
