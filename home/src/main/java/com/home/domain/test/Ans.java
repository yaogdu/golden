package com.home.domain.test;

import java.io.Serializable;
import java.util.List;

public class Ans implements Serializable {

  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  private String question;

  private List<Question> answer;

  public Ans() {
  }

  public List<Question> getAnswer() {
    return answer;
  }

  public String getQuestion() {
    return question;
  }

  public void setAnswer(List<Question> answer) {
    this.answer = answer;
  }

  public void setQuestion(String question) {
    this.question = question;
  }

}
