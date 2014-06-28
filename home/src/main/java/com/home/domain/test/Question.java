package com.home.domain.test;

import java.io.Serializable;

public class Question implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = -6970879908850074176L;

  private String answerID;

  private String answerText;

  public Question() {
  }

  public String getAnswerID() {
    return answerID;
  }

  public String getAnswerText() {
    return answerText;
  }

  public void setAnswerID(String answerID) {
    this.answerID = answerID;
  }

  public void setAnswerText(String answerText) {
    this.answerText = answerText;
  }
}
