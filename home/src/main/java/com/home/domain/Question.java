package com.home.domain;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.json.JSONObject;

@Entity
@Table(name = "t_question")
public class Question extends BaseEntity implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -3243269220276019730L;

  @Id
  @Column(name = "q_id", length = 20)
  private long id;

  @Column(name = "q_name", length = 200)
  private String name;

  @Column(name = "q_alias", length = 200)
  private String alias;

  // 0 选择题，1 问答题
  @Column(name = "q_type")
  private int type;

  // ad ,mr ,ap
  @Column(name = "q_owner_type")
  private int ownerType;

  // ad , mr , ap id
  @Column(name = "q_owner_id", length = 20)
  private long ownerId;

  @OneToMany(mappedBy = "questionId", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Answer> answers;

  public String getAlias() {
    return alias;
  }

  public List<Answer> getAnswers() {
    return answers;
  }

  public long getId() {
    return id;
  }

  public String getName() {
    try {
      if (name != null && !("").equals(name)) {
        return new JSONObject(name).toString();
      }
    } catch (Exception e) {

    }
    return name;
  }

  public long getOwnerId() {
    return ownerId;
  }

  public int getOwnerType() {
    return ownerType;
  }

  public int getType() {
    return type;
  }

  public void setAlias(String alias) {
    this.alias = alias;
  }

  public void setAnswers(List<Answer> answers) {
    this.answers = answers;
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

  public void setOwnerType(int ownerType) {
    this.ownerType = ownerType;
  }

  public void setType(int type) {
    this.type = type;
  }

}
