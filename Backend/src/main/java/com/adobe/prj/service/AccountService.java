package com.adobe.prj.service;

import com.adobe.prj.dao.AccountDao;
import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.AccountDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    @Autowired
    private AccountDao accountDao;


    @Autowired
    private TransactionDao transactionDao;

    // Add a new account and generate a unique accountId for it.
    public Account addAccount(Account a) {
        a.setAccountId(UUID.randomUUID().toString());
        return accountDao.save(a);
    }

    // Get a list of account DTOs for a given user ID.
    public List<AccountDto> getAccounts(String userId) {
        // Update the account balance before fetching the accounts.
        List<AccountDto> accounts = accountDao.findByUserId(userId);
        LocalDate currentDate = LocalDate.now();
        double balance = 0.0;
        for (AccountDto accountDto : accounts) {
           balance =  updateAccountBalanceFromTransactions(userId, accountDto.getAccountId(),currentDate);
           accountDto.setBalance(balance);
        }
        return accounts;
//        return accountDao.findByUserId(userId);
    }

    // Get the account balance for a given accountId.
    public double getAccountBalance(String accountId) {
        return accountDao.findByAccountId(accountId).getBalance();
    }

    // Update the account balance based on the transactions associated with the user and the account.
    public double updateAccountBalanceFromTransactions(String userId, String accountId, LocalDate currentDate) {
        Account account = accountDao.findById(accountId).orElse(null);
        if (account == null) {
            throw new IllegalArgumentException("Account not found with ID: " + accountId);
        }

        double balance = account.getBalance();
        List<TransactionDto> transactions = transactionDao.findAllByUserId(userId);


        for (TransactionDto transaction : transactions) {
            // Filter transactions before or on the current date.
            LocalDate transactionDate = transaction.getTransactionDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            if (transactionDate.isAfter(currentDate)) {
                continue;
            }

            // Calculate the balance based on different transaction types.
            if (transaction.getTransactionType().equals("REVENUE") && account.getAccountId().equals(transaction.getSourceAccount())) {
                balance += transaction.getAmount();
            } else if (transaction.getTransactionType().equals("EXPENSE") && account.getAccountId().equals(transaction.getSourceAccount())){
                balance -= transaction.getAmount();
            } else if (transaction.getTransactionType().equals("TRANSFER")) {
                // Update balance for transfers involving the account.
                if (account.getAccountName().equals(transaction.getSourceAccount())) {
                    balance += transaction.getAmount();
                } else if (account.getAccountName().equals(transaction.getDestinationAccount())) {
                    balance -= transaction.getAmount();
                }
            }
        }

//        account.setBalance(balance);
//        return accountDao.save(account);
        return balance;
    }
}
