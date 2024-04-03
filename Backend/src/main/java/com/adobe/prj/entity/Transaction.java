package com.adobe.prj.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Builder
@Entity
public class Transaction {
    @Id
    private String transactionId;

    @ManyToOne
    @JoinColumn(name="user_fk")
    private User user;

    @ManyToOne
    @JoinColumn(name="account_fk")
    private Account sourceAccount;

    private String destinationAccount;

    private double amount;

    private Date transactionDate;

    private String description;

    private String transactionType; // expense, revenue, transfer

    @ManyToOne
    @JoinColumn(name="budget_fk")
    private Budget budget;

    @ManyToOne
    @JoinColumn(name="bill_fk")
    private Bill bill;
    private boolean isArchived;
}