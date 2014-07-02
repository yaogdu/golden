package com.home.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.json.JSONObject;

@Entity
@Table(name = "t_advertisement")
public class Advertisement extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -2270596252768925195L;

  @Id
  @Column(name = "ad_id", length = 20)
  private long id;

  @Column(name = "ad_title", length = 64)
  private String title;

  @Column(name = "ad_description")
  private String description;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "ad_sponsor_id")
  private Sponsor sponsor;

  @Column(name = "ad_logo_url")
  private String logoURL;

  @Column(name = "ad_total_reward", length = 20)
  private String totalReward;

  @Column(name = "ad_individual_reward", length = 10)
  private String individualReward;

  @Column(name = "ad_format")
  private int format;

  @Column(name = "ad_expire", length = 10)
  private int expire;

  @OneToMany(mappedBy = "ownerId", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<Resource> resources;

  @Column(name = "ad_resource_url")
  private String resourceURL;

  @Column(name = "ad_q1", length = 255)
  private String q1;

  @Column(name = "ad_q2", length = 255)
  private String q2;

  @Column(name = "ad_q3", length = 255)
  private String q3;

  @Column(name = "ad_a1", length = 64)
  private String a1;

  @Column(name = "ad_a2", length = 64)
  private String a2;

  @Column(name = "ad_a3", length = 64)
  private String a3;

  @Transient
  private int status;

  public Advertisement() {
  }

  public String getA1() {
    return a1;
  }

  public String getA2() {
    return a2;
  }

  public String getA3() {
    return a3;
  }

  public String getDescription() {
    return description;
  }

  public int getExpire() {
    return expire;
  }

  public int getFormat() {
    return format;
  }

  public long getId() {
    return id;
  }

  public String getIndividualReward() {
    return individualReward;
  }

  public String getLogoURL() {
    return logoURL;
  }

  public String getQ1() {
    try {
      if (q1 != null && !("").equals(q1)) {
        return new JSONObject(q1).toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return q1;

  }

  public String getQ2() {
    try {
      if (q2 != null && !("").equals(q2)) {
        return new JSONObject(q2).toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return q2;
  }

  public String getQ3() {
    try {
      if (q3 != null && !("").equals(q3)) {
        return new JSONObject(q3).toString();
      }
    } catch (Exception e) {
      e.printStackTrace();
    }
    return q3;
  }

  public List<Resource> getResources() {
    return resources;
  }

  public String getResourceURL() {
    return resourceURL;
  }

  public Sponsor getSponsor() {
    return sponsor;
  }

  public int getStatus() {
    return status;
  }

  public String getTitle() {
    return title;
  }

  public String getTotalReward() {
    return totalReward;
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

  public void setDescription(String description) {
    this.description = description;
  }

  public void setExpire(int expire) {
    this.expire = expire;
  }

  public void setFormat(int format) {
    this.format = format;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setIndividualReward(String individualReward) {
    this.individualReward = individualReward;
  }

  public void setLogoURL(String logoURL) {
    this.logoURL = logoURL;
  }

  public void setQ1(String q1) {
    this.q1 = q1;
  }

  public void setQ2(String q2) {
    this.q2 = q2;
  }

  public void setQ3(String q3) {
    this.q3 = q3;
  }

  public void setResources(List<Resource> resources) {
    this.resources = resources;
  }

  public void setResourceURL(String resourceURL) {
    this.resourceURL = resourceURL;
  }

  public void setSponsor(Sponsor sponsor) {
    this.sponsor = sponsor;
  }

  public void setStatus(int status) {
    this.status = status;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setTotalReward(String totalReward) {
    this.totalReward = totalReward;
  }
}
