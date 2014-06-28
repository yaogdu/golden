package com.home.quiz.controller;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
  public ModelAndView index() {
    // throw new CustomGenericException("500","hello exception");
    return new ModelAndView("teacher/resource/add/ad");
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

  @RequestMapping(value = "/test", method = RequestMethod.GET)
  public ModelAndView test() {
    return new ModelAndView("test");
  }

}
