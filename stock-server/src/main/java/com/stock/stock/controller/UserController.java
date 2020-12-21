package com.stock.stock.controller;

import com.stock.stock.dto.SunInfo;
import com.stock.stock.entity.Users;
import com.stock.stock.model.*;
import com.stock.stock.repository.UserRepository;
import com.stock.stock.security.JwtUtil;
import com.stock.stock.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins="http://localhost:4200")
@RestController
class UserController {

    final AuthenticationManager authenticationManager;

    private final JwtUtil jwtTokenUtil;

    private final UserRepository userRepository;

    private final UserService userService;

    public UserController(AuthenticationManager authenticationManager, JwtUtil jwtTokenUtil, UserRepository userRepository, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
         String jwt = null;
         final Users userDetails = authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

         if (userDetails.getUsername() != null) {
             jwt = jwtTokenUtil.generateToken(userDetails);
         } else {
             return ResponseEntity
                     .badRequest()
                     .body(new MessageResponse("Invalid Credentials"));
         }
        if (jwt == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Jwt Token is not valid"));
        }
        return ResponseEntity.ok(new AuthenticationResponse(jwt, userDetails.getUserId(), userDetails.getUsername(), userDetails.getEmail()));
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody Signup user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username is already taken!"));
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Email is already in use!"));
        }

        Users newUser = new Users(user.getUsername(), user.getPassword(), user.getEmail());
        userService.save(newUser);
        final String jwt = jwtTokenUtil.generateToken(newUser);
        return ResponseEntity.ok(new AuthenticationResponse(jwt, newUser.getUserId(), newUser.getUsername(), newUser.getEmail()));
    }

    private Users authenticate(String username, String password) throws Exception {
        try {
            UserDetails userDetails = userService.loadUserByUsername(username);
            if(password.equals(userDetails.getPassword())) {
                UsernamePasswordAuthenticationToken authentication  = new UsernamePasswordAuthenticationToken(username, password);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                return (Users) userDetails;
            } else {
                return new Users();
            }
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @PutMapping(value = "/api/user/{userId}")
    private ResponseEntity<?> updateTheme(@PathVariable(value = "userId") long userId,
                                          @RequestBody String type) {
        try {
            userService.updateTheme(userId, type);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity
                    .badRequest().body(MessageResponse.failure(e));
        }
    }

    @PutMapping(value = "/api/user/{userId}/{editType}")
    private ResponseEntity<?> updatePassword(@PathVariable(value = "userId") long userId,
                                             @PathVariable(value = "editType") String type,
                                             @RequestBody String content) {
        try {
            userService.updateContent(userId, content, type);
            return ResponseEntity.ok(MessageResponse.success());
        }
        catch(Exception e) {
            return ResponseEntity
                    .badRequest().body(MessageResponse.failure(e));
        }
    }
}
