<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<title>按周浏览</title>
<style type="text/css">
    #maincontent .period {
        background-color:rgb(248, 251, 253);
    }
</style>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css" media="all"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css" media="all"/>
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<%
	request.setAttribute("main_menu", "menu_2");
	%>
</head>
<body>

<div style="display:none" id="divviewhistory">
起始日期：<input type="text" id="startTime"/>
</div>

<div class="container">
  <div class="wrapper">
	<!-- 头部 -->
	<%@include file="/WEB-INF/pages/commons/header.jsp"%>
	
    <!-- main start -->
    <div class="mainWrap">
      <div class="mainBgCl">
        <div class="mainBgCr">
          <div class="mainBoxCon">
			<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
            <div class="mainBox">
              <div class="mainIndex">
                <!-- mainTitle start -->    
                <div class="mainTitle mainTitle01">
                  <span>
<!--                   2013-2014学年上学期(高中生物) -->
				  <span id="xuenianinfo"></span>
                  <span id="xueqiinfo"></span>
                  
                  </span>
                  <div class="linkBox">
                    <a class="titLink titLink01" href="" id="viewhistory">查看学年历史</a>
                  </div>
                </div>
                <div class="mainPart">
                  <div class="conFormWrap">
                    <div class="formOper clearfix">
                      <div class="selectClass">

							<div class="selectBoxWrap" style="width:200px;">
								<select id="xuekelist" style="display:none">
									<option>初中</option>
								</select>
								<select id="classlist" style="width:200px;">
									<option>初中</option>
								</select>
							</div> 
                      </div>
                      <div class="selectDate selectDate01" style="text-align:center; padding-left:60px;"> 
                        <!-- <span id="timeinfo"> </span -->
                        <a href="#" id="lastweeklink" 	name="lastweeklink" class="rollLift  rollLiftNot"></a>
                        <input type="text" class="inputText"  id="timeinfo" name="" value="" readonly = "readonly" >
                        <a href="#" id="nextweeklink" name="nextweeklink" class="rollRight"></a>  
                      </div>
                      <div class="selectBtn">
                        <div class="BtnGray23">
                         <a id="btnSave" class="btnSave" href="?"><span>本周</span></a>
                        </div>
                        <div class="BtnBlue23">
                         <a id="btnviewcourse" class="btnSave" href="javascript:void(0)" onclick="window.location='${ctx }/teacher/course/courselist?gradeid=${classinfo.grade_id}&classid=${classinfo.class_number}'"><span><em class="section"></em>按章节查看</span></a>
                        </div>
                      </div>
                    </div>
                    <div class="formCon formCon01">
                      <div class="listRt">
                        <div class="list list02">
                          <table class="listTable" id="maincontent" style="border-left:#cde5f9 solid 1px;">
                            <thead>
                              <tr>
								<th style="width: 30px;">&nbsp;</th>
                                <th><a href="#" class="rollLift rollLiftNot" name="lastweeklink" id="lastweeklink"></a>周一</th>
                                <th>周二</th>
                                <th>周三</th>
                                <th>周四</th>
                                <th class="lineLast">周五 <a href="" class="rollRight" name="nextweeklink" id="nextweeklink"></a></th>
                              </tr>
                            </thead>
                            <tbody>
                            <tr></tr>
                            </tbody>
                          </table>
                        </div>	 
                      </div> 	
                    </div>
                  </div>
                </div>
              </div>   
            </div>       
          </div>
        </div>
      </div>
      <div class="mainBgBt"></div>
      <div class="BackToTop"><a href="" title="回顶部"><span></span>回顶部</a></div>
    </div>
    <!-- main end -->
	
	<!-- 底部 -->
	<%@include file="/WEB-INF/pages/commons/footer.jsp"%>

	<script type="text/javascript">
			var data = ${list};
			console.log(data);
			var disciplinelist = ${disciplinelist};
			console.log(disciplinelist);
			var classlist = ${classlist};
			console.log(classlist);
			var firstdate = new Date("${firstdate}");
			var weekend = new Date("${weekend}");
			var laststart = new Date("${laststart}");
			var nextstart = new Date("${nextstart}");
			var isteachermode = ${isteachermode};
			var teacherid = "${teacherid}";
			var clazzid = ${clazzid};
			
			
			$(document).ready(function(){
				$("#classlist option[value='${classinfo.id}']").attr(
						"selected", true);
			});
	</script>

	<script src="${static_ctx}/static/js/schedule/schedule.js"
		type="text/javascript"></script>
	<script src="${static_ctx}/static/js/schedule/coursebyweek.js"
		type="text/javascript"></script>

  </div>
</div>
</body>