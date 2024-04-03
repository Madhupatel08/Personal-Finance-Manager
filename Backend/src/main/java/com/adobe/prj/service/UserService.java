package com.adobe.prj.service;

import com.adobe.prj.dao.UserDao;
import com.adobe.prj.entity.User;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserDao userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public String getUserIdByUsename(String userName) {
        Optional<User> optionalUser = userRepository.findByUsername(userName);
        if (optionalUser.get() != null) {
            User user = optionalUser.get();
            return user.getUserId();
        }
        return "";
    }


    public User createUser(User user) {
        Optional<User> usernameEntry = userRepository.findByUsername(user.getUsername());
        Optional<User> emailEntry = userRepository.findByEmail(user.getEmail());
        if(usernameEntry.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username already exists!");
        }
        if(emailEntry.isPresent()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email already exists!");
        }
        user.setUserid(UUID.randomUUID().toString());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public String updatePassword(@Valid User user) {
        Optional<User> userEntry = userRepository.findByEmail(user.getEmail());
        try {
            if (userEntry.isPresent() == false) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No User Exist With this Email");
            }
        } catch (ResponseStatusException e) {
            e.printStackTrace();
        }
        User newPwd = userEntry.get();
        newPwd.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(newPwd);
        return "Password Updated Successfully";
    }

}
