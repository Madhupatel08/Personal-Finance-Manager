package com.adobe.prj.dao;

import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Transaction;

import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface TransactionDao extends JpaRepository<Transaction, String> {
    // hello guys

    @Query("select new com.adobe.prj.dto.TransactionDto(t.transactionId, t.budget.budgetId,t.bill.billId,t.sourceAccount.accountId,t.destinationAccount,t.amount,t.transactionDate,t.description, t.transactionType) from Transaction t where t.user.userid= :userid AND t.isArchived= false")
    List<TransactionDto> findAllByUserId(@Param("userid") String userid);

    @Query("select new com.adobe.prj.dto.TransactionDto(t.transactionId, t.budget.budgetId,t.bill.billId,t.sourceAccount.accountId,t.destinationAccount,t.amount,t.transactionDate,t.description, t.transactionType) from Transaction t where t.user.userid= :userid AND t.transactionType= :transactionType")
    List<TransactionDto> findAllByUserIdAndTransactionType(@Param("userid") String userid, @Param("transactionType") String transactionType);

    @Query("select new com.adobe.prj.dto.TransactionDto(t.transactionId, t.budget.budgetId, t.bill.billId, t.sourceAccount.accountId, t.destinationAccount, t.amount, t.transactionDate, t.description, t.transactionType) from Transaction t where t.user.userid = :userid order by t.transactionDate desc")
    List<TransactionDto> getLast5Transactions(@Param("userid") String userid, Pageable pageable);

    @Query("SELECT new com.adobe.prj.dto.TransactionDto(t.transactionId, t.budget.budgetId, t.bill.billId, t.sourceAccount.accountId, t.destinationAccount, t.amount, t.transactionDate, t.description, t.transactionType) " +
            "FROM Transaction t WHERE t.sourceAccount.accountId = :accountId OR t.destinationAccount = :accountId " +
            "ORDER BY t.transactionDate DESC")
    List<TransactionDto> getTransactionsByAccountId(@Param("accountId") String accountId);

    @Transactional
    @Modifying
    @Query("UPDATE Transaction SET isArchived = true WHERE transactionId = :transactionId")
    void deleteTransaction(@Param("transactionId") String transactionId);

}