package com.home.business.impl;

import java.util.List;

import javax.persistence.Query;

import org.springframework.transaction.annotation.Transactional;

import com.home.business.ApDao;
import com.home.business.BaseEntityDao;
import com.home.domain.AppPromotion;

public class ApDaoImpl extends BaseEntityDao<AppPromotion> implements ApDao {

  @Override
  @Transactional
  public AppPromotion createOne(AppPromotion ap) {
    // TODO Auto-generated method stub
    return super.save(ap);
  }

  @Override
  public List<AppPromotion> CustomizedAp(long ts, long uid) {
    Query query =
        em.createNativeQuery(
            "select * from t_app_promotion where ap_id in (select uh_id from t_user_history where uh_type=2 and u_id=?1 and uh_status!=5 and uh_id>?2 order by uh_id desc  ) order by ap_id desc ",
            AppPromotion.class);
    query.setParameter(1, uid);
    query.setParameter(2, ts);

    // query.setParameter(1, pageSize * (pageNo - 1));
    // query.setParameter(2, pageSize);

    return (List<AppPromotion>) query.getResultList();
  }

  @Override
  public AppPromotion findById(long apId) {
    // TODO Auto-generated method stub
    return super.getById(apId);
  }

  @Override
  public Class<AppPromotion> getEntityType() {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public List<AppPromotion> historyByUid(long uid, int pageSize, int pageNo) {
    Query query =
        em.createNativeQuery(
            "select ap.* from t_app_promotion ap  left join t_user_history uh on (ap.ap_id=uh.uh_item_id)  where uh.uh_type=2   and uh.uh_status>=1 and  uh.u_id=?1  limit ?2,?3 ",
            AppPromotion.class);
    query.setParameter(2, pageSize * (pageNo - 1));
    query.setParameter(3, pageNo);

    return (List<AppPromotion>) query.getResultList();
  }

  @Override
  public List<AppPromotion> publicAp(long ts) {
    Query query =
        em.createNativeQuery(
            "select * from t_app_promotion a left join t_resource r on(a.ap_id=r.r_owner_id and r_owner_type=2) where ap_id>?1 order by ap_id desc",
            AppPromotion.class);
    query.setParameter(1, ts);

    return (List<AppPromotion>) query.getResultList();
  }

}
