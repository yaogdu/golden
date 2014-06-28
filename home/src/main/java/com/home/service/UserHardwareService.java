package com.home.service;

import com.home.domain.UserHardware;

public interface UserHardwareService {

  public UserHardware findyHardware(String imei);

  public UserHardware save(UserHardware userHardware);
}
