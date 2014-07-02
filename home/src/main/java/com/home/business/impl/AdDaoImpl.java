package com.home.business.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Query;

import org.apache.log4j.Logger;
import org.springframework.transaction.annotation.Transactional;

import com.home.business.AdDao;
import com.home.business.BaseEntityDao;
import com.home.domain.Advertisement;
import com.home.domain.UserHistory;

public class AdDaoImpl extends BaseEntityDao<Advertisement> implements AdDao {

  private static final Logger logger = Logger.getLogger(AdDaoImpl.class);

  @Override
  @Transactional
  public Advertisement createOne(Advertisement ad) {
    // TODO Auto-generated method stub
    return super.save(ad);
  }

  @Override
  public List<Advertisement> CustomizedAd(long ts, long uid) {
    // String sql =
    // "select a.*, uh.uh_status as status "
    // +
    // " from t_advertisement  a left join t_resource r on (a.ad_id=r.r_owner_id and r.r_owner_type=0 ) "
    // + " left join t_user_history uh on(a.ad_id=uh.uh_item_id and uh.u_id=?1) " +
    // " where a.ad_id>?2 order by a.ad_id desc";

    String sql = "select a  from Advertisement a, UserHistory uh where a.id=uh.uhId and uh.uid=:uid and a.id>:id  ";
    // String
    // sql="select * from t_advertisement where ad_id in (select uh_id from t_user_history where uh_type=0 and uh_status!=5 and u_id=?1 and uh_id>?2 order by uh_id desc  ) order by ad_id desc ";
    // Query query = em.createNativeQuery(sql, Advertisement.class);
    Query query = em.createQuery(sql, Advertisement.class);
    query.setParameter("uid", uid);
    query.setParameter("id", ts);
    logger.info(String.format("select a.*, uh.uh_status ad_status "
        + " from t_advertisement  a left join t_resource r on (a.ad_id=r.r_owner_id and r.r_owner_type=0 ) "
        + " left join t_user_history uh on(a.ad_id=uh.uh_item_id and uh.u_id= %d) " + " where a.ad_id> %d order by a.ad_id desc", uid, ts));

    List<Advertisement> list = (List<Advertisement>) query.getResultList();

    return list;
    // return (List<Advertisement>) query.getResultList();
  }

  @Override
  public Advertisement findById(long adId) {
    // TODO Auto-generated method stub
    return super.getById(adId);
  }

  @Override
  public Class<Advertisement> getEntityType() {
    // TODO Auto-generated method stub
    return Advertisement.class;
  }

  @Override
  @SuppressWarnings("unchecked")
  public List<Advertisement> historyByUid(long uid, int pageSize, int pageNo) {
    Query query =
        em.createNativeQuery(
            "select ad.* from t_advertisement ad  left join t_user_history uh on (ad.ad_id=uh.uh_item_id)  where uh.uh_type=0   and uh.uh_status>1 and  uh.u_id=?1  limit ?2,?3 ",
            Advertisement.class);
    query.setParameter(1, uid);
    query.setParameter(2, pageSize * (pageNo - 1));
    query.setParameter(3, pageNo);

    return (List<Advertisement>) query.getResultList();
  }

  @Override
  public List<Advertisement> publicAd(long ts) {
    // String sql =
    // "select a.*, uh.uh_status " +
    // " from t_advertisement  a left join t_resource r on (a.ad_id=r.r_owner_id and r.r_owner_type=0 ) "
    // + " left join t_user_history uh on(a.ad_id=uh.uh_item_id and uh.u_id=?1) " +
    // " where a.ad_id>?2 order by a.ad_id desc";

    String sql =
        "select * from t_advertisement  a ,  t_resource r  where a.ad_id>?1 and a.ad_id=r.r_owner_id and r.r_owner_type=0 order by a.ad_id desc";
    Query query = em.createNativeQuery(sql, Advertisement.class);
    query.setParameter(1, ts);

    System.out.println("ts===" + ts);
    // query.setParameter(1, pageSize * (pageNo - 1));
    // query.setParameter(2, pageSize);

    return (List<Advertisement>) query.getResultList();
  }
}
