package com.adobe.prj.dao;

import com.adobe.prj.dto.BillDto;
import com.adobe.prj.entity.Bill;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BillsDao extends JpaRepository<Bill, String> {
    @Transactional
    @Modifying
    @Query("UPDATE Bill SET archived = true WHERE billId = :billId")
    void deleteBill(@Param("billId") String billId);

    @Query("FROM Bill b WHERE b.archived = false AND b.user.userid = :userid")
    List<Bill> getBills(@Param("userid") String userid);


//    @Transactional
//    @Query("SELECT new com.adobe.prj.dto.BillDto(b.billId, b.billName, b.description, b.minAmount, b.maxAmount, b.billDate, b.repeats, b.skipCount, b.paidOnPeriod, b.nextExpectedMatch) " +
//            "FROM Bill b WHERE b.archived = false AND b.user.userid = :userid")
//    List<BillDto> getBillsDto(@Param("userid") String userid);

    @Query("SELECT SUM(t.amount) FROM Transaction t WHERE t.user.userid = :userid AND t.transactionType = 'expense' AND t.bill.billId IS NOT NULL GROUP BY t.bill.billId")
    List<Double> getBillsPaid(@Param("userid") String userid);
}
