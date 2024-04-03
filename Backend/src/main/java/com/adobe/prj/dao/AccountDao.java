package com.adobe.prj.dao;

import com.adobe.prj.dto.AccountDto;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.entity.Account;
import com.adobe.prj.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountDao extends JpaRepository<Account, String> {
    @Query("SELECT new com.adobe.prj.dto.AccountDto(a.accountId, a.accountName, a.balance) FROM Account a WHERE a.user.userid = :userid")
    List<AccountDto> findByUserId(@Param("userid") String userid);

    @Query("FROM Account a WHERE a.accountName = :name")
    Account findByName(@Param("name") String name);

    @Query("FROM Account a WHERE a.accountId = :id")
    Account findByAccountId(@Param("id") String id);

    @Query("FROM Account a WHERE a.user.userid = :userid")
    String getAccount(@Param("userid") String userid);

}
