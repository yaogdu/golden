package com.home.service.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.UserHistoryDao;
import com.home.domain.UserHistory;
import com.home.service.UserHistoryService;

public class UserHistoryServiceImpl implements UserHistoryService {

  @Autowired
  UserHistoryDao userHistoryDao;

  @Override
  public UserHistory recordPublicHeartBeat(UserHistory userHistory) {
    // TODO Auto-generated method stub
    return userHistoryDao.recordPublicHeartBeat(userHistory);
  }

  @Override
  public void updateHistoryStatus(UserHistory uh) {
    // TODO Auto-generated method stub
    userHistoryDao.updateHistoryStatus(uh);
  }

}
