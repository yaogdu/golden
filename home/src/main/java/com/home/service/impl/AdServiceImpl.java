package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.AdDao;
import com.home.business.UserHistoryDao;
import com.home.domain.Advertisement;
import com.home.domain.UserHistory;
import com.home.global.dict.AppType.HistoryType;
import com.home.service.AdService;

public class AdServiceImpl implements AdService {

  @Autowired
  AdDao adDao;

  @Autowired
  UserHistoryDao userHistoryDao;

  @Override
  public Advertisement createOne(Advertisement ad) {
    // TODO Auto-generated method stub
    return adDao.createOne(ad);
  }

  @Override
  public List<Advertisement> CustomizedAd(long ts, long uid) {
    // TODO Auto-generated method stub

    List<Advertisement> ads = adDao.CustomizedAd(ts, uid);
    StringBuffer sb = new StringBuffer();
    for (Advertisement ad : ads) {
      sb.append(ad.getId() + ",");
    }
    String itemId = sb.toString();
    if (itemId != null && itemId.contains(",")) {
      itemId = itemId.substring(0, itemId.length() - 1);
    }
    List<UserHistory> uhs = userHistoryDao.getStatus(HistoryType.AD, itemId, uid);

    for (Advertisement ad : ads) {
      for (UserHistory uh : uhs) {
        if (ad.getId() == uh.getUhId()) {
          ad.setStatus(uh.getStatus());
        }
      }
    }

    return ads;
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
