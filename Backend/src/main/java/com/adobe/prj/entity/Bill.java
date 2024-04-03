package com.adobe.prj.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity

public class Bill {
    @Id
    private String billId;

    private String billName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_fk")
    private User user;

    private String description;

    private double minAmount;

    private double maxAmount;

    private Date billDate;

    private String repeats;

    private int skipCount;

    private boolean archived = false;

    private Date paidOnPeriod;

    private Date nextExpectedMatch;
}

