package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class MrID extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -8108809691500861103L;

  @Id
  @Column(name = "u_id", length = 20)
  private long uid;

  // @Transient
  private long mr; // mrid

  @Column(name = "mr_status")
  private int status;

  @Column(name = "mr_a1")
  private String a1;

  @Column(name = "mr_a2")
  private String a2;

  @Column(name = "mr_a3")
  private String a3;

  @Column(name = "mr_a4")
  private String a4;

  @Column(name = "mr_a5")
  private String a5;

  @Column(name = "mr_a6")
  private String a6;

  @Column(name = "mr_a7")
  private String a7;

  @Column(name = "mr_a8")
  private String a8;

  @Column(name = "mr_a9")
  private String a9;

  @Column(name = "mr_a10")
  private String a10;

  public MrID() {
  }

  public String getA1() {
    return a1;
  }

  public String getA10() {
    return a10;
  }

  public String getA2() {
    return a2;
  }

  public String getA3() {
    return a3;
  }

  public String getA4() {
    return a4;
  }

  public String getA5() {
    return a5;
  }

  public String getA6() {
    return a6;
  }

  public String getA7() {
    return a7;
  }

  public String getA8() {
    return a8;
  }

  public String getA9() {
    return a9;
  }

  public long getMr() {
    return mr;
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

  public void setA10(String a10) {
    this.a10 = a10;
  }

  public void setA2(String a2) {
    this.a2 = a2;
  }

  public void setA3(String a3) {
    this.a3 = a3;
  }

  public void setA4(String a4) {
    this.a4 = a4;
  }

  public void setA5(String a5) {
    this.a5 = a5;
  }

  public void setA6(String a6) {
    this.a6 = a6;
  }

  public void setA7(String a7) {
    this.a7 = a7;
  }

  public void setA8(String a8) {
    this.a8 = a8;
  }

  public void setA9(String a9) {
    this.a9 = a9;
  }

  public void setMr(long mr) {
    this.mr = mr;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setUid(long uid) {
    this.uid = uid;
  }
}
