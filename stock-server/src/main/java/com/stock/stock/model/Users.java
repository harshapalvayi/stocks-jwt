package com.stock.stock.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long userid;

    @Column(unique = true, nullable = false)
    private String username;

    @Size(min = 4, message = "Minimum password length: 4 characters")
    private String password;

    @Column(unique = true, nullable = false)
    private String email;

    @OneToMany(mappedBy = "userInfo", cascade = CascadeType.ALL)
    private List<Share> share = new ArrayList<>();

    public long getUserid() {
        return userid;
    }

    public void setUserid(long id) {
        this.userid = id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Users() {
    }

    public Users(@Size(min = 4, max = 255, message = "Minimum username length: 4 characters") String username,
                 @Size(min = 4, message = "Minimum password length: 4 characters") String password) {
        this.username = username;
        this.password = password;
    }

    public Users(@NotBlank @Size(min = 4, max = 20) String username,
                 @NotBlank @Size(min = 4, max = 40) String password,
                 @NotBlank @Size(max = 50)
                 @Email String email) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Users(long id, @NotBlank @Size(min = 4, max = 20) String username,
                 @NotBlank @Size(max = 50) @Email String email) {
        this.userid = id;
        this.username = username;
        this.email = email;
    }

    public List<Share> getShare() {
        return share;
    }

    public void setShare(List<Share> share) {
        this.share = share;
    }

    @Override
    public String toString() {
        return String.format(
                "Users[userid=%d, username='%s', email='%s']", userid, username, email);
    }
}
