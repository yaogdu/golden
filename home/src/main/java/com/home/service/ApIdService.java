package com.home.service;

import com.home.domain.AdID;
import com.home.domain.ApID;

public interface ApIdService {

  public void answerItem(ApID apId);

  public AdID createOne(ApID apid);

  public ApID findByUid(long tablename, long uid);

  public boolean generateTable(String tablename);

  public void updateItemStatus(String tablename, long uid, int status);
}
