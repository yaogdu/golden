package com.home.service;

import java.util.List;

import com.home.domain.AppPromotion;

public interface ApService {
  public AppPromotion createOne(AppPromotion ap);

  public List<AppPromotion> CustomizedAp(long ts, long uid);

  public AppPromotion findById(long apId);

  public List<AppPromotion> historyByUid(long uid, int pageSize, int pageNo);

  public List<AppPromotion> publicAp(long ts);
}
