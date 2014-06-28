package com.home.service;

import com.home.domain.Software;

public interface SoftwareService {

  public Software exists(Software software);

  public Software save(Software software);
}
