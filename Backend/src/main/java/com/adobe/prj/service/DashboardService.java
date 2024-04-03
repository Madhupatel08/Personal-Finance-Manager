package com.adobe.prj.service;

import com.adobe.prj.dao.AccountDao;
import com.adobe.prj.dao.BillsDao;
import com.adobe.prj.dao.BudgetRepository;
import com.adobe.prj.dao.TransactionDao;
import com.adobe.prj.dto.AccountDto;
import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.dto.DashboardAccountDto;
import com.adobe.prj.dto.TransactionDto;
import com.adobe.prj.entity.Account;
import com.adobe.prj.entity.Bill;
import com.adobe.prj.entity.Budget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class DashboardService {
    @Autowired
    private AccountService accountService;
    @Autowired(required = false)
    private BudgetService budgetService;

    @Autowired
    private AccountDao accountDao;

    @Autowired(required = false)
    private BudgetDto budgetDto;

    @Autowired(required = false)
    private BudgetRepository budgetRepository;

    @Autowired
    private BillsDao billsDao;

    @Autowired
    private BillsService billsService;

    @Autowired
    private TransactionDao transactionDao;

    @Autowired(required = false)
    private Account account;


    // Calculate the net worth of a user by summing up the balances of all their accounts
    public double calculateNetWorth(String userId) {
        double netWorth = 0.0;
        List<AccountDto> accounts = accountService.getAccounts(userId);
        LocalDate currentDate = LocalDate.now();
        for (AccountDto account : accounts) {
            netWorth += accountService.updateAccountBalanceFromTransactions(userId, account.getAccountId(), currentDate);
        }

        return netWorth;
    }

    public String getCurrentMonth() {
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM yyyy");
        return currentDate.format(formatter);
    }

    // Calculate the total bills yet to be paid by a user based on their bills and paid amounts.
    public double billsToPay(String userId) {
        List<Bill> totalBills = billsDao.getBills(userId);
        List<Double> billPaid = billsDao.getBillsPaid(userId);

        double totalBillsAmount = 0.0;
        for (Bill b : totalBills) {
            double maxAmt = (b.getMaxAmount() + b.getMinAmount()) / 2.0;
            totalBillsAmount += maxAmt;
        }
        double totalBillsPaid = 0.0;
        for (double b : billPaid) {
            totalBillsPaid += b;
        }
        return totalBillsAmount - totalBillsPaid;
    }

    // Calculate the total outgoing amount (EXPENSE) for a user based on their transactions
    public double outAmount(String userid) {
        List<TransactionDto> allTransactions =transactionDao.findAllByUserId(userid);
        double outAmt = 0.0;
        for(TransactionDto transactionDto: allTransactions){
            if(transactionDto.getTransactionType().equals("EXPENSE")){
                outAmt +=  transactionDto.getAmount();
            }
        }
        return outAmt;
    }

    // Calculate the total incoming amount (REVENUE) for a user based on their transactions
    public double inAmount(String userid) {
        List<TransactionDto> allTransactions =transactionDao.findAllByUserId(userid);
        double inAmt = 0.0;
        for(TransactionDto transactionDto: allTransactions){
            if(transactionDto.getTransactionType().equals("REVENUE")){
                inAmt +=  transactionDto.getAmount();
            }
        }
        return inAmt;
    }

    // Calculate the net incoming and outgoing amounts for a user based on their transactions
    public List<Double> netInAndOutAmount(String userId) {
        double inAmount = inAmount(userId);
        double outAmount = outAmount(userId);
        double netAmount = inAmount - outAmount;

        List<Double> result = new ArrayList<>();
        result.add(inAmount);
        result.add(outAmount);
        result.add(netAmount);

        return result;
    }

    // Calculate the remaining money to spend for a user based on their budgets and expenses
    public double moneyLeftToSpend(String userId, int year, int month) {
//        List<BudgetDto> budgetDtos = budgetRepository.findBudgetWithTotalSpent(userId);
        List<BudgetDto> budgets = budgetService.getBudgets(userId, year, month);

        // Calculate the total left amount for the user by summing up the left amounts of all budgets
        double totalLeftAmount = budgets.stream()
                .mapToDouble(BudgetDto::getLeft)
                .sum();

        return totalLeftAmount;
    }

    // Helper method to convert Budget entity to BudgetDto
    private BudgetDto convertToBudgetDto(Budget budget) {
        return new BudgetDto();
    }

    // Calculate the net balance of accounts for a user based on their transactions
    public Map<String, Double> calculateNetBalance(String userId) {
        List<TransactionDto> transactions = transactionDao.findAllByUserId(userId);
        Map<String, Double> accountBalances = new HashMap<>();


        for (TransactionDto transaction : transactions) {
            String sourceAccount = transaction.getSourceAccount();
            String destinationAccount = transaction.getDestinationAccount();
            double amount = transaction.getAmount();

            Account sourceAccountObj = accountDao.findByAccountId(sourceAccount);
            double sourceAccountBalance = sourceAccountObj.getBalance();

            // Deduct the amount from the source account (Expense or Transfer)
            if (sourceAccount != null && !sourceAccount.isEmpty()) {
                accountBalances.putIfAbsent(sourceAccount, 0.0);
                accountBalances.put(sourceAccount, sourceAccountBalance - amount);
            }

            // Add the amount to the destination account (Revenue or Transfer)
            if (destinationAccount != null && !destinationAccount.isEmpty()) {
                accountBalances.putIfAbsent(destinationAccount, 0.0);
                accountBalances.put(destinationAccount, accountBalances.get(destinationAccount) + amount);
            }
        }

        return accountBalances;
    }

    public List<DashboardAccountDto> loopDashboardData(String userId) {
        List<AccountDto> accounts = accountService.getAccounts(userId);
        List<DashboardAccountDto> dashboardAccountDtos = new ArrayList<>();
        for (AccountDto accountDto : accounts) {
            dashboardAccountDtos.add(getAccountDashboardData(accountDto.getAccountId()));
        }
        return dashboardAccountDtos;
    }
    // Get account dashboard data, including the account's initial balance and last 5 transactions
        public DashboardAccountDto getAccountDashboardData(String accountId) {
            // Retrieve account details from the 'accounts' table
            Account account = accountDao.findByAccountId(accountId);

            // Retrieve the initial balance from the account object
            double initialBalance = account.getBalance();

            // Retrieve the last 5 transactions from the 'transactions' table
            List<TransactionDto> lastTransactions = transactionDao.getTransactionsByAccountId(accountId);

            // Create a new instance of the AccountDashboardDto and populate it with the retrieved data
            DashboardAccountDto accountDashboardDto = new DashboardAccountDto();
            accountDashboardDto.setAccountName(account.getAccountName());
            accountDashboardDto.setInitialBalance(initialBalance);
            accountDashboardDto.setLastTransactions(lastTransactions);

            return accountDashboardDto;
        }

    public Map<String, List<Double>> getAccountBalanceDayWise(String userId) {
        Map<String, List<Double>> accountBalances = new HashMap<>();
        List<AccountDto> accounts = accountService.getAccounts(userId);

        for (AccountDto account : accounts) {
            double accountBalance = account.getBalance();
            List<TransactionDto> transactions = transactionDao.getTransactionsByAccountId(account.getAccountId());
            List<Double> balances = calculateBalanceDayWise(transactions);

            List<Double> accountNetBalances = new ArrayList<>();
            for (Double balance : balances) {
                double netBalance = accountBalance + balance;
                accountNetBalances.add(netBalance);
            }

            accountBalances.put(account.getAccountName(), accountNetBalances);
        }

        return accountBalances;
    }


    private List<Double> calculateBalanceDayWise(List<TransactionDto> transactions) {
        List<Double> balances = new ArrayList<>();
        double balance = 0.0;

        // Sort the transactions by date in ascending order
        transactions.sort(Comparator.comparing(TransactionDto::getTransactionDate));

        for (TransactionDto transaction : transactions) {
            if (transaction.getTransactionType().equals("EXPENSE")) {
                balance -= transaction.getAmount();
            } else if (transaction.getTransactionType().equals("REVENUE")) {
                balance += transaction.getAmount();
            } else if (transaction.getTransactionType().equals("TRANSFER")) {
                // Adjust balance for transfer transactions based on source and destination accounts
                if (transaction.getSourceAccount().equals(account.getAccountId())) {
                    balance -= transaction.getAmount();
                } else if (transaction.getDestinationAccount().equals(account.getAccountId())) {
                    balance += transaction.getAmount();
                }
            }

            balances.add(balance);
        }

        return balances;
    }

    // Get date-wise account balance for a user based on their transactions and selected year and month
    public List<Map<String,List<Double>>> getDateWiseAccountBalance(String userId, int selectedYear, int selectedMonth) {
//        List<TransactionDto> transactions = transactionDao.findAllByUserId(userId);
        List<AccountDto> accounts = accountDao.findByUserId(userId);
        List<String> listDates = getListOfDatesInMonth(selectedYear, selectedMonth);
        List<Map<String,List<Double>>> netWorth = new ArrayList<>();

            Map<String,List<Double>> a = new HashMap<>();
            for (AccountDto accountDto : accounts) {
                List<Double> temp = new ArrayList<>();
                for (String listDate : listDates) {
                System.out.println(listDate);
                temp.add(accountService.updateAccountBalanceFromTransactions(userId, accountDto.getAccountId(), LocalDate.parse(listDate)));
            }
            a.put(accountDto.getAccountName(),temp);
            netWorth.add(a);
        }
        return netWorth;
    }

    // Helper method to get a list of dates in a given month and year
    private List<String> getListOfDatesInMonth(int year, int month) {
        List<String> datesOfMonth = new ArrayList<>();

        // Get the number of days in the selected month
        int daysInMonth = YearMonth.of(year, month).lengthOfMonth();

        // Create LocalDate objects for each day of the month and add them to the list
        for (int day = 1; day <= daysInMonth; day++) {
            LocalDate date = LocalDate.of(year, month, day);
            datesOfMonth.add(date.toString());
        }

        return datesOfMonth;
    }


}
