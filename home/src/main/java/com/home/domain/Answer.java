package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_answer")
public class Answer extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -551109311513365259L;

  @Id
  @Column(name = "a_id", length = 20)
  private long id;

  @Column(name = "a_name", length = 64)
  private String name;

  @Column(name = "u_id", length = 64)
  private long uid;

  // mr id
  @Column(name = "a_owner_id", length = 20)
  private long ownerId;

  // question id
  @Column(name = "a_q_id", length = 20)
  private long qId;

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public long getOwnerId() {
    return ownerId;
  }

  public long getqId() {
    return qId;
  }

  public long getUid() {
    return uid;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setOwnerId(long ownerId) {
    this.ownerId = ownerId;
  }

  public void setqId(long qId) {
    this.qId = qId;
  }

  public void setUid(long uid) {
    this.uid = uid;
  }

}
