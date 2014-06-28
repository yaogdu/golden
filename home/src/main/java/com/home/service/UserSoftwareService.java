package com.home.service;

import com.home.domain.UserSoftware;

public interface UserSoftwareService {

  public UserSoftware exists(UserSoftware userSoftware);

  public UserSoftware save(UserSoftware userSoftware);
}
