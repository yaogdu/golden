package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.LocationDao;
import com.home.domain.Location;
import com.home.service.LocationService;

public class LocationServiceImpl implements LocationService {

  @Autowired
  LocationDao locationDao;

  @Override
  public void CollectLocation(Location location) {
    locationDao.collectLocation(location);

  }

}
