package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.AdDao;
import com.home.domain.Advertisement;
import com.home.service.AdService;

public class AdServiceImpl implements AdService {

  @Autowired
  AdDao adDao;

  @Override
  public Advertisement createOne(Advertisement ad) {
    // TODO Auto-generated method stub
    return adDao.createOne(ad);
  }

  @Override
  public List<Advertisement> CustomizedAd(long ts, long uid) {
    // TODO Auto-generated method stub
    return adDao.CustomizedAd(ts, uid);
  }

  @Override
  public Advertisement findById(long adId) {
    // TODO Auto-generated method stub
    return adDao.findById(adId);
  }

  @Override
  public List<Advertisement> historyByUid(long uid, int pageSize, int pageNo) {
    // TODO Auto-generated method stub
    return adDao.historyByUid(uid, pageSize, pageNo);
  }

  @Override
  public List<Advertisement> publicAd(long ts) {
    // TODO Auto-generated method stub
    return adDao.publicAd(ts);
  }

}
