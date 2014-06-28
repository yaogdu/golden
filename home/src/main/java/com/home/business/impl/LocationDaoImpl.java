package com.home.business.impl;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.LocationDao;
import com.home.domain.Location;

public class LocationDaoImpl extends BaseEntityDao<Location> implements LocationDao {

  @Override
  @Transactional
  public void collectLocation(Location location) {
    super.save(location);
  }

  @Override
  public Class<Location> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

}
