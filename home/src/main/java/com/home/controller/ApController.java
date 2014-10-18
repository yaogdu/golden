package com.home.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Random;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSON;
import com.home.domain.ApID;
import com.home.domain.AppPromotion;
import com.home.domain.ObjectVo;
import com.home.domain.Resource;
import com.home.domain.User;
import com.home.domain.UserHistory;
import com.home.global.dict.AppFormat;
import com.home.global.dict.AppStatus.HistoryStatus;
import com.home.global.dict.AppType.HistoryType;
import com.home.global.dict.AppType.platform;
import com.home.global.dict.ReturnCode;
import com.home.global.util.CompressPicture;
import com.home.global.util.FileUtil;
import com.home.service.ApIdService;
import com.home.service.ApService;
import com.home.service.ResourceService;
import com.home.service.UserHistoryService;
import com.home.service.UserService;

@RequestMapping("/ap")
@Controller
public class ApController {

  private final Logger logger = Logger.getLogger(ApController.class);

  @Autowired
  ApService apService;

  @Autowired
  ApIdService apIdService;

  @Autowired
  ResourceService resourceService;

  @Autowired
  FileUtil fileUtil;

  @Autowired
  UserService userService;

  @Autowired
  UserHistoryService userHistoryService;

  // ExecutorService es = Executors.newFixedThreadPool(10);

  private String ffmpegPath;

  @RequestMapping(value = "/history/{uid}/{pageSize}/{pageNo}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String apHistory(@PathVariable("uid") long uid, @PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo)
      throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    logger.info("mr history from user " + uid);
    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (cUser.isAuthenticated()) {
      List<AppPromotion> aps = apService.historyByUid(uid, pageSize, pageNo);
      if (aps != null && aps.size() > 0) {
        ObjectMapper om = new ObjectMapper();
        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "查询成功");
        result.put("mrs", om.writeValueAsString(aps));
        return result.toString();
      } else {
        result.put("returncode", ReturnCode.code204);
        result.put("success", false);
        result.put("msg", "暂时没有内容");
        result.put("ads", "");
        return result.toString();
      }

    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order to
      return result.toString();
    }

  }

  @ResponseBody
  @RequestMapping(value = "/attach", method = RequestMethod.POST)
  public String attachResource(HttpServletRequest request, @RequestBody MultipartFile file, HttpServletResponse response) {

    logger.info("进入");

    String resourceStr = request.getParameter("resource");

    JSONObject result = new JSONObject();
    try {

      Resource resource = JSON.parseObject(resourceStr, Resource.class);
      String[] fileNames = FileUtil.getFileNameOrSuffix(file.getOriginalFilename());

      String fileTypeParent = AppFormat.getParentFormat(fileNames[1]);

      AppPromotion app = apService.findById(resource.getOwnerId());

      System.out.println(fileTypeParent);

      if (null != fileTypeParent && !"".equals(fileTypeParent)) {

        Map map = fileUtil.getUploadFileInfo(fileTypeParent.toLowerCase(), fileNames[1], fileUtil.getStoreDir());

        fileUtil.saveFile(file.getInputStream(), map.get("oriSavePath").toString());

        int fileTypeInt = AppFormat.getResourceType(fileNames[1].toUpperCase());
        if (fileTypeInt == 3) {

          app.setSize(file.getSize() + "");
          if (fileNames[1].toUpperCase().equals("APK")) {

            app.setPlatform(platform.ANDROID);
          } else {
            app.setPlatform(platform.IOS);
          }
          app.setResourceURL(map.get("oriRetPath").toString());
          apService.update(app);
        } else {
          CompressPicture.compress(file.getInputStream(), map);
          resource.setThumbnailHeight(Thumbnails.of(file.getInputStream()).scale(0.3f).asBufferedImage().getHeight());
          resource.setThumbnailWidth(Thumbnails.of(file.getInputStream()).scale(0.3f).asBufferedImage().getWidth());
          resource.setMd5(map.get("oriRetPath").toString());
          resource.setThumbnailMd5(map.get("retPath").toString());
          resource.setId(System.currentTimeMillis());
          resource.setFileSize(file.getSize());
          resource.setFormat(fileNames[1].toLowerCase());
          resource.setName(file.getOriginalFilename());
          resource.setType(fileTypeInt);
          resourceService.createOne(resource);
        }
      }

      //
      // String[] fileNames = FileUtil.getFileNameOrSuffix(file.getOriginalFilename());
      //
      // String fileTypeParent = AppFormat.getParentFormat(fileNames[1]);// .png .jpg to get
      // fileType
      // // parent e.g. pic , video
      //
      // if (null != fileTypeParent && !"".equals(fileTypeParent)) {
      //
      // int fileTypeInt = AppFormat.getResourceType(fileNames[1].toUpperCase());// .png .jpg to get
      // Map map = fileUtil.getUploadFileInfo(fileTypeParent.toLowerCase(), fileNames[1],
      // fileUtil.getStoreDir());
      //
      // fileUtil.saveFile(file.getInputStream(), map.get("oriSavePath").toString());
      // // CompressPicture.compress(file.getInputStream(), map);
      // long id = System.currentTimeMillis();
      // ap.setId(id);
      // int max = 8000;
      // int min = 20000;
      // Random random = new Random();
      // int s = random.nextInt(max) % (max - min + 1) + min;
      // ap.setDnd(s);
      // ap.setSize(file.getSize() + "");
      // ap.setPlatform(platform.ANDROID);
      // ap.setLogoURL(map.get("oriRetPath").toString());
      // apService.createOne(ap);
      // result.put("ap", ap);
      // result.put("map", map);
      // apIdService.generateTable(id + "");
      // logger.info("create table ap_id_" + id);
      // }
      //
      // List<User> users = userService.findTestData(10);
      //
      // for (User u : users) {
      // ApID a = new ApID();
      // a.setAp(ap.getId());
      // a.setComments("");
      // a.setStatus(HistoryStatus.INITED);
      // a.setUid(u.getId());
      // apIdService.createOne(a);
      // // logger.info("insert into table ad_id_" + id + " with id value " + a.getUid());
      //
      // UserHistory uh = new UserHistory();
      // try {
      // Thread.sleep(1);
      // uh.setUid(u.getId());
      // uh.setId(System.currentTimeMillis());
      // uh.setStatus(a.getStatus());
      // uh.setType(HistoryType.AP);
      // uh.setUhId(ap.getId());
      // userHistoryService.recordPublicHeartBeat(uh);
      // logger.info("create userhistory with id value " + uh.getId());
      // } catch (InterruptedException e) {
      // e.printStackTrace();
      // }
      // }
    } catch (Exception e) {
      e.printStackTrace();
      result.put("success", false);
    }

    return result.toString();

  }

  @RequestMapping(value = "/claim", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String claim(@RequestBody ApID apid) throws JSONException {

    JSONObject result = new JSONObject();
    Subject cUser = SecurityUtils.getSubject();
    if (cUser.isAuthenticated()) {
      AppPromotion a = apService.findById(apid.getAp());
      if (a != null) {
        int expireTime = a.getExpire();// expire was temp added,doesn't need it?

        if (System.currentTimeMillis() - a.getId() - expireTime * 24 * 60 * 60 * 1000 <= 0) {

          ApID aid = apIdService.findByUid(apid.getAp(), apid.getUid());
          if (aid != null) {
            if (aid.getStatus() == HistoryStatus.REVIEWED) {

              apIdService.updateItemStatus(apid.getAp() + "", apid.getUid(), HistoryStatus.CLAIMED);

              UserHistory uh = new UserHistory();
              uh.setUid(apid.getUid());
              uh.setStatus(HistoryStatus.CLAIMED);
              uh.setType(HistoryType.AP);
              uh.setUhId(apid.getAp());
              userHistoryService.updateHistoryStatus(uh);
              result.put("returncode", ReturnCode.code200);
              result.put("success", true);
              result.put("msg", "确认成功");
              return result.toString();

            } else {
              result.put("returncode", ReturnCode.code108);
              result.put("success", false);
              result.put("msg", "该项状态不正确");
              return result.toString();
            }
          }
        } else {
          result.put("returncode", ReturnCode.code205);
          result.put("success", false);
          result.put("msg", "该项已过期");
          return result.toString();
        }

      } else {
        result.put("returncode", ReturnCode.code107);
        result.put("success", false);
        result.put("msg", "该项不存在");
        return result.toString();
      }
    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");
      return result.toString();
    }

    return result.toString();
  }

  @ResponseBody
  @RequestMapping(value = "/add", method = RequestMethod.POST)
  public String createAp(HttpServletRequest request, @RequestBody MultipartFile file, HttpServletResponse response) {

    logger.info("进入");

    String apStr = request.getParameter("ap");

    JSONObject result = new JSONObject();
    try {

      AppPromotion ap = JSON.parseObject(apStr, AppPromotion.class);

      String[] fileNames = FileUtil.getFileNameOrSuffix(file.getOriginalFilename());

      String fileTypeParent = AppFormat.getParentFormat(fileNames[1]);// .png .jpg to get fileType
                                                                      // parent e.g. pic , video

      if (null != fileTypeParent && !"".equals(fileTypeParent)) {

        int fileTypeInt = AppFormat.getResourceType(fileNames[1].toUpperCase());// .png .jpg to get
        Map map = fileUtil.getUploadFileInfo(fileTypeParent.toLowerCase(), fileNames[1], fileUtil.getStoreDir());

        fileUtil.saveFile(file.getInputStream(), map.get("oriSavePath").toString());
        // CompressPicture.compress(file.getInputStream(), map);
        long id = System.currentTimeMillis();
        ap.setId(id);
        int max = 8000;
        int min = 20000;
        Random random = new Random();
        int s = random.nextInt(max) % (max - min + 1) + min;
        ap.setDnd(s);
        ap.setSize(file.getSize() + "");
        ap.setPlatform(platform.ANDROID);
        ap.setLogoURL(map.get("oriRetPath").toString());
        apService.createOne(ap);
        result.put("ap", ap);
        result.put("map", map);
        apIdService.generateTable(id + "");
        logger.info("create table ap_id_" + id);
      }

      List<User> users = userService.findTestData(10);

      for (User u : users) {
        ApID a = new ApID();
        a.setAp(ap.getId());
        a.setComments("");
        a.setStatus(HistoryStatus.INITED);
        a.setUid(u.getId());
        apIdService.createOne(a);
        // logger.info("insert into table ad_id_" + id + " with id value " + a.getUid());

        UserHistory uh = new UserHistory();
        try {
          Thread.sleep(1);
          uh.setUid(u.getId());
          uh.setId(System.currentTimeMillis());
          uh.setStatus(a.getStatus());
          uh.setType(HistoryType.AP);
          uh.setUhId(ap.getId());
          userHistoryService.recordPublicHeartBeat(uh);
          logger.info("create userhistory with id value " + uh.getId());
        } catch (InterruptedException e) {
          e.printStackTrace();
        }
      }
    } catch (Exception e) {
      e.printStackTrace();
      result.put("success", false);
    }

    return result.toString();

  }

  @RequestMapping(value = "/dndCount/{apId}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String dndCount(@PathVariable("apId") long apId) {
    JSONObject result = new JSONObject();

    try {
      AppPromotion ap = apService.findById(apId);
      if (ap != null) {
        result.put("success", true);
        result.put("dnd", ap.getDnd());
        result.put("returncode", ReturnCode.code200);
        result.put("msg", "成功");
      } else {
        result.put("success", false);
        result.put("msg", "该项不存在");
        result.put("returncode", ReturnCode.code107);
      }
    } catch (Exception e) {
      result.put("success", false);
      result.put("msg", "发生错误");
      result.put("returncode", ReturnCode.code500);
    }
    return result.toString();
  }

  @RequestMapping(value = "/dnd", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String dndCountIncrease(@RequestBody AppPromotion ap) {
    JSONObject result = new JSONObject();

    try {
      AppPromotion app = apService.findById(ap.getId());
      if (app != null) {
        app.setDnd(app.getDnd() + 1);
        apService.update(app);
        result.put("success", true);
        result.put("dnd", app.getDnd());
        result.put("returncode", ReturnCode.code200);
        result.put("msg", "成功");
      } else {
        result.put("success", false);
        result.put("msg", "该项不存在");
        result.put("returncode", ReturnCode.code107);
      }
    } catch (Exception e) {
      result.put("success", false);
      result.put("msg", "发生错误");
      result.put("returncode", ReturnCode.code500);
    }
    return result.toString();
  }

  public String getFfmpegPath() {
    return ffmpegPath;
  }

  public void setFfmpegPath(String ffmpegPath) {
    this.ffmpegPath = ffmpegPath;
  }

  @RequestMapping(value = "/updateAPStatus", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateAPStatus(@RequestBody ObjectVo vo) throws JSONException {
    logger.info("update ap status begins");
    JSONObject result = new JSONObject();
    Subject cUser = SecurityUtils.getSubject();
    if (cUser.isAuthenticated()) {
      AppPromotion ap = apService.findById(vo.getObjId());
      // MarketingResearch mr = mrService.findById(vo.getObjId());
      if (ap != null) {

        ApID apId = apIdService.findByUid(vo.getObjId(), vo.getUid());
        if (apId != null) {
          // int status = adId.getStatus();
          // if (status > HistoryStatus.INITED) {// TODO 状态判断
          apIdService.updateItemStatus(vo.getObjId() + "", vo.getUid(), vo.getStatus());

          UserHistory uh = new UserHistory();

          uh.setUid(vo.getUid());
          uh.setStatus(vo.getStatus());
          uh.setType(HistoryType.AP);
          uh.setUhId(vo.getObjId());
          userHistoryService.updateHistoryStatus(uh);

          result.put("returncode", ReturnCode.code200);
          result.put("success", true);
          result.put("msg", "更改成功");
          return result.toString();
          // }
        } else {
          result.put("returncode", ReturnCode.code107);
          result.put("success", false);
          result.put("msg", "该项不存在");
          return result.toString();
        }

      } else {
        result.put("returncode", ReturnCode.code107);
        result.put("success", false);
        result.put("msg", "该项不存在");
        return result.toString();
      }
    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");
      return result.toString();
    }
  }

  @RequestMapping(value = "/comment", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String viewResult(@RequestBody ApID apId) throws JSONException {
    logger.info("answer questions of " + apId.getAp());

    // Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    try {
      // if (cUser.isAuthenticated()) {
      ApID a = apIdService.findByUid(apId.getAp(), apId.getUid());
      if (a != null) {
        a.setComments(apId.getComments());
        a.setStatus(HistoryStatus.REVIEWED);
        a.setUid(apId.getUid());
        apIdService.answerItem(apId);
        UserHistory uh = new UserHistory();

        // to change userhistory status to history
        uh.setUid(apId.getUid());
        uh.setStatus(HistoryStatus.REVIEWED);
        uh.setType(HistoryType.AP);
        uh.setUhId(apId.getAp());
        userHistoryService.updateHistoryStatus(uh);

        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "成功");
        return result.toString();

      } else {
        result.put("returncode", ReturnCode.code107);
        result.put("success", false);
        result.put("msg", "该项不存在");
        return result.toString();
      }
      // } else {
      // result.put("returncode", ReturnCode.code101);
      // result.put("success", false);
      // result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order
      // to
      // return result.toString();
      // }
    } catch (Exception e) {
      result.put("returncode", ReturnCode.code500);
      result.put("success", false);
      result.put("msg", "发生错误");
    }
    return result.toString();

  }
}
