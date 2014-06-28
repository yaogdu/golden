package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.UserSoftwareDao;
import com.home.domain.UserSoftware;
import com.home.service.UserSoftwareService;

public class UserSoftwareServiceImpl implements UserSoftwareService {

  @Autowired
  UserSoftwareDao userSoftwareDao;

  @Override
  public UserSoftware exists(UserSoftware userSoftware) {
    // TODO Auto-generated method stub
    return userSoftwareDao.exists(userSoftware);
  }

  @Override
  public UserSoftware save(UserSoftware userSoftware) {
    // TODO Auto-generated method stub
    return userSoftwareDao.save(userSoftware);
  }

}
