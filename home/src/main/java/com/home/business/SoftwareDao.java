package com.home.business;

import com.home.domain.Software;

public interface SoftwareDao {

  public Software exists(Software software);

  public Software save(Software software);
}
