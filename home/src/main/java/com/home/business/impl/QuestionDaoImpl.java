package com.home.business.impl;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.QuestionDao;
import com.home.domain.Question;

public class QuestionDaoImpl extends BaseEntityDao<Question> implements QuestionDao {

  private static final Logger logger = Logger.getLogger(QuestionDaoImpl.class);

  @Override
  @Transactional
  public void createQuestions(List<Question> questions) {
    // TODO Auto-generated method stub

    for (Question q : questions) {
      super.save(q);
    }

  }

  @Override
  public Class<Question> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

}
