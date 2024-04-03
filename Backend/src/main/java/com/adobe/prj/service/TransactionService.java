package com.adobe.prj.service;

import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Budget;
import com.adobe.prj.entity.Transaction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TransactionService {
    @Autowired
    private TransactionDao transactionDao;

    public Transaction addTransaction(Transaction transaction) {
        transaction.setTransactionId(UUID.randomUUID().toString());
        transaction.setArchived(false);
        transaction.setTransactionType(transaction.getTransactionType().toUpperCase());
        return transactionDao.save(transaction);
    }

    public List<TransactionDto> getTransactions(String userid, String transactionType) {
        List<TransactionDto> transactionDtos = transactionDao.findAllByUserIdAndTransactionType(userid,transactionType);
        return transactionDtos;
    }

    public Transaction updateTransaction(Transaction transaction) {
        if(transactionDao.existsById(transaction.getTransactionId()) && !transaction.isArchived()) {
            Transaction updateTransaction = transactionDao.getReferenceById(transaction.getTransactionId());
            updateTransaction.setTransactionDate(transaction.getTransactionDate());
            updateTransaction.setTransactionType(transaction.getTransactionType().toUpperCase());
            updateTransaction.setBill(transaction.getBill());
            updateTransaction.setBudget(transaction.getBudget());
            updateTransaction.setAmount(transaction.getAmount());
            updateTransaction.setDescription(transaction.getDescription());
            updateTransaction.setDestinationAccount(transaction.getDestinationAccount());
            updateTransaction.setSourceAccount(transaction.getSourceAccount());
            return transactionDao.save(updateTransaction);
        }
        return transaction;
    }

    public void deleteTransaction(String transactionId) {
        transactionDao.deleteTransaction(transactionId);
    }

}