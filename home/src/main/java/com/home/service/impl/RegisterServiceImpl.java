package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.RegisterDao;
import com.home.service.RegisterService;
import com.home.domain.User;

public class RegisterServiceImpl implements RegisterService {

  @Autowired
  RegisterDao registerDao;

  @Override
  public User cellExists(String cellNum) {
    // TODO Auto-generated method stub
    return registerDao.cellExists(cellNum);
  }

}
