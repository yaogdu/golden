package com.home.domain;

import java.io.Serializable;

import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class ObjectVo implements Serializable {

  /**
   * @author poppets Purpose update ad/mr/ap status
   */
  private static final long serialVersionUID = 3311081220210872909L;

  private long uid;// user id

  private long objId;// ad/mr/apid

  private int status;

  public long getObjId() {
    return objId;
  }

  public int getStatus() {
    return status;
  }

  public long getUid() {
    return uid;
  }

  public void setObjId(long objId) {
    this.objId = objId;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setUid(long uid) {
    this.uid = uid;
  }

}
