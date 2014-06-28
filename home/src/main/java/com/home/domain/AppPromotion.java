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
@Table(name = "t_app_promotion")
public class AppPromotion extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 4632440605825818843L;

  @Id
  @Column(name = "ap_id", length = 20)
  private long id;

  @Column(name = "expire")
  private int expire;

  @Column(name = "ap_title", length = 64)
  private String title;

  @Column(name = "ap_description")
  private String description;

  @Column(name = "ap_logo_url")
  private String logoURL;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "s_id")
  private Sponsor sponsor;

  @Column(name = "ap_total_reward", length = 20)
  private String totalReward;

  @Column(name = "ap_individual_reward", length = 20)
  private String individualReward;

  @Column(name = "ap_resouce_url")
  private String resourceURL;

  @Column(name = "ap_app_platform")
  private int platform;

  @Column(name = "ap_app_size", length = 10)
  private String size;

  @Column(name = "ap_package_name", length = 100)
  private String packageName;

  public AppPromotion() {
  }

  public String getDescription() {
    return description;
  }

  public int getExpire() {
    return expire;
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

  public String getPackageName() {
    return packageName;
  }

  public int getPlatform() {
    return platform;
  }

  public String getResourceURL() {
    return resourceURL;
  }

  public String getSize() {
    return size;
  }

  public Sponsor getSponsor() {
    return sponsor;
  }

  public String getTitle() {
    return title;
  }

  public String getTotalReward() {
    return totalReward;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public void setExpire(int expire) {
    this.expire = expire;
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

  public void setPackageName(String packageName) {
    this.packageName = packageName;
  }

  public void setPlatform(int platform) {
    this.platform = platform;
  }

  public void setResourceURL(String resourceURL) {
    this.resourceURL = resourceURL;
  }

  public void setSize(String size) {
    this.size = size;
  }

  public void setSponsor(Sponsor sponsor) {
    this.sponsor = sponsor;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setTotalReward(String totalReward) {
    this.totalReward = totalReward;
  }
}
