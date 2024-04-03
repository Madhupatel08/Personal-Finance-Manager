package com.adobe.prj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
//@AllArgsConstructor
@Data
@Builder

public class BudgetDto {
     private String budgetId;
     private String budgetName;
     private double amount;
     private String typeOfBudget;
     private String period;
     private Date budgetDate;
     private double spent;
     private double left;

     public BudgetDto(String budgetId, String budgetName, double amount, String typeOfBudget, String period, Date budgetDate, double spent, double left) {
          this.budgetId = budgetId;
          this.budgetName = budgetName;
          this.amount = amount;
          this.typeOfBudget = typeOfBudget;
          this.period = period;
          this.budgetDate = budgetDate;
          this.spent = spent;
          this.left = left;
     }


}
