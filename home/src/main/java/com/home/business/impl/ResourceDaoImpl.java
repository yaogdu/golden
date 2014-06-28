package com.home.business.impl;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.ResourceDao;
import com.home.domain.Resource;

public class ResourceDaoImpl extends BaseEntityDao<Resource> implements ResourceDao {

  @Override
  @Transactional
  public Resource createOne(Resource resource) {
    // TODO Auto-generated method stub
    return super.save(resource);
  }

  @Override
  public Class<Resource> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

}
