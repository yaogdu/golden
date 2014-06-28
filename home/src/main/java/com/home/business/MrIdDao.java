package com.home.business;

import com.home.domain.MrID;

public interface MrIdDao {

  public void answerItem(MrID mrId);

  public MrID createOne(MrID mrId);

  public MrID findByUid(long tablename, long uid);

  public boolean generateTable(String tablename);

  public void updateItemStatus(String tablename, long uid, int status);
}
