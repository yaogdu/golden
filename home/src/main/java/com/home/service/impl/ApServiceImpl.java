package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.ApDao;
import com.home.domain.AppPromotion;
import com.home.service.ApService;

public class ApServiceImpl implements ApService {

  @Autowired
  ApDao apDao;

  @Override
  public AppPromotion createOne(AppPromotion ap) {
    // TODO Auto-generated method stub
    return apDao.createOne(ap);
  }

  @Override
  public List<AppPromotion> CustomizedAp(long ts, long uid) {
    // TODO Auto-generated method stub
    return apDao.CustomizedAp(ts, uid);
  }

  @Override
  public AppPromotion findById(long apId) {
    // TODO Auto-generated method stub
    return apDao.findById(apId);
  }

  @Override
  public List<AppPromotion> historyByUid(long uid, int pageSize, int pageNo) {
    // TODO Auto-generated method stub
    return apDao.historyByUid(uid, pageSize, pageNo);
  }

  @Override
  public List<AppPromotion> publicAp(long ts) {
    // TODO Auto-generated method stub
    return apDao.publicAp(ts);
  }

}
