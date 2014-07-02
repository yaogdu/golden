package com.home.business;

import java.util.List;

import com.home.domain.UserHistory;

public interface UserHistoryDao {

  public List<UserHistory> getStatus(int type, String itemsId, long uid);

  public UserHistory recordPublicHeartBeat(UserHistory userHistory);

  public void updateHistoryStatus(UserHistory uh);

}
