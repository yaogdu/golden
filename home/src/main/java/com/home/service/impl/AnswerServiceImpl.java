package com.home.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.home.business.AnswerDao;
import com.home.domain.Answer;
import com.home.service.AnswerService;

public class AnswerServiceImpl implements AnswerService {

  @Autowired
  AnswerDao answerDao;

  @Override
  public boolean answerMr(List<Answer> answers) {

    try {
      answerDao.createAnswers(answers);
      return true;
    } catch (Exception e) {

    }
    return false;
  }

}
