package com.home.business;

import com.home.domain.UserHistory;

public interface UserHistoryDao {

  public UserHistory recordPublicHeartBeat(UserHistory userHistory);

  public void updateHistoryStatus(UserHistory uh);

}
