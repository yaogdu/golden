package com.home.business;

import com.home.domain.UserSoftware;

public interface UserSoftwareDao {

  public UserSoftware exists(UserSoftware userSoftware);

  public UserSoftware save(UserSoftware userSoftware);
}
