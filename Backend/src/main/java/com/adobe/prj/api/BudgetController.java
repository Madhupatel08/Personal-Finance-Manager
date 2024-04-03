package com.adobe.prj.api;

import com.adobe.prj.dto.BudgetDto;
import com.adobe.prj.entity.Budget;
import com.adobe.prj.entity.User;
import com.adobe.prj.service.BudgetService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api/budgets")
@CrossOrigin(origins = "http://localhost:3000")
public class BudgetController {
    @Autowired
    private BudgetService service;

    @PostMapping
    public String addBudget(@RequestBody Budget b){
        //set budgetId
        try{
            service.addBudget(b);
            return "Success"; //use enums
        }catch (Exception ex){
            //use sls4j
            return ex.getMessage();
        }
    }

    @GetMapping("/{userid}")
    @ResponseBody
    public List<BudgetDto> getBudgets(@PathVariable("userid")String userid,@RequestParam int year, @RequestParam int month ){
        return service.getBudgets(userid,year,month);
    }
//
//    @GetMapping("/{userid}/{budgetName}")
//    public Object getBudget(@PathVariable("budgetName") String budgetName,@PathVariable("userid")String userid) {
//        Object ob = service.getBudget(budgetName,userid);
//        return ob;
//    }

    @PutMapping
    public String updateBudget(@RequestBody Budget p)  {
        try {
            service.updateBudget(p);
            return "Success";
        }
        catch(Exception ex){
            return ex.getMessage();
        }
    }

    @DeleteMapping("/{budgetId}")
    public void deleteBudget(@PathVariable("budgetId") String budgetId){
        service.deleteBudget(budgetId);
    }
}
