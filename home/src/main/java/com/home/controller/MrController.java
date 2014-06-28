package com.home.controller;

import java.io.IOException;
import java.util.List;

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

import com.home.domain.MarketingResearch;
import com.home.domain.MrID;
import com.home.domain.ObjectVo;
import com.home.domain.UserHistory;
import com.home.global.dict.AppStatus.HistoryStatus;
import com.home.global.dict.AppType.HistoryType;
import com.home.global.dict.ReturnCode;
import com.home.service.MrIdService;
import com.home.service.MrService;
import com.home.service.UserHistoryService;

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

  @RequestMapping(value = "/claim", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String claim(@RequestBody MrID mrid) throws JSONException {

    JSONObject result = new JSONObject();
    Subject cUser = SecurityUtils.getSubject();
    if (cUser.isAuthenticated()) {
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
    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");
      return result.toString();
    }

    return result.toString();
  }

  @RequestMapping(value = "/history/{uid}/{pageSize}/{pageNo}", method = RequestMethod.GET, consumes = MediaType.APPLICATION_JSON_VALUE)
  public String mrHistory(@PathVariable("uid") long uid, @PathVariable("pageSize") int pageSize, @PathVariable("pageNo") int pageNo)
      throws JSONException, JsonGenerationException, JsonMappingException, IOException {
    logger.info("mr history from user " + uid);
    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (cUser.isAuthenticated()) {
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

    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");// send msg to client,and client should clear sessionId, in order to
      return result.toString();
    }

  }

  @RequestMapping(value = "/updateMRStatus", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateMRStatus(@RequestBody ObjectVo vo) throws JSONException {
    logger.info("update mr status begins");
    JSONObject result = new JSONObject();
    Subject cUser = SecurityUtils.getSubject();
    if (cUser.isAuthenticated()) {
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
    } else {
      result.put("returncode", ReturnCode.code101);
      result.put("success", false);
      result.put("msg", "请先登录");
      return result.toString();
    }
  }

  @RequestMapping(value = "/viewResult", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String viewResult(@RequestBody MrID mrId) throws JSONException {
    logger.info("answer questions of " + mrId.getMr());

    Subject cUser = SecurityUtils.getSubject();
    JSONObject result = new JSONObject();
    if (cUser.isAuthenticated()) {
      MrID m = mrIdService.findByUid(mrId.getMr(), mrId.getUid());
      if (m != null) {
        m.setA1(mrId.getA1());
        m.setA10(mrId.getA10());
        m.setA2(mrId.getA2());
        m.setA3(mrId.getA3());
        m.setA4(mrId.getA4());
        m.setA5(mrId.getA5());
        m.setA6(mrId.getA6());
        m.setA7(mrId.getA7());
        m.setA8(mrId.getA8());
        m.setA9(mrId.getA9());
        m.setMr(mrId.getMr());
        m.setStatus(HistoryStatus.REVIEWED);
        m.setUid(mrId.getUid());
        mrIdService.answerItem(mrId);

        UserHistory uh = new UserHistory();

        // to change userhistory status to history
        uh.setUid(mrId.getUid());
        uh.setStatus(HistoryStatus.REVIEWED);
        uh.setType(HistoryType.MR);
        uh.setUhId(mrId.getMr());
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
