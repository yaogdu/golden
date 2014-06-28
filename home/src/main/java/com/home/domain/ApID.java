package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class ApID extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -2238662570361557487L;

  @Id
  @Column(name = "u_id", length = 20)
  private long uid;// user id
  // @Transient
  private long ap;// apid

  @Column(name = "ap_status")
  private int status;

  @Column(name = "ap_comments")
  private String comments;

  public ApID() {
  }

  public long getAp() {
    return ap;
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

  public void setAp(long ap) {
    this.ap = ap;
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
