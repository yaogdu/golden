package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.ApIdDao;
import com.home.domain.ApID;
import com.home.service.ApIdService;

public class ApIdServiceImpl implements ApIdService {

  @Autowired
  ApIdDao apIdDao;

  @Override
  public void answerItem(ApID apId) {
    // TODO Auto-generated method stub
    apIdDao.answerItem(apId);
  }

  @Override
  public ApID findByUid(long tablename, long uid) {
    // TODO Auto-generated method stub
    return apIdDao.findByUid(tablename, uid);
  }

  @Override
  public void updateItemStatus(String tablename, long uid, int status) {
    // TODO Auto-generated method stub
    apIdDao.updateItemStatus(tablename, uid, status);
  }

}
