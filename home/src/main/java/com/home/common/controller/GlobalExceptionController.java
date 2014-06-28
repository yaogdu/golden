package com.home.common.controller;

import java.nio.file.FileSystems;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import com.home.exception.CustomGenericException;

@ControllerAdvice
public class GlobalExceptionController {

  /*--------------------------------------------
  |             C O N S T A N T S             |
  ============================================*/
  private static final Logger logger = Logger.getLogger(GlobalExceptionController.class);

  @ExceptionHandler(Exception.class)
  public ModelAndView handleAllException(Exception ex) {
    ModelAndView model = new ModelAndView("error/500");
    model.addObject("errMsg", ex.getStackTrace());
    ex.printStackTrace();
    return model;
  }

  /*--------------------------------------------
  |               M E T H O D S               |
  ============================================*/
  @ExceptionHandler(CustomGenericException.class)
  public ModelAndView handleCustomException(CustomGenericException ex) {
    ModelAndView model = new ModelAndView("error/500");
    model.addObject("errCode", ex.getErrCode());
    model.addObject("errMsg", ex.getErrMsg());
    return model;
  }

}