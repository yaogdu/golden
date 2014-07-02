package com.home.controller;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.Callable;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.task.AsyncTaskExecutor;
import org.springframework.core.task.SimpleAsyncTaskExecutor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.home.domain.Advertisement;
import com.home.domain.AppPromotion;
import com.home.domain.Location;
import com.home.domain.MarketingResearch;
import com.home.domain.User;
import com.home.domain.UserHistory;
import com.home.domain.vo.CustomizedPageVo;
import com.home.global.dict.AppStatus.HistoryStatus;
import com.home.global.dict.AppType.HistoryType;
import com.home.global.dict.ReturnCode;
import com.home.global.util.PwdUtil;
import com.home.service.AdIdService;
import com.home.service.AdService;
import com.home.service.ApIdService;
import com.home.service.ApService;
import com.home.service.LocationService;
import com.home.service.MrIdService;
import com.home.service.MrService;
import com.home.service.UserHistoryService;
import com.home.service.UserService;

@Controller
@RequestMapping("/heartbeat")
public class HeartBeatController {

  public static void main(String[] args) throws JsonGenerationException, JsonMappingException, IOException {
    String pwd = "123456";
    System.out.println(PwdUtil.encypt(pwd));

  }

  private final Logger logger = Logger.getLogger(HeartBeatController.class);

  @Autowired
  AdService adService;

  @Autowired
  MrService mrService;

  @Autowired
  ApService apService;

  @Autowired
  UserHistoryService userHistoryService;

  @Autowired
  UserService userService;

  @Autowired
  LocationService locationService;

  @Autowired
  ApIdService apIdService;

  @Autowired
  AdIdService adIdService;

  @Autowired
  MrIdService mrIdService;

  @RequestMapping(value = "/c", method = RequestMethod.GET)
  @ResponseBody
  public Callable<String> c() {

    return new Callable<String>() {

      @Override
      public String call() throws Exception {
        JSONObject result = new JSONObject();
        final List<Advertisement> ads = adService.publicAd(0);

        final List<MarketingResearch> mrs = mrService.publicMr(0);

        final List<AppPromotion> aps = apService.publicAp(0);

        if (ads != null && ads.size() > 0) {
          result.put("ads", ads);

        } else {
          result.put("ads", new JSONArray());
        }

        if (mrs != null && mrs.size() > 0) {
          result.put("mrs", mrs);
        } else {
          result.put("mrs", new JSONArray());
        }

        if (aps != null && aps.size() > 0) {
          result.put("aps", aps);
        } else {
          result.put("aps", new JSONArray());
        }
        return result.toString();
      }

    };
  }

  @RequestMapping(value = "/customized", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String customizedPage(@RequestBody CustomizedPageVo cp) throws JSONException, JsonGenerationException, JsonMappingException,
      IOException {
    logger.info("public page to get latest AD/MR/AP packages");

    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();

    if (cUser.isAuthenticated()) {

      Location location = new Location();
      long uid = location.getUser().getId();

      location.setCollectTime(System.currentTimeMillis());
      location.setId(System.currentTimeMillis());
      final User user = userService.findById(uid);// fetch user from db
      location.setUser(user);
      locationService.CollectLocation(location);// save location to db

      user.setLastHeartBeat(System.currentTimeMillis());

      userService.save(user);// change last heart beat time

      ObjectMapper om = new ObjectMapper();

      final List<Advertisement> ads = adService.CustomizedAd(cp.getTs(), user.getId());

      final List<MarketingResearch> mrs = mrService.CustomizedMr(cp.getTs(), user.getId());

      final List<AppPromotion> aps = apService.CustomizedAp(cp.getTs(), user.getId());

      if (ads != null && ads.size() > 0) {
        result.put("ads", om.writeValueAsString(ads));
      } else {
        result.put("ads", "");
      }

      if (mrs != null && mrs.size() > 0) {
        result.put("mrs", om.writeValueAsString(mrs));
      } else {
        result.put("mrs", "");
      }

      if (aps != null && aps.size() > 0) {
        result.put("aps", om.writeValueAsString(aps));
      } else {
        result.put("aps", "");
      }
      try {
        AsyncTaskExecutor executor = new SimpleAsyncTaskExecutor();// webAsyncTask.getexecutor()
        executor.submit(new Callable<String>() {

          @Override
          public String call() throws Exception {

            final long uid = user.getId();
            for (Advertisement ad : ads) {
              UserHistory uh = new UserHistory();

              uh.setUid(uid);
              uh.setStatus(HistoryStatus.PUSHED);
              uh.setType(HistoryType.AD);
              uh.setUhId(ad.getId());
              userHistoryService.updateHistoryStatus(uh);
              adIdService.updateItemStatus(ad.getId() + "", uid, HistoryStatus.PUSHED);

            }

            for (MarketingResearch mr : mrs) {
              UserHistory uh = new UserHistory();
              uh.setUid(uid);
              uh.setStatus(HistoryStatus.PUSHED);
              uh.setType(HistoryType.MR);
              uh.setUhId(mr.getId());
              userHistoryService.updateHistoryStatus(uh);
              mrIdService.updateItemStatus(mr.getId() + "", uid, HistoryStatus.PUSHED);
            }

            for (AppPromotion ap : aps) {
              UserHistory uh = new UserHistory();
              uh.setUid(uid);
              uh.setStatus(HistoryStatus.PUSHED);
              uh.setType(HistoryType.AP);
              uh.setUhId(ap.getId());
              userHistoryService.updateHistoryStatus(uh);
              apIdService.updateItemStatus(ap.getId() + "", uid, HistoryStatus.PUSHED);
            }

            return "";
          }
        });
        result.put("ts", System.currentTimeMillis());
        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "成功");
        return result.toString();
      } catch (Exception e) {
        result.put("ts", System.currentTimeMillis());
        result.put("returncode", ReturnCode.code500);
        result.put("success", false);
        result.put("msg", "服务器出现错误");
        return result.toString();
      }

    } else {
      result.put("ts", System.currentTimeMillis());
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order to
      return result.toString(); // inform user loging in or invoke public heartbeat
    }

  }

  @RequestMapping(value = "/public/{timestamp}/{imei}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String publicPage(@PathVariable("timestamp") final long ts, @PathVariable("imei") final String imei) throws JSONException,
      JsonGenerationException, JsonMappingException, IOException {
    logger.info("public page to get latest AD/MR/AP packages");

    final User user = userService.ImeiMappedToUser(imei);

    JSONObject result = new JSONObject();

    // ObjectMapper om = new ObjectMapper();

    final List<Advertisement> ads = adService.CustomizedAd(ts, Long.parseLong("1400902079012"));

    final List<MarketingResearch> mrs = mrService.CustomizedMr(ts, Long.parseLong("1400902079012"));

    final List<AppPromotion> aps = apService.CustomizedAp(ts, Long.parseLong("1400902079012"));

    // final List<Advertisement> ads = adService.publicAd(ts);
    //
    // final List<MarketingResearch> mrs = mrService.publicMr(ts);
    //
    // final List<AppPromotion> aps = apService.publicAp(ts);

    if (ads != null && ads.size() > 0) {
      result.put("ads", ads);

    } else {
      result.put("ads", new JSONArray());
    }

    if (mrs != null && mrs.size() > 0) {
      result.put("mrs", mrs);
    } else {
      result.put("mrs", new JSONArray());
    }

    if (aps != null && aps.size() > 0) {
      result.put("aps", aps);
    } else {
      result.put("aps", new JSONArray());
    }
    try {

      // AsyncTaskExecutor executor = new SimpleAsyncTaskExecutor();// webAsyncTask.getexecutor()
      // executor.submit(new Callable<String>() {
      //
      // @Override
      // public String call() throws Exception {
      //
      // // TODO changed:save userhistory to db
      //
      // long uid = 0;
      // if (user != null) {
      // uid = user.getId();
      // }
      // for (Advertisement ad : ads) {
      // UserHistory uh = new UserHistory();
      // Thread.sleep(1);
      // uh.setUid(uid);
      // uh.setId(System.currentTimeMillis());
      // uh.setStatus(HistoryStatus.PUSHED);
      // uh.setType(HistoryType.AD);
      // uh.setUhId(ad.getId());
      // userHistoryService.recordPublicHeartBeat(uh);
      // }
      //
      // for (MarketingResearch mr : mrs) {
      // UserHistory uh = new UserHistory();
      // Thread.sleep(1);
      // uh.setUid(uid);
      // uh.setId(System.currentTimeMillis());
      // uh.setStatus(HistoryStatus.PUSHED);
      // uh.setType(HistoryType.MR);
      // uh.setUhId(mr.getId());
      // userHistoryService.recordPublicHeartBeat(uh);
      // }
      //
      // for (AppPromotion ap : aps) {
      // UserHistory uh = new UserHistory();
      // Thread.sleep(1);
      // uh.setUid(uid);
      // uh.setId(System.currentTimeMillis());
      // uh.setStatus(HistoryStatus.PUSHED);
      // uh.setType(HistoryType.AP);
      // uh.setUhId(ap.getId());
      // userHistoryService.recordPublicHeartBeat(uh);
      // }
      //
      // return "";
      // }
      // });
      result.put("ts", System.currentTimeMillis());
      result.put("returncode", ReturnCode.code200);
      result.put("success", true);
      result.put("msg", "成功");
      return result.toString();

    } catch (Exception e) {
      result.put("ts", System.currentTimeMillis());
      result.put("returncode", ReturnCode.code500);
      result.put("success", false);
      result.put("msg", "服务器出现错误");
      return result.toString();
    }

  }
}
