package com.adobe.prj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnTransformer;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Budget {
    @Id
    private String budgetId;
    @ColumnTransformer(read = "UPPER(budget_name)")
    private String budgetName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_fk")
    private User user;

    private double amount;
    private String typeOfBudget;
    private String period;
    private Date budgetDate;
    private boolean archived;

}
