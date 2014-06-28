package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_sponsor")
public class Sponsor extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -2345182514689367347L;

  @Id
  @Column(name = "s_id", length = 20)
  private long id;

  @Column(name = "s_type")
  private int type;

  @Column(name = "s_name", length = 64)
  private String name;

  @Column(name = "s_contact_name", length = 32)
  private String contactName;

  @Column(name = "s_contact_number", length = 20)
  private String contactNumber;

  @Column(name = "s_contact_email", length = 64)
  private String contactEmail;

  public Sponsor() {
  }

  public String getContactEmail() {
    return contactEmail;
  }

  public String getContactName() {
    return contactName;
  }

  public String getContactNumber() {
    return contactNumber;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public int getType() {
    return type;
  }

  public void setContactEmail(String contactEmail) {
    this.contactEmail = contactEmail;
  }

  public void setContactName(String contactName) {
    this.contactName = contactName;
  }

  public void setContactNumber(String contactNumber) {
    this.contactNumber = contactNumber;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setType(int type) {
    this.type = type;
  }
}
