package com.adobe.prj.entity;

import java.sql.*;
import java.time.LocalDate;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

public class DummyDataGenerator {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/finance_manager";
    private static final String DB_USER = "root";
    private static final String DB_PASSWORD = "Welcome123";

    private static final Random random = new Random();
    public static void main(String[] args) {
        generateDummyData();
    }
    private static void generateDummyData() {
        try (Connection conn = DriverManager.getConnection(DB_URL, DB_USER, DB_PASSWORD)) {
            generateDummyUsers(conn);
            generateDummyAccounts(conn);
            generateDummyBudgets(conn);
            generateDummyBills(conn);
            generateDummyTransactions(conn);
            System.out.println("Dummy data generated successfully.");
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private static void generateDummyAccounts(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO account (account_name, user_fk, balance) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                String userId = "user_id"+i;
                String accountName = "Account " + i;
                double balance = random.nextDouble() * 50000;
                pstmt.setString(1, accountName);
                pstmt.setString(2, userId);
                pstmt.setDouble(3, balance);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyUsers(Connection conn) throws  SQLException{
        String insertQuery = "INSERT INTO user (userid, username, password, email) VALUES (?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                String userId = "user_id"+i;
                String username = "user" + i;
                String password = "pass" + i;
                String email = "user" + i + "@example.com";
                pstmt.setString(1, userId);
                pstmt.setString(2, username);
                pstmt.setString(3, password);
                pstmt.setString(4, email);
                pstmt.executeUpdate();
            }
        }
    }
    private static void generateDummyBills(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO bill (user_fk, bill_name, description, min_amount, max_amount, bill_date, repeats, skip_count, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                String userId = "user_id"+i;
                String billName = "Bill " + i;
                String description = "Description for Bill " + i;
                double minAmount = random.nextDouble() * 5000;
                double maxAmount = minAmount + random.nextDouble() * 1000;
                long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
                long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
                long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
                LocalDate transactionDate = LocalDate.ofEpochDay(randomDay);
                String repeats;
                if (i % 3 == 0) {
                    repeats = "Yearly";
                } else if (i % 2 == 0) {
                    repeats = "Monthly";
                } else {
                    repeats = "Quarterly";
                }

                int skipCount = random.nextInt(5);
                boolean archived = false;
                pstmt.setString(1, userId);
                pstmt.setString(2, billName);
                pstmt.setString(3, description);
                pstmt.setDouble(4, minAmount);
                pstmt.setDouble(5, maxAmount);
                pstmt.setDate(6, Date.valueOf(transactionDate));
                pstmt.setString(7, repeats);
                pstmt.setInt(8, skipCount);
                pstmt.setBoolean(9, archived);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyBudgets(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO budget (user_fk, budget_name, amount, type_of_budget, period) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {

                String userId = "user_id"+i;
                String budgetName = "Budget " + i;
                double amount = random.nextDouble() * 2000;
                String typeOfBudget;
                if (i % 3 == 0) {
                    typeOfBudget = "Fixed";
                } else if (i % 2 == 0) {
                    typeOfBudget = "Rollover";
                } else {
                    typeOfBudget = "Overspend";
                }
                String period;
                if (i % 3 == 0) {
                    period = "Quarterly";
                } else if (i % 2 == 0) {
                    period = "Monthly";
                } else {
                    period = "Yearly";
                }

                pstmt.setString(1, userId);
                pstmt.setString(2, budgetName);
                pstmt.setDouble(3, amount);
                pstmt.setString(4, typeOfBudget);
                pstmt.setString(5, period);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyTransactions(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO transaction (transaction_id, user_fk, account_fk, destination_account, amount, transaction_date, description, transaction_type, budget_fk, bill_fk) VALUES (?, ?, ?, ?, ?, ?,?,?,?,?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                int transactionId = i;
                String userId = "user_id"+i;
                String sourceAccountName = "Account " + i;
                String destinationAccount = "Dest_Account " + random.nextInt(20) + 1;
                double amount = random.nextDouble() * 1000;
                long minDay = LocalDate.of(1970, 1, 1).toEpochDay();
                long maxDay = LocalDate.of(2015, 12, 31).toEpochDay();
                long randomDay = ThreadLocalRandom.current().nextLong(minDay, maxDay);
                LocalDate transactionDate = LocalDate.ofEpochDay(randomDay);
                String description = "Transaction " + i;
                String transactionType;
                if (i % 3 == 0) {
                    transactionType = "expense";
                } else if (i % 2 == 0) {
                    transactionType = "revenue";
                } else {
                    transactionType = "transfer";
                }

                String budget = "Budget " + i;

                String bill = "Bill " + i;


                pstmt.setInt(1, transactionId);
                pstmt.setString(2, userId);
                pstmt.setString(3, sourceAccountName);
                pstmt.setString(4, destinationAccount);

               pstmt.setDouble(5, amount);
                pstmt.setDate(6, Date.valueOf(transactionDate));
                pstmt.setString(7, description);

              pstmt.setString(8, transactionType);

                pstmt.setString(9, budget);

                pstmt.setString(10, bill);
                pstmt.executeUpdate();
            }
        }
    }
}
