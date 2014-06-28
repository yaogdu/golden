package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.MrIdDao;
import com.home.domain.MrID;
import com.home.service.MrIdService;

public class MrIdServiceImpl implements MrIdService {

  @Autowired
  MrIdDao mrIdDao;

  @Override
  public void answerItem(MrID mrId) {
    mrIdDao.answerItem(mrId);
  }

  @Override
  public MrID createOne(MrID mrId) {
    // TODO Auto-generated method stub
    return mrIdDao.createOne(mrId);
  }

  @Override
  public MrID findByUid(long tablename, long uid) {
    // TODO Auto-generated method stub
    return mrIdDao.findByUid(tablename, uid);
  }

  @Override
  public boolean generateTable(String tablename) {
    // TODO Auto-generated method stub
    return mrIdDao.generateTable(tablename);
  }

  @Override
  public void updateItemStatus(String tablename, long uid, int status) {
    // TODO Auto-generated method stub

    mrIdDao.updateItemStatus(tablename, uid, status);
  }
}
