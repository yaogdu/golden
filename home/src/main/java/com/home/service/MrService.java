package com.home.service;

import java.util.List;

import com.home.domain.MarketingResearch;

public interface MrService {

  public MarketingResearch createOne(MarketingResearch mr);

  public List<MarketingResearch> CustomizedMr(long ts, long uid);

  public MarketingResearch findById(long mrId);

  public List<MarketingResearch> historyByUid(long uid, int pageSize, int pageNo);

  public List<MarketingResearch> publicMr(long ts);
}
