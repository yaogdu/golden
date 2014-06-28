package com.home.domain.vo;

import java.io.Serializable;
import java.util.List;

import javax.persistence.MappedSuperclass;

import com.home.domain.UserHardware;
import com.home.domain.UserSoftware;

@MappedSuperclass
public class StartupVo implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -1663918476977854483L;

  private String imei;

  private UserHardware hardware;

  private List<UserSoftware> softwares;

  public StartupVo() {
  }

  public UserHardware getHardware() {
    return hardware;
  }

  public String getImei() {
    return imei;
  }

  public List<UserSoftware> getSoftwares() {
    return softwares;
  }

  public void setHardware(UserHardware hardware) {
    this.hardware = hardware;
  }

  public void setImei(String imei) {
    this.imei = imei;
  }

  public void setSoftwares(List<UserSoftware> softwares) {
    this.softwares = softwares;
  }

}
