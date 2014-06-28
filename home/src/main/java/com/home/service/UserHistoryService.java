package com.home.service;

import com.home.domain.UserHistory;

public interface UserHistoryService {

  public UserHistory recordPublicHeartBeat(UserHistory userHistory);

  public void updateHistoryStatus(UserHistory uh);
}
