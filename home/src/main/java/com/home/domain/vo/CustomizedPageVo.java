package com.home.domain.vo;

import java.io.Serializable;
import java.sql.Timestamp;

import com.home.domain.Location;

public class CustomizedPageVo implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -2223735964223392587L;

  private long ts;

  private Location location;

  // private int pageSize = 50;
  //
  // private int pageNo = 1;

  public Location getLocation() {
    return location;
  }

  public long getTs() {
    return ts;
  }

  public void setLocation(Location location) {
    this.location = location;
  }

  public void setTs(long ts) {
    this.ts = ts;
  }

}
