<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	<script src="${static_ctx}/static/js/school/teacher/addTeacherBatch.js" type="text/javascript"></script>
	<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
	<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
	
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.html5.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.flash.js?v=${version}"></script>
	<title>添加教师</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle"><p>添加教师</p></div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formTab">
				              	<ul class="TabTit">
					                <li><a href="${static_ctx}/school/teacher/toAddPage">单个添加</a></li>
					                <li class="current"><a href="javascript:void(0)">批量导入</a></li>
				              	</ul>
				            </div>
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="schoolId" value=""/>
								<h4 class="listTitle">上传文件</h4>
								<div class="formList">
				                	<div class="BtnWhite28">
				                		<a id="dndTemplate" href="javascript:void(0);" class="btnSave" onclick="downloadTemplate()"><span class="downloadIco"></span>模版下载</a>
				                		<iframe id="fileDownFrame" src="" style="display:none; visibility:hidden;"></iframe>
				                	</div>
				              	</div>
								<div class="formList">
					            	<div class="info">
					                  	<input id="fileName" class="inputText">
					                </div>
					                <div class="BtnGray23">
					                 	<a id="selectFile" class="btnSave" href="javascript:void(0)"><span>浏览...</span></a>
					                </div>
					                <div id="excelShowBar" class="info">
										<div class="infoSwBox">
											<a class="infoSw" href="javascript:void(0);">
												<span class="swIco01"></span>
												<p id="excel_file"></p>
											</a>
											<div class="infoBarBox">
												<div class="infoBar">
													<div class="barBg" style="width:50%"></div>
												</div>
											</div>
										</div>
									</div>
					    		</div>
								<div class="formList">
				                	<p class="infoHint">文件格式必须为excel，后缀是xls或者xlsx</p>
				              	</div>
           					</div>
           				</div>
				    	<div class="conBtnWrap conBtnWrap02">
				            <div class="BtnOrange30">
				              	<a href="javascript:void(0)" class="btnSave" onclick="batchAdd();" id="confirmBtn"><span class="downloadIco"></span>确认</a>
				            </div>
			          	</div>
				    	
           			</div>
        		</div>
        	</div>
        </div>
        <%@include file="/WEB-INF/pages/commons/school/footer.jsp"%>
	</div>
</body>
</html>

