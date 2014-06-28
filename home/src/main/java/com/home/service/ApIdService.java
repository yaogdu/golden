package com.home.service;

import com.home.domain.ApID;

public interface ApIdService {

  public void answerItem(ApID apId);

  public ApID findByUid(long tablename, long uid);

  public void updateItemStatus(String tablename, long uid, int status);
}
