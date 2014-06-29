package com.home.business.impl;

import java.util.List;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.BaseEntityDao;
import com.home.business.MrDao;
import com.home.domain.AppPromotion;
import com.home.domain.MarketingResearch;

public class MrDaoImpl extends BaseEntityDao<MarketingResearch> implements MrDao {

  @Override
  @Transactional
  public MarketingResearch createOne(MarketingResearch mr) {
    // TODO Auto-generated method stub
    return super.save(mr);
  }

  @Override
  public List<MarketingResearch> CustomizedMr(long ts, long uid) {
    String sql =
        "select mr.*, uh.uh_status status "
            + " from t_marketing_research  mr left join t_resource r on (mr.mr_id=r.r_owner_id and r.r_owner_type=1 ) "
            + " left join t_user_history uh on(mr.mr_id=uh.uh_item_id and uh.u_id=?1) " + " where mr.mr_id>?2 order by mr.mr_id desc";
    // String sql=""select * from t_marketing_research where mr_id in (select uh_id from
    // t_user_history where uh_type=1 and u_id=?1 and uh_status!=5 and uh_id>?2 order by uh_id desc
    // ) order by mr_id desc"";
    Query query = em.createNativeQuery(sql, MarketingResearch.class);
    query.setParameter(1, uid);
    query.setParameter(2, ts);

    return (List<MarketingResearch>) query.getResultList();
  }

  @Override
  public MarketingResearch findById(long mrId) {
    // TODO Auto-generated method stub
    return super.getById(mrId);
  }

  @Override
  public Class<MarketingResearch> getEntityType() {
    return MarketingResearch.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  public List<MarketingResearch> historyByUid(long uid, int pageSize, int pageNo) {
    Query query =
        em.createNativeQuery(
            "select mr.* from t_marketing_research mr  left join t_user_history uh on (mr.mr_id=uh.uh_item_id)  where uh.uh_type=1   and uh.uh_status>=1 and  uh.u_id=?1  limit ?2,?3 ",
            MarketingResearch.class);
    query.setParameter(2, pageSize * (pageNo - 1));
    query.setParameter(3, pageNo);

    return (List<MarketingResearch>) query.getResultList();
  }

  @Override
  public List<MarketingResearch> publicMr(long ts) {
    Query query =
        em.createNativeQuery(
            "select * from t_marketing_research m left join t_resource r on(m.mr_id=r.r_owner_id and r_owner_type=1) where mr_id>?1 order by mr_id desc ",
            MarketingResearch.class);
    query.setParameter(1, ts);

    // query.setParameter(1, pageSize * (pageNo - 1));
    // query.setParameter(2, pageSize);

    return (List<MarketingResearch>) query.getResultList();
  }

}
