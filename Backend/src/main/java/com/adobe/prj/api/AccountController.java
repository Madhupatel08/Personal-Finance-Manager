package com.adobe.prj.api;

import com.adobe.prj.dto.AccountDto;
import com.adobe.prj.entity.Account;
import com.adobe.prj.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService service;

    // API endpoint to add a new account.
    @PostMapping
    public Account addAccount(@RequestBody Account a) {
        return service.addAccount(a);
    }

    // API endpoint to get a list of account DTOs for a given userID.
    @GetMapping("/{userid}")
    public List<AccountDto> getAccounts(@PathVariable("userid") String userId) {
        return service.getAccounts(userId);
    }

    // API endpoint to get the account balance for a given accountId.
    @GetMapping("/{accountId}/balance")
    public double getAccountBalance(@PathVariable("accountId") String accountId) {
        return service.getAccountBalance(accountId);
    }


}
