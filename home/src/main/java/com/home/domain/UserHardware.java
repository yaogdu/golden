package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_hw_inventory")
public class UserHardware extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -3066051580552297948L;

  @Id
  @Column(name = "hi_id")
  private long id;

  @Column(name = "u_imei", length = 20)
  private String imei;

  @Column(name = "hi_resolution", length = 20)
  private String resolution;

  @Column(name = "hi_storage")
  private int storage;

  @Column(name = "hi_os")
  private String os;

  public UserHardware() {
  }

  public long getId() {
    return id;
  }

  public String getImei() {
    return imei;
  }

  public String getOs() {
    return os;
  }

  public String getResolution() {
    return resolution;
  }

  public int getStorage() {
    return storage;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setImei(String imei) {
    this.imei = imei;
  }

  public void setOs(String os) {
    this.os = os;
  }

  public void setResolution(String resolution) {
    this.resolution = resolution;
  }

  public void setStorage(int storage) {
    this.storage = storage;
  }
}
