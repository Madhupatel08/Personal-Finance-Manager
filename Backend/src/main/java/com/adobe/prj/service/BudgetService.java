package com.adobe.prj.service;
import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.UUID;
import com.adobe.prj.dao.BudgetRepository;
import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {
    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TransactionDao transactionDao;

    public List<BudgetDto> getBudgets(String userid,int year,int month) {
        List<BudgetDto> budgetDto = new ArrayList<>();
        List<Budget> budgets = budgetRepository.findBudgetWithTotalSpent(userid);
        List<TransactionDto> transactionDto = transactionDao.findAllByUserIdAndTransactionType(userid,"EXPENSE");
        LocalDate frontDate = LocalDate.of(year,month,18);
//        LocalDate currDate = LocalDate.now();
//        frontDate = currDate.isAfter(frontDate)?frontDate:currDate;
        for(Budget b: budgets){
            LocalDate budgetDate = b.getBudgetDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if(budgetDate.isAfter(frontDate)) continue;
            double spent = 0,left = 0;
            Period diff = Period.between(budgetDate, frontDate);
            //inclusive

            switch (b.getTypeOfBudget()) {
                case "FIXED" -> {
                    //budgetType == Fixed
                    //Monthly Quarterly Yearly
                    switch (b.getPeriod()) {
                        case "MONTHLY" -> {
                            int months = diff.getMonths() + 1 + 12 * diff.getYears();
                            for (TransactionDto t : transactionDto) {
                                LocalDate transactionDate = t.getTransactionDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
                                if (t.getBudgetId().equals(b.getBudgetId()) && transactionDate.getYear() == frontDate.getYear() && transactionDate.getMonthValue() == frontDate.getMonthValue()) {
                                    spent += t.getAmount();
                                }
                            }
                        }
                        case "QUARTERLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            LocalDate lowDate = frontDate.minusMonths(-((months / 3) * 3));
                            //adds months
                            LocalDate highDate = frontDate.minusMonths(-((months / 3) * 3 + 2));
                            spent = getSpent(transactionDto, b, spent, lowDate, highDate);
                        }
                        case "YEARLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            LocalDate lowDate = frontDate.minusMonths(-((months / 12) * 12));
                            //adds months
                            LocalDate highDate = frontDate.minusMonths(-((months / 12) * 12 + 11));
                            spent = getSpent(transactionDto, b, spent, lowDate, highDate);
                        }
                    }
                    BudgetDto budgetDto1 = BudgetDto.builder().budgetId(b.getBudgetId()).budgetName(b.getBudgetName()).amount(b.getAmount()).typeOfBudget(b.getTypeOfBudget()).period(b.getPeriod()).budgetDate(b.getBudgetDate()).spent(spent).left(b.getAmount() - spent).build();
                    budgetDto.add(budgetDto1);
                }
                case "ROLLOVER" -> {
                    //budgetType == Rollover
                    switch (b.getPeriod()) {
                        case "MONTHLY" -> {
                            int months = diff.getMonths() + 1 + 12 * diff.getYears();
                            left = b.getAmount() * months;
                            spent = getSpent(transactionDto, frontDate, b, spent);
                            if (spent > left) spent = b.getAmount();
                        }
                        case "QUARTERLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            left = b.getAmount() * ((months - 1) / 3 + 1);
                            spent = getSpent(transactionDto, frontDate, b, spent);
                            if (spent > left && (months - 1) % 3 == 0) left = b.getAmount();
                        }
                        case "YEARLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            left = b.getAmount() * ((months - 1) / 12 + 1);
                            spent = getSpent(transactionDto, frontDate, b, spent);
                            if (spent > left && (months - 1) % 12 == 0) left = b.getAmount();
                        }
                    }
                    BudgetDto budgetDto2 = BudgetDto.builder().budgetId(b.getBudgetId()).budgetName(b.getBudgetName()).amount(b.getAmount()).typeOfBudget(b.getTypeOfBudget()).period(b.getPeriod()).budgetDate(b.getBudgetDate()).spent(spent).left(left - spent).build();
                    budgetDto.add(budgetDto2);
                }
                case "ADJUSTED" -> {
                    //budgetType == Adjusted
                    switch (b.getPeriod()) {
                        case "MONTHLY" -> {
                            int months = diff.getMonths() + 1 + 12 * diff.getYears();
                            left = b.getAmount() * months;
                            spent = getSpent(transactionDto, frontDate, b, spent);
                        }
                        case "QUARTERLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            left = b.getAmount() * ((months - 1) / 3 + 1);
                            spent = getSpent(transactionDto, frontDate, b, spent);
                        }
                        case "YEARLY" -> {
                            int months = diff.getMonths() + 2 + 12 * diff.getYears();
                            left = b.getAmount() * ((months - 1) / 12 + 1);
                            spent = getSpent(transactionDto, frontDate, b, spent);
                        }
                    }
                    BudgetDto budgetDto3 = BudgetDto.builder().budgetId(b.getBudgetId()).budgetName(b.getBudgetName()).amount(b.getAmount()).typeOfBudget(b.getTypeOfBudget()).period(b.getPeriod()).budgetDate(b.getBudgetDate()).spent(spent).left(left - spent).build();
                    budgetDto.add(budgetDto3);
                }
            }
        }
        return budgetDto;
    }

    private double getSpent(List<TransactionDto> transactionDto, LocalDate frontDate, Budget b, double spent) {
        for (TransactionDto t : transactionDto) {
            LocalDate transactionDate = t.getTransactionDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (t.getBudgetId().equals(b.getBudgetId()) && transactionDate.getYear() <= frontDate.getYear() && transactionDate.getMonthValue() <= frontDate.getMonthValue()) {
                spent += t.getAmount();
            }
        }
        return spent;
    }

    private double getSpent(List<TransactionDto> transactionDto, Budget b, double spent, LocalDate lowDate, LocalDate highDate) {
        for (TransactionDto t : transactionDto) {
            LocalDate transactionDate = t.getTransactionDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (t.getBudgetId().equals(b.getBudgetId()) && lowDate.getYear() <= transactionDate.getYear() && lowDate.getMonthValue() <= transactionDate.getMonthValue() && transactionDate.getYear() <= highDate.getYear() && transactionDate.getMonthValue() <= highDate.getMonthValue()) {
                spent += t.getAmount();
            }
        }
        return spent;
    }

    public void addBudget(Budget b) {
        b.setBudgetId(UUID.randomUUID().toString());
        b.setArchived(false);
        b.setTypeOfBudget(b.getTypeOfBudget().toUpperCase());
        b.setPeriod(b.getPeriod().toUpperCase());
        budgetRepository.save(b);
    }
    public void deleteBudget(String budgetId){
        budgetRepository.deleteBudget(budgetId);
    }
    public void updateBudget(Budget b) {
        if(budgetRepository.existsById(b.getBudgetId()) && !b.isArchived()) {
            Budget updateBudget = budgetRepository.getReferenceById(b.getBudgetId());
            updateBudget.setBudgetName(b.getBudgetName());
            updateBudget.setAmount(b.getAmount());
            updateBudget.setTypeOfBudget(b.getTypeOfBudget().toUpperCase());
            updateBudget.setPeriod(b.getPeriod().toUpperCase());
            updateBudget.setBudgetDate(b.getBudgetDate());
            budgetRepository.save(updateBudget);
        }
    }
}
