package com.adobe.prj.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
public class Account {

    // Primary key for the account, uniquely identifies each account.
    @Id
    private String accountId;

    private String accountName;

    // Many-to-one relationship with the User entity. One user can have multiple accounts.
    @ManyToOne
    @JoinColumn(name="user_fk")
    private User user;

    private double balance;

}
