<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<head>
<title>教师编辑</title>
		<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
		<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
		
		<script src="${static_ctx}/static/js/school/academicYear/addAcademicYear.js" type="text/javascript"></script>
		<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
		<title>编辑教师</title>
</head>
<script type="text/javascript">
function submitEdit()
{
	document.getElementById("editTeacher").submit();
}
function cancelEdit()
{
	document.getElementById("editTeacher").reset();	
}
</script>
<body>
		<div class="container">
			<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
			<div class="mainWrap">
				<div class="mainIndex">
					<%@include file="include/left-menu.jsp" %>
					<div class="mainCon">
						<div class="mainTitle">
							编辑教师
						</div>
						<div class="mainPart">
							<div class="conFormWrap">
								<div class="formCon">
									<form action="editTeacher" method="post" enctype="multipart/form-data" id="editTeacher" name="editTeacher">
										<div class="formList">
											<label>系统号:</label>
											<div class="info">
												<label><input id="systemId" name="systemId" type="text" value=${tList[0].systemId} readonly/></label>
											</div>
										</div>
										<div class="formList">
											<label>登录名<em>*</em>:</label>
											<div class="info">
												<input id="loginName" name="loginName" type="text"  />
											</div>
										</div>
										<div class="formList">
											<label>姓名<em>*</em>:</label>
											<div class="info">
												<input id="name" name="name" type="text" />
											</div>
										</div>
										<div class="formlist">
											<div class="info">
											<label>学段<em>*</em>:</label>
											<select id="stage" name="stage">
      											<option value=${tList[0].stage} selected="selected">${tList[0].stage}</option>
       										</select>	
       										</div>
       									</div>
       									<div class="formlist">
       										<div class="info">
       										<label>学科<em>*</em>:</label>	
       										<select id="subject" name="subject">
       											<option value=${tList[0].subject} selected="selected">${tList[0].subject}</option>
      										</select>
      										</div>
      									</div>
      									<div class="formlist">
      										<div class="info">
      										<label>性别：</label>
      										<select name="sex">
       											<option>--请选择--</option>
												<option value="1">男</option>
	  											<option value="0">女</option>
      										</select>
      										</div>
      									</div>
      									<div class="formlist">
      										<div class="info">
      											<label>手机：</label>
      											<input id="tel" name="tel" type="text" size="13"  />
      										</div>
      									</div>
										<div class="formList">
											<div class="conBtnWrap conBtnWrap01">
            									<div class="BtnOrange30">
              										<a id="btnSave" class="btnSave" onClick="submitEdit()"><span class="downloadIco"></span>确认</a>
            									</div>
            									<div class="BtnGray30">
              										<a id="btnSave" class="btnSave" onClick="cancelEdit()"><span class="downloadIco"></span>取消</a>
            									</div>
          									</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 底部 -->
			<%@include file="/WEB-INF/pages/commons/school/footer.jsp" %>
		</div>
	</body>
</html>