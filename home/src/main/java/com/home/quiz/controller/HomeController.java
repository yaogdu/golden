package com.home.quiz.controller;

import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * Author : Lance lance7in_gmail_com Date : 04/12/2013 10:59 Since : 0.1
 */
@Controller
@RequestMapping({"/", ""})
public class HomeController {

  /*--------------------------------------------
  |             C O N S T A N T S             |
  ============================================*/
  private static final Logger logger = Logger.getLogger(HomeController.class);

  @RequestMapping(value = "ad", method = RequestMethod.GET)
  public ModelAndView ad() {
    // throw new CustomGenericException("500","hello exception");
    return new ModelAndView("teacher/resource/add/ad");
  }

  @RequestMapping(value = "ap", method = RequestMethod.GET)
  public ModelAndView ap() {
    // throw new CustomGenericException("500","hello exception");
    return new ModelAndView("teacher/resource/add/ap");
  }

  @RequestMapping(value = "mr", method = RequestMethod.GET)
  public ModelAndView mr() {
    // throw new CustomGenericException("500","hello exception");
    return new ModelAndView("teacher/resource/add/mr");
  }

  /*--------------------------------------------
  |    I N S T A N C E   V A R I A B L E S    |
  ============================================*/
  /*--------------------------------------------
  |         C O N S T R U C T O R S           |
  ============================================*/
  /*--------------------------------------------
  |  A C C E S S O R S / M O D I F I E R S    |
  ============================================*/
  /*--------------------------------------------
  |               M E T H O D S               |
  ============================================*/
  @RequestMapping(method = RequestMethod.GET)
  public ModelAndView showHomePage() {
    // throw new CustomGenericException("500","hello exception");
    return new ModelAndView("home");

  }

  @RequestMapping(value = "/statistics", method = RequestMethod.GET)
  public ModelAndView showStatPage() {
    return new ModelAndView("stat/statistics");
  }

  @RequestMapping(value = "ap_resource", method = RequestMethod.GET)
  public ModelAndView test(@RequestParam("ap") String ap) {
    ModelAndView model = new ModelAndView("teacher/resource/add/ap_resource");

    // model.addObject("map", map);
    model.addObject("ap", ap);
    // System.out.println(map);
    // throw new CustomGenericException("500","hello exception");
    return model;
  }

}
