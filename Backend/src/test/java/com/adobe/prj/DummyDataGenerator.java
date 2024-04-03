package com.adobe.prj;

import java.sql.*;
import java.util.Random;

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

    private static void generateDummyUsers(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO User (username, password, email) VALUES (?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                String username = "user" + i;
                String password = "pass" + i;
                String email = "user" + i + "@example.com";

                pstmt.setString(1, username);
                pstmt.setString(2, password);
                pstmt.setString(3, email);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyAccounts(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO Account (user_id, account_name, bank_name, account_type, balance) VALUES (?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                int userId = random.nextInt(20) + 1;
                String accountName = "Account " + i;
                String bankName = "Bank " + (char) ('A' + random.nextInt(3));
                String accountType = i % 2 == 0 ? "Asset" : "Liability";
                double balance = random.nextDouble() * 50000;

                pstmt.setInt(1, userId);
                pstmt.setString(2, accountName);
                pstmt.setString(3, bankName);
                pstmt.setString(4, accountType);
                pstmt.setDouble(5, balance);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyBudgets(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO Budget (user_id, budget_name, amount, period, rollover_amount, adjusted_amount) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                int userId = random.nextInt(20) + 1;
                String budgetName = "Budget " + i;
                double amount = random.nextDouble() * 2000;
                String period = i % 2 == 0 ? "Monthly" : "Yearly";
                double rolloverAmount = random.nextDouble() * 500;
                double adjustedAmount = random.nextDouble() * 1000;

                pstmt.setInt(1, userId);
                pstmt.setString(2, budgetName);
                pstmt.setDouble(3, amount);
                pstmt.setString(4, period);
                pstmt.setDouble(5, rolloverAmount);
                pstmt.setDouble(6, adjustedAmount);
                pstmt.executeUpdate();
            }
        }
    }


    private static void generateDummyBills(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO Bill (user_id, bill_name, description, min_amount, max_amount, frequency, end_date, extension_date, skip_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                int userId = random.nextInt(20) + 1;
                String billName = "Bill " + i;
                String description = "Description for Bill " + i;
                double minAmount = random.nextDouble() * 5000;
                double maxAmount = minAmount + random.nextDouble() * 1000;
                String frequency = i % 2 == 0 ? "Monthly" : "Quarterly";
                Date endDate = generateRandomDate();
                Date extensionDate = generateRandomDate();
                int skipCount = random.nextInt(5);

                pstmt.setInt(1, userId);
                pstmt.setString(2, billName);
                pstmt.setString(3, description);
                pstmt.setDouble(4, minAmount);
                pstmt.setDouble(5, maxAmount);
                pstmt.setString(6, frequency);
                pstmt.setDate(7, endDate);
                pstmt.setDate(8, extensionDate);
                pstmt.setInt(9, skipCount);
                pstmt.executeUpdate();
            }
        }
    }

    private static void generateDummyTransactions(Connection conn) throws SQLException {
        String insertQuery = "INSERT INTO Transaction (user_id, source_account_id, destination_account_id, amount, transaction_date, description) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement pstmt = conn.prepareStatement(insertQuery)) {
            for (int i = 1; i <= 20; i++) {
                int userId = random.nextInt(20) + 1;
                int sourceAccountId = random.nextInt(20) + 1;
                int destinationAccountId = random.nextInt(20) + 1;
                double amount = random.nextDouble() * 1000;
                Date transactionDate = generateRandomDate();
                String description = "Transaction " + i;

                pstmt.setInt(1, userId);
                pstmt.setInt(2, sourceAccountId);
                pstmt.setInt(3, destinationAccountId);
                pstmt.setDouble(4, amount);
                pstmt.setDate(5, transactionDate);
                pstmt.setString(6, description);
                pstmt.executeUpdate();
            }
        }
    }

    private static Date generateRandomDate() {
        long offset = Timestamp.valueOf("2020-01-01 00:00:00").getTime();
        long end = Timestamp.valueOf("2023-12-31 00:00:00").getTime();
        long diff = end - offset + 1;
        return new Date(offset + (long) (Math.random() * diff));
    }
}
