package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "t_software_inventory")
public class UserSoftware extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 2003486799476575520L;

  @Id
  @Column(name = "si_id")
  private long id;

  @Column(name = "u_imei")
  private String imei;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "st_id")
  private Software software;

  public UserSoftware() {
  }

  public long getId() {
    return id;
  }

  public String getImei() {
    return imei;
  }

  public Software getSoftware() {
    return software;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setImei(String imei) {
    this.imei = imei;
  }

  public void setSoftware(Software software) {
    this.software = software;
  }
}
