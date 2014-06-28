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
@Table(name = "t_user_location")
public class Location extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 4993284596674588678L;

  @Id
  @Column(name = "ul_id")
  private long id;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "u_id")
  private User user;

  @Column(name = "ul_collect_time", length = 20)
  private long collectTime;

  @Column(name = "ul_location", length = 64)
  private String location;

  public Location() {
  }

  public long getCollectTime() {
    return collectTime;
  }

  public long getId() {
    return id;
  }

  public String getLocation() {
    return location;
  }

  public User getUser() {
    return user;
  }

  public void setCollectTime(long collectTime) {
    this.collectTime = collectTime;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public void setUser(User user) {
    this.user = user;
  }

}
