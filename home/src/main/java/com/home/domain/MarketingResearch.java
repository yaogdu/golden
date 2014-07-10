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

@Entity
@Table(name = "t_marketing_research")
public class MarketingResearch extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 6808284659402142535L;

  @Id
  @Column(name = "mr_id", length = 20)
  private long id;

  @Column(name = "mr_title", length = 64)
  private String title;

  @OneToMany(mappedBy = "ownerId", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<Resource> resources;

  @OneToMany(mappedBy = "ownerId", fetch = FetchType.LAZY)
  private List<Question> questions;

  @Column(name = "mr_expire", length = 10)
  private int expire;

  @Column(name = "mr_description")
  private String description;

  @Column(name = "mr_logo_url", length = 100)
  private String logoURL;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "mr_sponsor_id")
  private Sponsor sponsor;

  @Column(name = "mr_total_reward", length = 20)
  private String totalReward;

  @Column(name = "mr_individual_reward", length = 10)
  private String individualReward;

  // @Column(name = "mr_q1", length = 255)
  // private String q1;
  //
  // @Column(name = "mr_q2", length = 255)
  // private String q2;
  //
  // @Column(name = "mr_q3", length = 255)
  // private String q3;
  //
  // @Column(name = "mr_q4", length = 255)
  // private String q4;
  //
  // @Column(name = "mr_q5", length = 255)
  // private String q5;
  //
  // @Column(name = "mr_q6", length = 255)
  // private String q6;
  //
  // @Column(name = "mr_q7", length = 255)
  // private String q7;
  //
  // @Column(name = "mr_q8", length = 255)
  // private String q8;
  //
  // @Column(name = "mr_q9", length = 255)
  // private String q9;
  //
  // @Column(name = "mr_q10", length = 255)
  // private String q10;

  @Transient
  private int status;

  public MarketingResearch() {
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

  // public String getQ1() {
  // return q1;
  // }
  //
  // public String getQ10() {
  // return q10;
  // }
  //
  // public String getQ2() {
  // return q2;
  // }
  //
  // public String getQ3() {
  // return q3;
  // }
  //
  // public String getQ4() {
  // return q4;
  // }
  //
  // public String getQ5() {
  // return q5;
  // }
  //
  // public String getQ6() {
  // return q6;
  // }
  //
  // public String getQ7() {
  // return q7;
  // }
  //
  // public String getQ8() {
  // return q8;
  // }
  //
  // public String getQ9() {
  // return q9;
  // }

  public List<Question> getQuestions() {
    return questions;
  }

  public List<Resource> getResources() {
    return resources;
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

  // public void setQ1(String q1) {
  // this.q1 = q1;
  // }
  //
  // public void setQ10(String q10) {
  // this.q10 = q10;
  // }
  //
  // public void setQ2(String q2) {
  // this.q2 = q2;
  // }
  //
  // public void setQ3(String q3) {
  // this.q3 = q3;
  // }
  //
  // public void setQ4(String q4) {
  // this.q4 = q4;
  // }
  //
  // public void setQ5(String q5) {
  // this.q5 = q5;
  // }
  //
  // public void setQ6(String q6) {
  // this.q6 = q6;
  // }
  //
  // public void setQ7(String q7) {
  // this.q7 = q7;
  // }
  //
  // public void setQ8(String q8) {
  // this.q8 = q8;
  // }
  //
  // public void setQ9(String q9) {
  // this.q9 = q9;
  // }

  public void setQuestions(List<Question> questions) {
    this.questions = questions;
  }

  public void setResources(List<Resource> resources) {
    this.resources = resources;
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
