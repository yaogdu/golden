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
import com.home.domain.Answer;
import com.home.domain.MarketingResearch;
import com.home.domain.MrID;
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
import com.home.service.AnswerService;
import com.home.service.MrIdService;
import com.home.service.MrService;
import com.home.service.ResourceService;
import com.home.service.UserHistoryService;
import com.home.service.UserService;

@RequestMapping("/mr")
@Controller
public class MrController {

  private final Logger logger = Logger.getLogger(MrController.class);

  @Autowired
  MrService mrService;

  @Autowired
  MrIdService mrIdService;

  @Autowired
  UserHistoryService userHistoryService;

  @Autowired
  FileUtil fileUtil;

  @Autowired
  ResourceService resourceService;

  @Autowired
  UserService userService;

  @Autowired
  AnswerService answerService;

  ExecutorService es = Executors.newFixedThreadPool(10);

  private String ffmpegPath;

  @RequestMapping(value = "/claim", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String claim(@RequestBody MrID mrid) throws JSONException {

    JSONObject result = new JSONObject();
    // Subject cUser = SecurityUtils.getSubject();
    // if (cUser.isAuthenticated()) {
    MarketingResearch m = mrService.findById(mrid.getMr());
    if (m != null) {
      int expireTime = m.getExpire();// expire was temp added,doesn't need it?

      if (System.currentTimeMillis() - m.getId() - expireTime * 24 * 60 * 60 * 1000 <= 0) {

        MrID mid = mrIdService.findByUid(mrid.getMr(), mrid.getUid());
        if (mid != null) {
          if (mid.getStatus() == HistoryStatus.REVIEWED) {

            mrIdService.updateItemStatus(mrid.getMr() + "", mrid.getUid(), HistoryStatus.CLAIMED);

            UserHistory uh = new UserHistory();
            uh.setUid(mrid.getUid());
            uh.setStatus(HistoryStatus.CLAIMED);
            uh.setType(HistoryType.MR);
            uh.setUhId(mrid.getMr());
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
  public String createMr(HttpServletRequest request, @RequestPart MultipartFile file, HttpServletResponse response) throws IOException {
    logger.info("进入");

    String mrStr = request.getParameter("mr");

    JSONObject result = new JSONObject();
    try {

      MarketingResearch mr = JSON.parseObject(mrStr, MarketingResearch.class);

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
        mr.setId(id);

        // mr.setFormat(fileTypeInt);
        // ad.setLogoURL(logoURL);
        // mr.setResourceURL(map.get("retPath").toString());

        mrService.createOne(mr);

        // mrIdService.generateTable(id + "");
        // logger.info("create table mr_id_" + id);

        List<User> users = userService.findTestData(10);

        for (User u : users) {
          MrID m = new MrID();

          // m.setMr(id);
          // m.setStatus(HistoryStatus.INITED);
          // m.setUid(u.getId());
          // mrIdService.createOne(m);

          // AdID a = new AdID();
          // a.setA1("");
          // a.setA2("");
          // a.setA3("");
          // a.setAd(id);
          // a.setStatus(HistoryStatus.INITED);
          // a.setUid(u.getId());
          // mrIdService.createOne(a);
          logger.info("insert into table mr_id_" + id + " with id value " + m.getUid());

          UserHistory uh = new UserHistory();
          try {
            Thread.sleep(1);
            uh.setUid(u.getId());
            uh.setId(System.currentTimeMillis());
            uh.setStatus(m.getStatus());
            uh.setType(HistoryType.MR);
            uh.setUhId(mr.getId());
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
        resource.setOwnerType(HistoryType.MR);

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

  @RequestMapping(value = "/history/{uid}/{pageSize}/{pageNo}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String mrHistory(@PathVariable("uid") long uid, @PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo)
      throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    logger.info("mr history from user " + uid);
    // Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    // if (cUser.isAuthenticated()) {
    List<MarketingResearch> mrs = mrService.historyByUid(uid, pageSize, pageNo);
    if (mrs != null && mrs.size() > 0) {
      ObjectMapper om = new ObjectMapper();
      result.put("returncode", ReturnCode.code200);
      result.put("success", true);
      result.put("msg", "查询成功");
      result.put("mrs", om.writeValueAsString(mrs));
      return result.toString();
    } else {
      result.put("returncode", ReturnCode.code204);
      result.put("success", false);
      result.put("msg", "暂时没有内容");
      result.put("ads", "");
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

  public void setFfmpegPath(String ffmpegPath) {
    this.ffmpegPath = ffmpegPath;
  }

  @RequestMapping(value = "/updateMRStatus", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateMRStatus(@RequestBody ObjectVo vo) throws JSONException {
    logger.info("update mr status begins");
    JSONObject result = new JSONObject();
    // Subject cUser = SecurityUtils.getSubject();
    // if (cUser.isAuthenticated()) {
    MarketingResearch mr = mrService.findById(vo.getObjId());
    if (mr != null) {
      MrID mrId = mrIdService.findByUid(vo.getObjId(), vo.getUid());
      if (mrId != null) {
        // int status = adId.getStatus();
        // if (status > HistoryStatus.INITED) {// TODO 状态判断
        mrIdService.updateItemStatus(vo.getObjId() + "", vo.getUid(), vo.getStatus());

        UserHistory uh = new UserHistory();

        uh.setUid(vo.getUid());
        uh.setStatus(vo.getStatus());
        uh.setType(HistoryType.MR);
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
    // } else {
    // result.put("returncode", ReturnCode.code101);
    // result.put("success", false);
    // result.put("msg", "请先登录");
    // return result.toString();
    // }
  }

  @RequestMapping(value = "/viewResult", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String viewResult(@RequestBody List<Answer> answers) throws JSONException {
    logger.info("viewResult of mr ");

    JSONObject result = new JSONObject();
    // Subject cUser = SecurityUtils.getSubject();
    // if (cUser.isAuthenticated()) {
    // MrID m = mrIdService.findByUid(mrId.getMr(), mrId.getUid());

    if (answers != null && answers.size() > 0) {

      Answer a = answers.get(0);

      UserHistory uh = new UserHistory();

      // to change userhistory status to history
      uh.setUid(a.getUid());
      uh.setStatus(HistoryStatus.REVIEWED);
      uh.setType(HistoryType.MR);
      uh.setUhId(a.getOwnerId());
      userHistoryService.updateHistoryStatus(uh);

      if (answerService.answerMr(answers)) {
        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "成功");
        return result.toString();
      } else {
        result.put("returncode", ReturnCode.code500);
        result.put("success", false);
        result.put("msg", "发生错误");
        return result.toString();
      }

    } else {
      result.put("returncode", ReturnCode.code107);
      result.put("success", false);
      result.put("msg", "该调查不存在");
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
