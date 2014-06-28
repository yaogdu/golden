package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_sw_type")
public class Software extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 8965840924693834009L;

  @Id
  @Column(name = "st_id")
  private long id;

  @Column(name = "s_package_type", length = 20)
  private String packageType;

  @Column(name = "s_package_name")
  private String packageName;

  public Software() {
  }

  public long getId() {
    return id;
  }

  public String getPackageName() {
    return packageName;
  }

  public String getPackageType() {
    return packageType;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setPackageName(String packageName) {
    this.packageName = packageName;
  }

  public void setPackageType(String packageType) {
    this.packageType = packageType;
  }

}
