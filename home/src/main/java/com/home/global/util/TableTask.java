package com.home.global.util;

import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Random;
import java.util.TimerTask;
import java.util.logging.Logger;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import com.alibaba.fastjson.JSON;
import com.home.domain.AdID;
import com.home.domain.Advertisement;
import com.home.domain.AppPromotion;
import com.home.domain.MarketingResearch;
import com.home.domain.MrID;
import com.home.domain.User;
import com.home.domain.UserHistory;
import com.home.domain.test.Ans;
import com.home.global.dict.AppType.Gender;
import com.home.global.dict.AppType.HasChildren;
import com.home.global.dict.AppType.HistoryType;
import com.home.service.AdIdService;
import com.home.service.AdService;
import com.home.service.ApService;
import com.home.service.MrIdService;
import com.home.service.MrService;
import com.home.service.UserHistoryService;
import com.home.service.UserService;

public class TableTask extends TimerTask {

  public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException, JSONException {
    String q1 =
        "{question:the year of model?,answer:[{answerID:1,answerText:中国},{answerID:2,answerText:1970},{answerID:3,answerText:1990}]}";

    // Ans ans = JSON.parseObject(q1, Ans.class);
    // JSONObject j = JSONObject.fromObject(q1);

    // Ans ans = (Ans) JSONObject.toBean(j, Ans.class);

    // <groupId>com.alibaba</groupId>
    // <artifactId>fastjson</artifactId>
    // <version>1.1.40</version>
    // </dependency>
    //
    // <dependency>
    // <groupId>org.json</groupId>
    // <artifactId>json</artifactId>
    // <version>20090211</version>
    // </dependency>
    // org.json.JSONOjbect
    JSONObject json = new JSONObject(q1);

    json.getString("question");
    json.getJSONArray("answer");

    // com.alibaba.fastjson.JSON
    Ans ans = JSON.parseObject(json.toString(), Ans.class);

  }

  @Autowired
  UserService userService;

  @Autowired
  AdService adService;

  @Autowired
  AdIdService adIdService;

  @Autowired
  UserHistoryService userHistoryService;

  @Autowired
  MrService mrService;

  @Autowired
  MrIdService mrIdService;

  @Autowired
  ApService apService;

  private static final Logger logger = Logger.getLogger(TableTask.class.getName());

  @Override
  public void run() {

    User user = new User();
    user.setAccount(new Random().nextLong() + "");
    user.setAccountName("招行");
    user.setAccountStatus("valid");
    user.setBankName("CMB");
    user.setBuyWilling("car,computer,camera");
    user.setGender(Gender.FEMALE);
    user.setHasChildren(HasChildren.YES);
    user.setId(System.currentTimeMillis());
    user.setImei(Math.abs(new Random().nextInt() * 6) + "");
    user.setIncome(new Random().nextInt(10000) + "");
    user.setLastHeartBeat(user.getId());
    user.setCellNumber(new Random().nextInt(999999999) + "");
    user.setLoginId(user.getCellNumber());
    user.setLoginPwd(PwdUtil.encypt(user.getCellNumber()));
    user.setMaritalStatus(new Random().nextInt(3));
    user.setName("张三");
    user.setSessionId(user.getImei());
    user.setTitle("Engineer");
    user.setWorkStatus(new Random().nextInt(7));
    userService.save(user);

    List<User> users = userService.findTestData(10);

    Advertisement ad = new Advertisement();

    long adId = System.currentTimeMillis();
    ad.setA1("1");
    ad.setA2("2");
    ad.setA3("3");
    ad.setDescription("");
    ad.setExpire(new Random().nextInt(100));
    ad.setFormat(new Random().nextInt(3));
    ad.setId(adId);
    ad.setIndividualReward(new Random().nextInt(10) + "");
    ad.setLogoURL("http://www.52zy.com/upload/2008/4/12/200841223122875539.jpg");
    ad.setQ1("{question:the year of model?,answer:[{answerID:1,answerText:中国},{answerID:2,answerText:1970},{answerID:3,answerText:1990}]}");
    // ad.setQ2(ad.getQ1());
    // ad.setQ3(ad.getQ1());
    ad.setResourceURL(ad.getLogoURL());
    ad.setTitle("汽车ad");
    ad.setTotalReward(new Random().nextInt(100000000) + "");
    adService.createOne(ad);

    adIdService.generateTable(adId + "");

    logger.info("generate table ad_id_" + adId);

    // ----------------------------marketingresearch part--------------------

    MarketingResearch mr = new MarketingResearch();
    long mrId = System.currentTimeMillis();
    mr.setDescription("");
    mr.setExpire(new Random().nextInt(100));
    mr.setId(mrId);
    mr.setIndividualReward(new Random().nextInt(10) + "");
    mr.setLogoURL("http://www.52zy.com/upload/2008/4/12/200841223122875539.jpg");
    // mr.setQ1("{question:the year of model?,answer:[{answerID:1,answerText:1970},{answerID:2,answerText:1970},{answerID:3,answerText:1990}]}");
    // mr.setQ10(mr.getQ1());
    // mr.setQ2(mr.getQ1());
    // mr.setQ3(mr.getQ1());
    // mr.setQ4(mr.getQ1());
    // mr.setQ5(mr.getQ1());
    // mr.setQ6(mr.getQ1());
    // mr.setQ7(mr.getQ1());
    // mr.setQ8(mr.getQ1());
    // mr.setQ9(mr.getQ1());
    mr.setTitle("BMW X5 RESEARCH");
    mr.setTotalReward(new Random().nextInt(100000000) + "");
    mrService.createOne(mr);

    mrIdService.generateTable(mrId + "");

    logger.info("create table mr_id_" + mrId);

    AppPromotion ap = new AppPromotion();

    long apId = System.currentTimeMillis();
    ap.setDescription("");
    ap.setExpire(new Random().nextInt(100));
    ap.setId(apId);
    ap.setIndividualReward(new Random().nextInt(10) + "");
    ap.setLogoURL("");
    ap.setPlatform(new Random().nextInt(2));
    ap.setResourceURL("");
    ap.setSize(new Random().nextInt(20) + "kb");
    ap.setTitle("app manager");
    ap.setTotalReward(new Random().nextInt(1000000) + "");

    apService.createOne(ap);

    for (User u : users) {
      AdID a = new AdID();
      a.setA1(new Random().nextInt(4) + "");
      a.setA2(new Random().nextInt(4) + "");
      a.setA3(new Random().nextInt(4) + "");
      a.setAd(adId);
      a.setStatus(new Random().nextInt(7));
      a.setUid(u.getId());
      adIdService.createOne(a);
      logger.info("insert into table ad_id_" + adId + " with id value " + a.getUid());

      UserHistory uh = new UserHistory();
      try {
        Thread.sleep(1);
        uh.setUid(u.getId());
        uh.setId(System.currentTimeMillis());
        uh.setStatus(a.getStatus());
        uh.setType(HistoryType.AD);
        uh.setUhId(ad.getId());
        userHistoryService.recordPublicHeartBeat(uh);
        logger.info("create userhistory with id value " + uh.getId());
      } catch (InterruptedException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }

      MrID mi = new MrID();
      // mi.setA1(new Random().nextInt(4) + "");
      // mi.setA10(new Random().nextInt(4) + "");
      // mi.setA2(new Random().nextInt(4) + "");
      // mi.setA3(new Random().nextInt(4) + "");
      // mi.setA4(new Random().nextInt(4) + "");
      // mi.setA5(new Random().nextInt(4) + "");
      // mi.setA6(new Random().nextInt(4) + "");
      // mi.setA7(new Random().nextInt(4) + "");
      // mi.setA8(new Random().nextInt(4) + "");
      // mi.setA9(new Random().nextInt(4) + "");
      mi.setMr(mrId);
      mi.setStatus(new Random().nextInt(7));
      mi.setUid(u.getId());

      mrIdService.createOne(mi);

      uh = new UserHistory();
      try {
        Thread.sleep(1);
        uh.setUid(u.getId());
        uh.setId(System.currentTimeMillis());
        uh.setStatus(mi.getStatus());
        uh.setType(HistoryType.MR);
        uh.setUhId(mr.getId());
        userHistoryService.recordPublicHeartBeat(uh);
        logger.info("create userhistory with id value " + uh.getId());
      } catch (InterruptedException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
      }

    }

    System.out.println("execute time is " + Calendar.getInstance().getTime());
  }
}
