package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.MrDao;
import com.home.domain.MarketingResearch;
import com.home.service.MrService;

public class MrServiceImpl implements MrService {

  @Autowired
  MrDao mrDao;

  @Override
  public MarketingResearch createOne(MarketingResearch mr) {
    // TODO Auto-generated method stub
    return mrDao.createOne(mr);
  }

  @Override
  public List<MarketingResearch> CustomizedMr(long ts, long uid) {
    // TODO Auto-generated method stub
    return mrDao.CustomizedMr(ts, uid);
  }

  @Override
  public MarketingResearch findById(long mrId) {
    // TODO Auto-generated method stub
    return mrDao.findById(mrId);
  }

  @Override
  public List<MarketingResearch> historyByUid(long uid, int pageSize, int pageNo) {
    // TODO Auto-generated method stub
    return mrDao.historyByUid(uid, pageSize, pageNo);
  }

  @Override
  public List<MarketingResearch> publicMr(long ts) {
    // TODO Auto-generated method stub
    return mrDao.publicMr(ts);
  }

}
