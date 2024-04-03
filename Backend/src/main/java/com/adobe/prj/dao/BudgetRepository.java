package com.adobe.prj.dao;

import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.entity.Budget;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface BudgetRepository extends JpaRepository<Budget, String> {

    @Query("FROM Budget b WHERE b.user.userid = :userid AND b.archived=false")
    List<Budget> findBudgetWithTotalSpent(@Param("userid") String userid);


    @Transactional
    @Modifying
    @Query("UPDATE Budget SET archived = true WHERE budgetId = :budgetId")
    void deleteBudget(@Param("budgetId") String budgetId);

}
