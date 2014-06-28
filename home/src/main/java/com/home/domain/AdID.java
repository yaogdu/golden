package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Table;
import javax.persistence.Transient;

@MappedSuperclass
public class AdID extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 835170992879468958L;

  @Id
  @Column(name = "u_id", length = 20)
  private long uid;// user id

  @Transient
  private long ad;// adid

  @Column(name = "ad_status")
  private int status;

  @Column(name = "ad_a1", length = 100)
  private String a1;

  @Column(name = "ad_a2", length = 100)
  private String a2;

  @Column(name = "ad_a3", length = 100)
  private String a3;

  @Column(name = "ad_comments", length = 255)
  private String comments;

  public String getA1() {
    return a1;
  }

  public String getA2() {
    return a2;
  }

  public String getA3() {
    return a3;
  }

  public long getAd() {
    return ad;
  }

  public String getComments() {
    return comments;
  }

  public int getStatus() {
    return status;
  }

  public long getUid() {
    return uid;
  }

  public void setA1(String a1) {
    this.a1 = a1;
  }

  public void setA2(String a2) {
    this.a2 = a2;
  }

  public void setA3(String a3) {
    this.a3 = a3;
  }

  public void setAd(long ad) {
    this.ad = ad;
  }

  public void setComments(String comments) {
    this.comments = comments;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setUid(long uid) {
    this.uid = uid;
  }
}
