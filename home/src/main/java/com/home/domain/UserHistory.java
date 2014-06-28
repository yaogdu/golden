package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_user_history")
public class UserHistory extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -6613704732924761137L;

  @Id
  @Column(name = "uh_id")
  private long id;

  @Column(name = "u_id")
  private long uid;

  @Column(name = "uh_type")
  private int type;

  // ad,mr,ap id
  @Column(name = "uh_item_id")
  private long uhId;

  @Column(name = "uh_status")
  private int status;

  public UserHistory() {
  }

  public long getId() {
    return id;
  }

  public int getStatus() {
    return status;
  }

  public int getType() {
    return type;
  }

  public long getUhId() {
    return uhId;
  }

  public long getUid() {
    return uid;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setType(int type) {
    this.type = type;
  }

  public void setUhId(long uhId) {
    this.uhId = uhId;
  }

  public void setUid(long uid) {
    this.uid = uid;
  }

}
