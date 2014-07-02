package com.home.controller;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.home.domain.ApID;
import com.home.domain.AppPromotion;
import com.home.domain.ObjectVo;
import com.home.domain.UserHistory;
import com.home.global.dict.AppStatus.HistoryStatus;
import com.home.global.dict.AppType.HistoryType;
import com.home.global.dict.ReturnCode;
import com.home.service.ApIdService;
import com.home.service.ApService;
import com.home.service.UserHistoryService;

@RequestMapping("/ap")
@Controller
public class ApController {

  private final Logger logger = Logger.getLogger(ApController.class);

  @Autowired
  ApService apService;

  @Autowired
  ApIdService apIdService;

  @Autowired
  UserHistoryService userHistoryService;

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
  public String createAp(MultipartHttpServletRequest request, HttpServletResponse response) {
    Iterator<String> fileNames = request.getFileNames();
    System.out.println(request.getParameter("ap"));
    while (fileNames.hasNext()) {
      MultipartFile file = request.getFile(fileNames.next());
      System.out.println(file.getOriginalFilename());
    }
    return "";
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

    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (cUser.isAuthenticated()) {
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
    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order to
      return result.toString();
    }

  }
}
