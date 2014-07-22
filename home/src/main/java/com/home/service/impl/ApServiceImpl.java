package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.ApDao;
import com.home.business.UserHistoryDao;
import com.home.domain.AppPromotion;
import com.home.domain.UserHistory;
import com.home.global.dict.AppType.HistoryType;
import com.home.service.ApService;

public class ApServiceImpl implements ApService {

  @Autowired
  ApDao apDao;

  @Autowired
  UserHistoryDao userHistoryDao;

  @Override
  public AppPromotion createOne(AppPromotion ap) {
    // TODO Auto-generated method stub
    return apDao.createOne(ap);
  }

  @Override
  public List<AppPromotion> CustomizedAp(long ts, long uid) {

    List<AppPromotion> aps = apDao.CustomizedAp(ts, uid);
    StringBuffer sb = new StringBuffer();
    for (AppPromotion ap : aps) {
      sb.append(ap.getId() + ",");
    }
    String itemId = sb.toString();
    if (itemId != null && itemId.contains(",")) {
      itemId = itemId.substring(0, itemId.length() - 1);
    }
    if (!("").equals(itemId)) {

      List<UserHistory> uhs = userHistoryDao.getStatus(HistoryType.AP, itemId, uid);

      for (AppPromotion ap : aps) {
        for (UserHistory uh : uhs) {
          if (ap.getId() == uh.getUhId()) {
            ap.setStatus(uh.getStatus());
          }
        }
      }
    }

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

  @Override
  public void update(AppPromotion app) {
    // TODO Auto-generated method stub
    apDao.update(app);
  }

}
