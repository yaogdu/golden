package com.home.business.impl;

import java.util.List;

import org.apache.log4j.Logger;

import com.home.business.AnswerDao;
import com.home.business.BaseEntityDao;
import com.home.domain.Answer;

public class AnswerDaoImpl extends BaseEntityDao<Answer> implements AnswerDao {

  private static final Logger logger = Logger.getLogger(AnswerDaoImpl.class);

  @Override
  public void createAnswers(List<Answer> answers) {

    logger.info("create answers begins");
    for (Answer a : answers) {
      super.save(a);
    }
    logger.info("create answers ends");
  }

  @Override
  public Class<Answer> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

}
