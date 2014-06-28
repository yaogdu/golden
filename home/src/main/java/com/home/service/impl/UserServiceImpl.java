package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.UserDao;
import com.home.domain.User;
import com.home.service.UserService;

public class UserServiceImpl implements UserService {

  @Autowired
  UserDao userDao;

  @Override
  public User findById(long uid) {
    // TODO Auto-generated method stub
    return userDao.findById(uid);
  }

  @Override
  public List<User> findTestData(int count) {
    // TODO Auto-generated method stub
    return userDao.findTestData(count);
  }

  @Override
  public User get(String loginName) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public boolean ImeiExists(String imei) {
    // TODO Auto-generated method stub
    return userDao.ImeiExists(imei);
  }

  @Override
  public User ImeiMappedToUser(String imei) {
    // TODO Auto-generated method stub
    return userDao.ImeiMappedToUser(imei);
  }

  @Override
  public User login(String loginId) {

    return userDao.login(loginId);
  }

  @Override
  public User save(User user) {
    return userDao.save(user);
  }

  @Override
  public boolean updateIMEI(User user) {
    // TODO Auto-generated method stub
    return userDao.updateIMEI(user);
  }

}
