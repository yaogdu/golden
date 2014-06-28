package com.home.business;

import com.home.domain.UserHardware;

public interface UserHardwareDao {

  public UserHardware findyHardware(String imei);

  public UserHardware save(UserHardware userHardware);
}
