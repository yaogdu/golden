<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<meta http-equiv="pragma" content="no-cache" />
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<title>添加学生</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
    <div class="mainIndex">
      <!-- left sidebar start -->
		<%@include file="include/left-menu.jsp" %>
      <!-- left sidebar end -->
      <!-- right mainCon start -->
      <div class="mainCon">
        <div class="mainTitle">
           <p>添加学生</p>
        </div>
        <div class="mainPart">
          <div class="conFormWrap">
            <div class="formTab">
              <ul class="TabTit">
                <li id="singleTab" class="current"><a href="javascript:void(0)" id="singleAdd">单个添加</a></li>
                <li id="batchTab"><a href="javascript:void(0)" id="batchAdd">批量导入</a></li>
              </ul>
            </div>
            <div class="formCon formCon02" id="single">
               <form action="add" method="post" id="Sform">
                <input type="hidden" id="context" value="${static_ctx}"/>
              <div class="formList">
                <label><em>*</em>学段/年级/班级：</label>
                <div class="info">
                <select name="stage" id="Sstage">
                   <option>请选择</option>
		           <c:forEach var="stage" items="${stages}">
		              <option>${stage.stageName}</option>
				   </c:forEach> 
				</select>
				<select name="grade" id="Sgrade">
				   <option>请选择</option>
				    <c:forEach var="grade" items="${grades}">
					  <option>${grade.gradeName}</option>
					</c:forEach>
				</select>
				<select name="class" id="Sclass" style="width:80px;">
				    <option>请选择</option>
					<c:forEach var="klass" items="${klasses}">
						<option value="${klass.classNumber}">${klass.classNumber}班</option>
					</c:forEach>
				</select>
              </div>
              </div>
              <div class="formList">
                <label><em>*</em>入学日期：</label>
                <div class="info">
                  <div class="selectBoxWrap">
                    <div class="trigger">
                      <input type="text" name="enter_time" id="startTime" class="selectText" style="width:100px;"/>
                      <a class="btnTrigger time" href="javascript:void(0)" id="startTrigger"></a>
                    </div>
                    <div class="selectBox" style="display:none"> </div>
                  </div>
                </div>
              </div>
              <div class="formList">
                <label><em>*</em>姓名：</label>
                <div class="info">
                  <input type="text" class="inputText" name="name" id="name">
                </div>
              </div>
              <div class="formList">
                <label>学号：</label>
                <div class="info">
                  <input type="text" class="inputText" name="school_number" id="school_number" value="">
                </div>
              </div>
              <div class="formList">
                <label>性别：</label>
                <div class="info">
                   <select name="gender" id="gender">
                       <option value="0">请选择</option>
				       <option value="1">男</option>
				       <option value="2">女</option>
				   </select>
                </div>
                </div>
              <div class="formList">
                <label>手机：</label>
                <div class="info">
                  <input type="text" class="inputText" name="tel" id="tel" />
                </div>
                <p class="infoHint infoHint01">不能与系统中已存在手机号重复</p>
              </div>
              <div class="formList">
                <label>邮箱：</label>
                <div class="info">
                  <input type="text" class="inputText" name="email" id="email" />
                </div>
                <p class="infoHint infoHint01">不能与系统中与存在邮箱重复</p>
              </div>
              </form>
               <div class="conBtnWrap conBtnWrap01">
            <div class="BtnOrange30">
              <a id="Ssubmit" class="btnSave" href="javascript:void(0)"><span class="downloadIco"></span>确认</a>
            </div>
          </div>
 </div>
 <!-- 这里是单独添加学生结束的地方 -->
         <div class="formCon formCon02" id="batch">
    <form action="addBatch" method="post" enctype="multipart/form-data" id="Bform">
	<h4 class="listTitle">1、班级信息</h4>
        <div class="formList">
            <label><em>*</em>学科/年级/班级：</label>
            <div class="info">
               <select name="stage" id="Bstage">
                  <option>请选择</option>
			      <c:forEach var="stage" items="${stages}">
		              <option>${stage.stageName}</option>
			      </c:forEach> 
			</select>
		<select name="grade" id="Bgrade">
		    <option>请选择</option>
			<c:forEach var="grade" items="${grades}">
			<option>${grade.gradeName}</option>
		</c:forEach>
	</select>
		<select name="class" id="Bclass" style="width:80px;">
		<option>请选择</option>
	<c:forEach var="klass" items="${klasses}">
		<option value="${klass.classNumber}">${klass.classNumber}班</option>
	</c:forEach>
		</select>
            </div>
         </div>
         <div class="formList">
            <label><em>*</em>入学日期：</label>
             <div class="info">
                 <div class="selectBoxWrap">
                    <div class="trigger">
                       <input type="text" name="enter_time" id="endTime" class="selectText" style="width:100px;" />
                       <a class="btnTrigger time" href="javascript:void(0);" id="endTrigger"></a>
                    </div>
                    <div class="selectBox" style="display:none"></div>
                 </div> 
             </div>   
         </div>
    <h4 class="listTitle">2、上传文件</h4>
         <div class="formList">
             <div class="BtnWhite28">
               <a id="btnSave" class="btnSave" href="${static_ctx}/static/template/ImportStudents.xlsx" target="_blank"><span class="downloadIco"></span>模版下载</a>
            </div>
          </div>
          <div class="formList">
             <div class="info">
                  <input id="file_name" class="inputText" type="" name="" value="" />
             </div>
             <div class="BtnGray23">
                 <!-- <input type="file" name="file" /> -->
                <a class="btnSave" id="file"><span>浏览...</span></a>
             </div>
         </div>
         <div class="formList">
           <p class="infoHint">文件格式必须为excel，后缀是xls或者xlsx</p>
         </div>
	  </form>
	  <div class="conBtnWrap conBtnWrap02">
            <div class="BtnOrange30">
              <a id="Bsubmit" class="btnSave" href="javascript:void(0)"><span class="downloadIco"></span>确认</a>
            </div>
          </div>
  </div>
          </div>
        </div>
      </div>
      <!-- right mainCon start -->
    </div>
    <div class="BackToTop"><a title="返回顶部" href="">返回顶部</a></div>
  </div>
  <!-- main end -->
  <!-- footer start -->
  <div class="footer">
    <p>新东方教育科技集团旗下成员公司 全国客服专线：<em>400-676-2300</em> 上海客服专线：021-65017211 购卡咨询(上海)：021-65026384</p>
    <p>Copyright &copy; 2000-2012 koolearn.com Inc. All rights reserved. 新东方在线 版权所有 </p>
    <p>京ICP证050421号京ICP备05067669号京公安备110-1081940 网络视听许可证0110531号</p>
  </div>
  <!-- footer end -->
</div>
<!-- cantainer end-->
	<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
	<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.html5.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.flash.js?v=${version}"></script>
	<script src="${static_ctx}/static/js/school/student/addStudent.js" type="text/javascript"></script>
</body>
</html>
