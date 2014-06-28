package com.home.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "t_user")
public class User extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 6141424821301853068L;

  @Id
  @Column(name = "u_id", length = 64)
  private long id;

  @Column(name = "u_name", length = 20)
  private String name;

  @Column(name = "u_login_id", length = 20)
  private String loginId;

  @Column(name = "u_login_pwd", length = 64)
  private String loginPwd;

  @Column(name = "u_gender", length = 1)
  private int gender;

  @Column(name = "u_cell_number", length = 20)
  private String cellNumber;

  @Column(name = "u_marital_status")
  private int maritalStatus;

  @Column(name = "u_has_children")
  private int hasChildren;

  @Column(name = "u_work_status")
  private int workStatus;

  @Column(name = "u_income", length = 15)
  private String income;

  @Column(name = "u_industry", length = 20)
  private String industry;

  @Column(name = "u_title", length = 20)
  private String title;

  @Column(name = "u_interest")
  private String interest;

  @Column(name = "u_buy_willing")
  private String buyWilling;

  @Column(name = "u_bank_name", length = 64)
  private String bankName;

  @Column(name = "u_bank_account", length = 20)
  private String account;

  @Column(name = "u_account_name")
  private String accountName;

  @Column(name = "u_sessionid", length = 20)
  private String sessionId;

  @Column(name = "u_imei", length = 30)
  private String imei;

  @Column(name = "last_heart_beat", length = 20)
  private long lastHeartBeat;

  @Column(name = "u_account_status", length = 20)
  private String accountStatus;

  public User() {
  }

  public String getAccount() {
    return account;
  }

  public String getAccountName() {
    return accountName;
  }

  public String getAccountStatus() {
    return accountStatus;
  }

  public String getBankName() {
    return bankName;
  }

  public String getBuyWilling() {
    return buyWilling;
  }

  public String getCellNumber() {
    return cellNumber;
  }

  public int getGender() {
    return gender;
  }

  public int getHasChildren() {
    return hasChildren;
  }

  public long getId() {
    return id;
  }

  public String getImei() {
    return imei;
  }

  public String getIncome() {
    return income;
  }

  public String getIndustry() {
    return industry;
  }

  public String getInterest() {
    return interest;
  }

  public long getLastHeartBeat() {
    return lastHeartBeat;
  }

  public String getLoginId() {
    return loginId;
  }

  public String getLoginPwd() {
    return loginPwd;
  }

  public int getMaritalStatus() {
    return maritalStatus;
  }

  public String getName() {
    return name;
  }

  public String getSessionId() {
    return sessionId;
  }

  public String getTitle() {
    return title;
  }

  public int getWorkStatus() {
    return workStatus;
  }

  public void setAccount(String account) {
    this.account = account;
  }

  public void setAccountName(String accountName) {
    this.accountName = accountName;
  }

  public void setAccountStatus(String accountStatus) {
    this.accountStatus = accountStatus;
  }

  public void setBankName(String bankName) {
    this.bankName = bankName;
  }

  public void setBuyWilling(String buyWilling) {
    this.buyWilling = buyWilling;
  }

  public void setCellNumber(String cellNumber) {
    this.cellNumber = cellNumber;
  }

  public void setGender(int gender) {
    this.gender = gender;
  }

  public void setHasChildren(int hasChildren) {
    this.hasChildren = hasChildren;
  }

  public void setId(long id) {
    this.id = id;
  }

  public void setImei(String imei) {
    this.imei = imei;
  }

  public void setIncome(String income) {
    this.income = income;
  }

  public void setIndustry(String industry) {
    this.industry = industry;
  }

  public void setInterest(String interest) {
    this.interest = interest;
  }

  public void setLastHeartBeat(long lastHeartBeat) {
    this.lastHeartBeat = lastHeartBeat;
  }

  public void setLoginId(String loginId) {
    this.loginId = loginId;
  }

  public void setLoginPwd(String loginPwd) {
    this.loginPwd = loginPwd;
  }

  public void setMaritalStatus(int maritalStatus) {
    this.maritalStatus = maritalStatus;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void setSessionId(String sessionId) {
    this.sessionId = sessionId;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setWorkStatus(int workStatus) {
    this.workStatus = workStatus;
  }
}
