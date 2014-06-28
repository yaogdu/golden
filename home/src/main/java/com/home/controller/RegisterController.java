package com.home.controller;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.home.domain.User;
import com.home.global.dict.ReturnCode;
import com.home.global.util.PwdUtil;
import com.home.service.RegisterService;
import com.home.service.UserService;

@Controller
@RequestMapping("/register")
public class RegisterController {

  public static final Logger logger = Logger.getLogger(RegisterController.class);

  @Autowired
  RegisterService registerService;

  @Autowired
  UserService userService;

  @RequestMapping(produces = "application/json", value = "/cellphoneNumberExists/{cellNum}", method = RequestMethod.GET)
  @ResponseBody
  public String cellNumExists(@PathVariable("cellNum") String cellNum) throws JSONException {
    logger.info("cell number check");
    JSONObject result = new JSONObject();

    if (StringUtils.isNotBlank(cellNum)) {
      User user = registerService.cellExists(cellNum);
      if (user != null) {
        result.put("returncode", ReturnCode.code601);
        result.put("success", false);
        result.put("msg", "该手机号已存在");
        return result.toString();
      } else {
        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "该手机号可以使用");

        return result.toString();
      }
    } else {
      result.put("returncode", ReturnCode.code500);
      result.put("success", false);
      result.put("msg", "服务器错误");
      return result.toString();
    }

  }

  @RequestMapping(value = "/register", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String register(HttpServletRequest request, @RequestBody User user) throws JSONException {
    logger.info("user " + user.getCellNumber() + " start to regist");
    JSONObject result = new JSONObject();
    if (user != null) {
      String imei = user.getImei();

      String tokenStr = String.valueOf(request.getSession().getAttribute(user.getCellNumber() + "registerverify"));
      if (StringUtils.isNotBlank(tokenStr)) {
        long sessionId = Long.parseLong(tokenStr);
        long now = System.currentTimeMillis();// TODO changed: verify the request is valid or not

        if (now - sessionId - 1000 * 60 * 20 + 200 > 0) {// TODO changed:10 mins after get cell
                                                         // phone number verified
          result.put("success", false);
          result.put("returncode", ReturnCode.code402);
          result.put("msg", "超时,请重新注册");
          return result.toString();
        }

        User u = userService.ImeiMappedToUser(imei);

        if (u != null) {
          // if imei has been mapped to user
          logger.info("imei " + imei + " has not been mapped to user");
          u.setAccount(user.getAccount());
          u.setAccountName(user.getAccountName());
          u.setAccountStatus(user.getAccountStatus());
          u.setBankName(user.getBankName());
          u.setBuyWilling(user.getBuyWilling());
          u.setCellNumber(user.getCellNumber());
          u.setGender(user.getGender());
          u.setHasChildren(user.getHasChildren());
          u.setImei(user.getImei());
          u.setIncome(user.getIncome());
          u.setIndustry(user.getIndustry());
          u.setInterest(user.getInterest());
          u.setLastHeartBeat(user.getLastHeartBeat());
          u.setLoginId(user.getLoginId());
          u.setLoginPwd(PwdUtil.encypt(user.getLoginPwd()));
          u.setMaritalStatus(user.getMaritalStatus());
          u.setName(user.getName());
          u.setSessionId(user.getSessionId());
          u.setTitle(user.getTitle());
          u.setWorkStatus(user.getWorkStatus());
          userService.save(u);

        } else {
          user.setId(System.currentTimeMillis());
          user.setLoginPwd(PwdUtil.encypt(user.getLoginPwd()));
          userService.save(user);
        }

        result.put("returncode", ReturnCode.code200);
        result.put("success", true);
        result.put("msg", "注册成功");
      } else {
        result.put("returncode", ReturnCode.code410);
        result.put("success", false);
        result.put("msg", "请先验证手机号");
      }
    }

    return result.toString();
  }

  @RequestMapping(value = "/sendPasscode", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String sendPasscode(HttpServletRequest request, @RequestBody User user) throws JSONException {
    logger.info("cell number check");
    JSONObject result = new JSONObject();

    if (user != null) {
      String cellNum = user.getCellNumber();
      // TODO verify cell number format
      if (cellNum.matches("^(13|15|18)\\d{9}$")) {

        Object passcode = request.getSession().getAttribute(cellNum + "passcode");
        if (passcode != null && StringUtils.isNotBlank(String.valueOf(passcode))) {
          long cellLong = Long.parseLong(String.valueOf(passcode));
          long now = System.currentTimeMillis();
          if (now - cellLong - 1000 - 10 < 0) {
            result.put("returncode", ReturnCode.code106); // valid
            result.put("success", false);
            result.put("msg", "请稍后再试");
            return result.toString();
          }
        }
        // TODO invoke message sending API to send the passcode to the cellNum
        // result.put("code", true); return the generated code to client
        sendCode(cellNum);// send code to the cellNum and return to client to verify the number

        long now = System.currentTimeMillis();
        request.getSession().setAttribute(cellNum + "passcode", now);

        request.getSession().setAttribute(cellNum + "registerverify", now);// TODO changed:in order
                                                                           // to verify if
                                                                           // the client request is
        result.put("returncode", ReturnCode.code200); // valid
        result.put("success", true);
        result.put("msg", "短信已发送");
      } else {
        result.put("code", "");// not necessary to return code if the cell number format is not
                               // correct
        result.put("success", false);
        result.put("msg", "手机格式不正确");
      }

    } else {
      result.put("success", false);
      result.put("msg", "服务器内部错误");
    }

    return result.toString();
  }

  private String sendCode(String cellNum) {

    return "";
  }
}
