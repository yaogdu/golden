package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.SoftwareDao;
import com.home.domain.Software;
import com.home.service.SoftwareService;

public class SoftwareServiceImpl implements SoftwareService {

  @Autowired
  SoftwareDao softwareDao;

  @Override
  public Software exists(Software software) {
    // TODO Auto-generated method stub
    return softwareDao.exists(software);
  }

  @Override
  public Software save(Software software) {
    // TODO Auto-generated method stub
    return softwareDao.save(software);
  }

}
