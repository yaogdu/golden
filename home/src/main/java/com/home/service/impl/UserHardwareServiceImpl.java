package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.UserHardwareDao;
import com.home.domain.UserHardware;
import com.home.service.UserHardwareService;

public class UserHardwareServiceImpl implements UserHardwareService {

  @Autowired
  UserHardwareDao userHardwareDao;

  @Override
  public UserHardware findyHardware(String imei) {
    // TODO Auto-generated method stub
    return userHardwareDao.findyHardware(imei);
  }

  @Override
  public UserHardware save(UserHardware userHardware) {
    // TODO Auto-generated method stub
    return userHardwareDao.save(userHardware);
  }

}
