package com.home.business;

import java.util.List;

import com.home.domain.User;

public interface UserDao {

  public User findById(long uid);

  public List<User> findTestData(int count);

  public boolean ImeiExists(String imei);

  public User ImeiMappedToUser(String imei);

  public User login(String loginId);

  public User save(User user);

  public boolean updateIMEI(User user);

}
