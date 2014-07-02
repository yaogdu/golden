package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.MrDao;
import com.home.business.UserHistoryDao;
import com.home.domain.Advertisement;
import com.home.domain.MarketingResearch;
import com.home.domain.UserHistory;
import com.home.global.dict.AppType.HistoryType;
import com.home.service.MrService;

public class MrServiceImpl implements MrService {

  @Autowired
  MrDao mrDao;

  @Autowired
  UserHistoryDao userHistoryDao;

  @Override
  public MarketingResearch createOne(MarketingResearch mr) {
    // TODO Auto-generated method stub
    return mrDao.createOne(mr);
  }

  @Override
  public List<MarketingResearch> CustomizedMr(long ts, long uid) {
    // TODO Auto-generated method stub

    List<MarketingResearch> mrs = mrDao.CustomizedMr(ts, uid);
    StringBuffer sb = new StringBuffer();
    for (MarketingResearch mr : mrs) {
      sb.append(mr.getId() + ",");
    }
    String itemId = sb.toString();
    if (itemId != null && itemId.contains(",")) {
      itemId = itemId.substring(0, itemId.length() - 1);
    }

    if (!("").equals(itemId)) {

      List<UserHistory> uhs = userHistoryDao.getStatus(HistoryType.MR, itemId, uid);

      for (MarketingResearch mr : mrs) {
        for (UserHistory uh : uhs) {
          if (mr.getId() == uh.getUhId()) {
            mr.setStatus(uh.getStatus());
          }
        }
      }
    }

    return mrs;
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
