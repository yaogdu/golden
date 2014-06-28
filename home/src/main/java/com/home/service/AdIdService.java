package com.home.service;

import com.home.domain.AdID;

public interface AdIdService {

  public void answerItem(AdID adId);

  public AdID createOne(AdID adId);

  public AdID findByUid(long tablename, long uid);

  public boolean generateTable(String tablename);

  public void updateItemStatus(String tablename, long uid, int status);
}
