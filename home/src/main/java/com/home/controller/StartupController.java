package com.home.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONException;
import net.sf.json.JSONObject;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.home.domain.Software;
import com.home.domain.User;
import com.home.domain.UserHardware;
import com.home.domain.UserSoftware;
import com.home.domain.vo.StartupVo;
import com.home.global.dict.ReturnCode;
import com.home.service.SoftwareService;
import com.home.service.UserHardwareService;
import com.home.service.UserService;
import com.home.service.UserSoftwareService;

@Controller
@RequestMapping("/startup")
public class StartupController {

  /**
   * created by duyaoguang @2014-02-24
   */

  private static final Logger logger = Logger.getLogger(StartupController.class);

  @Autowired
  UserService userService;

  @Autowired
  UserHardwareService userHardwareService;

  @Autowired
  SoftwareService softwareService;

  @Autowired
  UserSoftwareService userSoftwareService;

  @RequestMapping(value = "/cellphoneInfo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String cellphoneInfo(HttpServletRequest request, @RequestBody StartupVo startup) throws JSONException, InterruptedException {
    logger.info("cellphoneInfo invoked,the first time to startup this app");
    JSONObject result = new JSONObject();
    if (startup != null) {
      String imei = startup.getImei();
      boolean exists = userService.ImeiExists(imei);
      if (!exists) {// if imei doesn't exist
        long id = System.currentTimeMillis();
        User user = new User();
        user.setId(id);
        user.setImei(imei);
        user = userService.save(user);// save id and imei to db

        UserHardware userHardware = startup.getHardware();

        if (userHardware != null) {// save hardware info
          userHardware.setId(System.currentTimeMillis());
          userHardware.setImei(imei);
          userHardwareService.save(userHardware);
        }
        List<UserSoftware> softwares = startup.getSoftwares();
        if (softwares != null && softwares.size() > 0) {
          Software software;
          for (UserSoftware userSoftware : softwares) {
            software = userSoftware.getSoftware();
            Software s = softwareService.exists(software);
            if (s == null) {// save software if software doesn't exist
              software.setId(System.currentTimeMillis());
              software = softwareService.save(software);

              UserSoftware us = userSoftwareService.exists(userSoftware);
              if (us == null) {
                Thread.sleep(1);
                userSoftware.setId(System.currentTimeMillis());
                userSoftware.setImei(imei);
                userSoftware.setSoftware(software);
                userSoftwareService.save(userSoftware);
              }
            } else {
              UserSoftware us = userSoftwareService.exists(userSoftware);

              if (us == null) {
                Thread.sleep(1);
                userSoftware.setId(System.currentTimeMillis());
                userSoftware.setImei(imei);
                userSoftware.setSoftware(s);
                userSoftwareService.save(userSoftware);
              }
            }
          }

        }
        result.put("success", "false");// return false if imei doesn't exist
        result.put("msg", "imei信息不存在,已保存");
        result.put("returncode", ReturnCode.code200);
      } else {
        result.put("success", "true");
        result.put("msg", "imei号已存在!");
        result.put("returncode", ReturnCode.code105);
      }
    } else {
      try {
        result.put("returncode", ReturnCode.code500);
        result.put("success", "false");
        result.put("msg", "服务器内部错误");
      } catch (JSONException e) {

      }

    }
    return result.toString();
  }

  @RequestMapping(value = "/updateCellPhoneInfo", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  @ResponseBody
  public String updateCellPhoneInfo(HttpServletRequest request, @RequestBody StartupVo startup) throws JSONException, InterruptedException {
    logger.info("cellphoneInfo invoked,the first time to startup this app");
    JSONObject result = new JSONObject();
    if (startup != null) {
      String imei = startup.getImei();
      boolean exists = userService.ImeiExists(imei);
      if (exists) {// if imei exists

        UserHardware userHardware = startup.getHardware();

        try {
          UserHardware hardware = userHardwareService.findyHardware(imei);

          if (userHardware != null) {
            hardware.setOs(userHardware.getOs());
            hardware.setResolution(userHardware.getResolution());
            hardware.setStorage(userHardware.getStorage());
            userHardwareService.save(userHardware);
          }
        } catch (Exception e) {
          result.put("returncode", ReturnCode.code500);
          result.put("success", "false");
          result.put("msg", "服务器内部错误");
        }

        List<UserSoftware> softwares = startup.getSoftwares();
        if (softwares != null && softwares.size() > 0) {
          Software software;
          for (UserSoftware userSoftware : softwares) {
            software = userSoftware.getSoftware();
            Software s = softwareService.exists(software);
            if (s == null) {// save software if software doesn't exist
              software.setId(System.currentTimeMillis());
              software = softwareService.save(software);

              UserSoftware us = userSoftwareService.exists(userSoftware);
              if (us == null) {
                Thread.sleep(1);
                userSoftware.setId(System.currentTimeMillis());
                userSoftware.setImei(imei);
                userSoftware.setSoftware(software);
                userSoftwareService.save(userSoftware);
              }
            } else {
              UserSoftware us = userSoftwareService.exists(userSoftware);

              if (us == null) {
                Thread.sleep(1);
                userSoftware.setId(System.currentTimeMillis());
                userSoftware.setImei(imei);
                userSoftware.setSoftware(s);
                userSoftwareService.save(userSoftware);
              }
            }
          }

        }
        result.put("success", true);// return false if imei doesn't exist
        result.put("msg", "imei信息不存在,已保存");
        result.put("returncode", ReturnCode.code200);
      } else {
        result.put("success", "false");
        result.put("msg", "imei号已存在!");
        result.put("returncode", ReturnCode.code105);
      }
    } else {
      try {
        result.put("returncode", ReturnCode.code500);
        result.put("success", "false");
        result.put("msg", "服务器内部错误");
      } catch (JSONException e) {

      }

    }
    return result.toString();
  }
}
