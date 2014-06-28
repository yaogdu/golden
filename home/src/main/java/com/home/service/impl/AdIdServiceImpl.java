package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.AdIdDao;
import com.home.domain.AdID;
import com.home.service.AdIdService;

public class AdIdServiceImpl implements AdIdService {

  @Autowired
  AdIdDao adIdDao;

  @Override
  public void answerItem(AdID adId) {
    adIdDao.answerItem(adId);

  }

  @Override
  public AdID createOne(AdID adId) {
    // TODO Auto-generated method stub
    return adIdDao.createOne(adId);
  }

  @Override
  public AdID findByUid(long tablename, long uid) {
    // TODO Auto-generated method stub
    return adIdDao.findByUid(tablename, uid);
  }

  @Override
  public boolean generateTable(String tablename) {
    // TODO Auto-generated method stub
    return adIdDao.generateTable(tablename);
  }

  @Override
  public void updateItemStatus(String tablename, long uid, int status) {
    // TODO Auto-generated method stub
    adIdDao.updateItemStatus(tablename, uid, status);
  }
}
