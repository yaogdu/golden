package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.ResourceDao;
import com.home.domain.Resource;
import com.home.service.ResourceService;

public class ResourceServiceImpl implements ResourceService {

  @Autowired
  ResourceDao resourceDao;

  @Override
  public Resource createOne(Resource resource) {
    // TODO Auto-generated method stub
    return resourceDao.createOne(resource);
  }

}
