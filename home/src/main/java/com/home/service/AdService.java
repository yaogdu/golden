package com.home.service;

import java.util.List;

import com.home.domain.Advertisement;

public interface AdService {

  public Advertisement createOne(Advertisement ad);

  public List<Advertisement> CustomizedAd(long ts, long uid);

  public Advertisement findById(long adId);

  public List<Advertisement> historyByUid(long uid, int pageSize, int pageNo);

  public List<Advertisement> publicAd(long ts);
}
