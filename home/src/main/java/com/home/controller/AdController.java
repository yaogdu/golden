package com.home.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.coobird.thumbnailator.Thumbnails;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.home.domain.AdID;
import com.home.domain.Advertisement;
import com.home.domain.ObjectVo;
import com.home.domain.Resource;
import com.home.domain.User;
import com.home.domain.UserHistory;
import com.home.global.dict.AppFormat;
import com.home.global.dict.AppStatus.HistoryStatus;
import com.home.global.dict.AppType.HistoryType;
import com.home.global.dict.AppType.ResourceType;
import com.home.global.dict.ReturnCode;
import com.home.global.util.CompressPicture;
import com.home.global.util.FileUtil;
import com.home.global.util.VideoCapture;
import com.home.service.AdIdService;
import com.home.service.AdService;
import com.home.service.ResourceService;
import com.home.service.UserHistoryService;
import com.home.service.UserService;

@RequestMapping("/ad")
@Controller
public class AdController {

  private static final Logger logger = Logger.getLogger(AdController.class);

  @Autowired
  AdService adService;

  @Autowired
  UserHistoryService userHistoryService;

  @Autowired
  AdIdService adIdService;

  @Autowired
  FileUtil fileUtil;

  @Autowired
  ResourceService resourceService;

  @Autowired
  UserService userService;

  ExecutorService es = Executors.newFixedThreadPool(10);

  private String ffmpegPath;

  @RequestMapping(value = "/history/{uid}/{pageSize}/{pageNo}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String adHistory(@PathVariable("uid") long uid, @PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo)
      throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    // Subject cUser = SecurityUtils.getSubject();
    logger.info("进入 adhistory");
    JSONObject result = new JSONObject();
    // if (cUser.isAuthenticated()) {
    List<Advertisement> ads = adService.historyByUid(uid, pageSize, pageNo);
    if (ads != null && ads.size() > 0) {
      ObjectMapper om = new ObjectMapper();
      result.put("returncode", ReturnCode.code200);
      result.put("success", true);
      result.put("msg", "查询成功");
      result.put("ads", om.writeValueAsString(ads));
      logger.info("离开 adhistory");
      return result.toString();
    } else {
      result.put("returncode", ReturnCode.code204);
      result.put("success", false);
      result.put("msg", "暂时没有内容");
      result.put("ads", "");
      logger.info("离开 adhistory");
      return result.toString();
    }

    // } else {
    // result.put("returncode", ReturnCode.code101);
    // result.put("success", false);
    // result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order
    // to
    // return result.toString();
    // }

  }

  @RequestMapping(value = "/claim", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String claim(@RequestBody AdID adid) throws JSONException {
    logger.info("进入 ad claim");
    JSONObject result = new JSONObject();
    // Subject cUser = SecurityUtils.getSubject();
    // if (cUser.isAuthenticated()) {
    Advertisement ad = adService.findById(adid.getAd());
    if (ad != null) {
      int expireTime = ad.getExpire();

      if (System.currentTimeMillis() - ad.getId() - expireTime * 24 * 60 * 60 * 1000 <= 0) {

        AdID adId = adIdService.findByUid(adid.getAd(), adid.getUid());
        if (adId != null) {
          if (adId.getStatus() == HistoryStatus.REVIEWED) {
            adIdService.updateItemStatus(adid.getAd() + "", adid.getUid(), HistoryStatus.CLAIMED);

            UserHistory uh = new UserHistory();
            uh.setUid(adid.getUid());
            uh.setStatus(HistoryStatus.CLAIMED);
            uh.setType(HistoryType.AD);
            uh.setUhId(adid.getAd());
            userHistoryService.updateHistoryStatus(uh);
            result.put("returncode", ReturnCode.code200);
            result.put("success", true);
            result.put("msg", "确认成功");
            logger.info("离开 ad claim");
            return result.toString();

          } else {
            result.put("returncode", ReturnCode.code108);
            result.put("success", false);
            result.put("msg", "该项状态不正确");
            logger.info("离开 ad claim");
            return result.toString();
          }
        }
      } else {
        result.put("returncode", ReturnCode.code205);
        result.put("success", false);
        result.put("msg", "该项已过期");
        logger.info("离开 ad claim");
        return result.toString();
      }

    } else {
      result.put("returncode", ReturnCode.code107);
      result.put("success", false);
      result.put("msg", "该广告不存在");
      logger.info("离开 ad claim");
      return result.toString();
    }
    // } else {
    // result.put("returncode", ReturnCode.code101);
    // result.put("success", false);
    // result.put("msg", "请先登录");
    // return result.toString();
    // }

    return result.toString();
  }

  @RequestMapping(value = "/add", method = RequestMethod.POST)
  @ResponseBody
  public String createAd(HttpServletRequest request, @RequestPart MultipartFile file, HttpServletResponse response) throws IOException {
    logger.info("进入");

    String adStr = request.getParameter("ad");

    JSONObject result = new JSONObject();
    try {

      Advertisement ad = JSON.parseObject(adStr, Advertisement.class);

      String[] fileNames = FileUtil.getFileNameOrSuffix(file.getOriginalFilename());

      String fileTypeParent = AppFormat.getParentFormat(fileNames[1]);// .png .jpg to get fileType
                                                                      // parent e.g. pic , video
                                                                      // etc.

      if (null != fileTypeParent && !"".equals(fileTypeParent)) {

        int fileTypeInt = AppFormat.getResourceType(fileNames[1].toUpperCase());// .png .jpg to get
                                                                                // fileType e.g. 0 1
                                                                                // 2 etc.

        Map map = fileUtil.getUploadFileInfo(fileTypeParent.toLowerCase(), fileNames[1], fileUtil.getStoreDir());

        Resource resource = new Resource();
        resource.setFormat(fileNames[1].toLowerCase());
        fileUtil.saveFile(file.getInputStream(), map.get("oriSavePath").toString());

        if (fileTypeInt == ResourceType.PICTURE) {
          CompressPicture.compress(file.getInputStream(), map);
          resource.setThumbnailHeight(Thumbnails.of(file.getInputStream()).scale(0.3f).asBufferedImage().getHeight());
          resource.setThumbnailWidth(Thumbnails.of(file.getInputStream()).scale(0.3f).asBufferedImage().getWidth());
          resource.setMd5(map.get("oriRetPath").toString());
          resource.setThumbnailMd5(map.get("retPath").toString());
        } else if (fileTypeInt == ResourceType.VIDEO) {

          map.put("commandPath", fileUtil.getFfmpegPath());
          map.put("retPath", map.get("retPath").toString().replaceAll(fileNames[1].toLowerCase(), "jpg"));
          map.put("savePath", map.get("savePath").toString().replaceAll(fileNames[1].toLowerCase(), "jpg"));

          final VideoCapture cap = new VideoCapture();
          cap.capture(map);
          final Map m = new HashMap<>(map);
          // if (!"mp4".equals(fileNames[1].toLowerCase())) {

          es.execute(new Runnable() {
            @Override
            public void run() {
              cap.processMP4(m);
            }
          });

          // }

          resource.setMd5(map.get("oriRetPath").toString().replaceAll(fileNames[1], "mp4"));
          resource.setThumbnailMd5(map.get("retPath").toString());
          resource.setThumbnailHeight(240);
          resource.setThumbnailWidth(350);
        }
        long id = System.currentTimeMillis();
        ad.setId(id);
        ad.setFormat(fileTypeInt);
        // ad.setLogoURL(logoURL);
        ad.setResourceURL(map.get("retPath").toString());

        adService.createOne(ad);

        adIdService.generateTable(id + "");
        logger.info("create table ad_id_" + id);

        List<User> users = userService.findTestData(10);

        for (User u : users) {
          AdID a = new AdID();
          a.setA1("");
          a.setA2("");
          a.setA3("");
          a.setAd(id);
          a.setStatus(HistoryStatus.INITED);
          a.setUid(u.getId());
          adIdService.createOne(a);
          logger.info("insert into table ad_id_" + id + " with id value " + a.getUid());

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
            e.printStackTrace();
          }
        }
        System.out.print("fileSize:==" + file.getSize());
        resource.setFileSize(file.getSize());
        resource.setId(System.currentTimeMillis());
        resource.setName(file.getOriginalFilename());
        resource.setOwnerId(id);
        resource.setOwnerType(HistoryType.AD);

        resource.setType(fileTypeInt);

        resourceService.createOne(resource);
      } else {
        result.put("success", false);
        result.put("msg", "格式不正确");
      }
    } catch (Exception e) {
      e.printStackTrace();
      result.put("success", false);
    }

    return result.toString();

  }

  public String getFfmpegPath() {
    return ffmpegPath;
  }

  public void setFfmpegPath(String ffmpegPath) {
    this.ffmpegPath = ffmpegPath;
  }

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  @ResponseBody
  public String test() {
    Subject cUser = SecurityUtils.getSubject();
    if (cUser.isAuthenticated()) {
      adIdService.generateTable(System.currentTimeMillis() + "");
    }
    return "Please log in";
  }

  @RequestMapping(value = "/updateADStatus", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateADStatus(@RequestBody ObjectVo vo) throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    logger.info("update ad status begins");
    JSONObject result = new JSONObject();
    // Subject cUser = SecurityUtils.getSubject();
    // if (cUser.isAuthenticated()) {
    Advertisement ad = adService.findById(vo.getObjId());
    if (ad != null) {
      AdID adId = adIdService.findByUid(vo.getObjId(), vo.getUid());
      if (adId != null) {
        // int status = adId.getStatus();
        // if (status > HistoryStatus.INITED) {// TODO 状态判断

        // logger.info("update ad status of " + adId.getAd());
        // logger.info("adid information :" + new ObjectMapper().writeValueAsString(adId));
        // if (adId.getStatus() >= HistoryStatus.REVIEWED) {
        // result.put("returncode", ReturnCode.code108);
        // result.put("success", false);
        // result.put("msg", "已经答过该题");
        // logger.info("updateADStatus result :" + result.toString());
        // return result.toString();
        // }

        adIdService.updateItemStatus(vo.getObjId() + "", vo.getUid(), vo.getStatus());

        UserHistory uh = new UserHistory();

        uh.setUid(vo.getUid());
        uh.setStatus(vo.getStatus());
        uh.setType(HistoryType.AD);
        uh.setUhId(vo.getObjId());
        userHistoryService.updateHistoryStatus(uh);

        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "更改成功");
        logger.info("updateADStatus result :" + result.toString());
        return result.toString();
        // }
      } else {
        result.put("returncode", ReturnCode.code107);
        result.put("success", false);
        result.put("msg", "该广告不存在");
        logger.info("updateADStatus result :" + result.toString());
        return result.toString();
      }

    } else {
      result.put("returncode", ReturnCode.code107);
      result.put("success", false);
      result.put("msg", "该广告不存在");
      logger.info("updateADStatus result :" + result.toString());
      return result.toString();
    }
    // } else {
    // result.put("returncode", ReturnCode.code101);
    // result.put("success", false);
    // result.put("msg", "请先登录");
    // return result.toString();
    // }

  }

  @RequestMapping(value = "/viewResult", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String viewResult(@RequestBody AdID adId) throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    logger.info("answer questions of " + adId.getAd());

    // Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    // temp remove verification
    // if (cUser.isAuthenticated()) {
    AdID a = adIdService.findByUid(adId.getAd(), adId.getUid());
    if (a != null) {

      logger.info("update ad status of " + a.getAd());
      logger.info("adid information :" + new ObjectMapper().writeValueAsString(a));
      if (a.getStatus() >= HistoryStatus.REVIEWED) {
        result.put("returncode", ReturnCode.code108);
        result.put("success", false);
        result.put("msg", "已经答过该题");
        logger.info("updateADStatus result :" + result.toString());
        return result.toString();
      }

      a.setA1(adId.getA1());
      a.setA2(adId.getA2());
      a.setA3(adId.getA3());
      a.setComments(adId.getComments());
      a.setStatus(HistoryStatus.REVIEWED);
      a.setAd(adId.getAd());
      // AdID ai = new AdID();

      // System.out.println(ai == a);
      adIdService.answerItem(a);

      UserHistory uh = new UserHistory();

      // to change userhistory status to history
      uh.setUid(adId.getUid());
      uh.setStatus(HistoryStatus.REVIEWED);
      uh.setType(HistoryType.AD);
      uh.setUhId(adId.getAd());
      logger.info("modify userhisotry :" + new ObjectMapper().writeValueAsString(uh));
      userHistoryService.updateHistoryStatus(uh);

      result.put("returncode", ReturnCode.code200);
      result.put("success", true);
      result.put("msg", "成功");
      return result.toString();
    } else {
      result.put("returncode", ReturnCode.code107);
      result.put("success", false);
      result.put("msg", "该广告不存在");
      return result.toString();
    }
    // } else {
    // result.put("returncode", ReturnCode.code101);
    // result.put("success", false);
    // result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order
    // to
    // return result.toString();
    // }

  }
}
