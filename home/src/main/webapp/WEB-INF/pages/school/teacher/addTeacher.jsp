<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
		<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
		<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>
		
		<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
		<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
<title>添加教师</title>
</head>
<script type="text/javascript">
			$(document).ready(function(){
				$("#hd_menu_teacher").attr("class","current");
				$("#lmenu_1").attr("class","current");
				
                $("#singleAdd").css("background-color", "#FEB04B");
				$("#single").show();
				$("#batch").hide();
				$("#batchAdd").css("background-color", "#E8E8E8");
				
				$("#singleAdd").click(function(){
					$("#single").show();
					$("#batch").hide();
					$("#singleAdd").css("background-color", "#FEB04B");
					$("#batchAdd").css("background-color", "#E8E8E8");
				});
				
				$("#batchAdd").click(function(){
					$("#single").hide();
					$("#batch").show();
					$("#singleAdd").css("background-color", "#E8E8E8");
					$("#batchAdd").css("background-color", "#FEB04B");
				});
			});
</script>

<script>
$(document).ready(function() {
	   $("#stage").change(function(){
	  	 var subject= document.getElementById("subject");
	  	 var stages = new Array("小学", "初中", "高中"); 
	  	 var stage =$("#stage").find("option:selected").text();
	  	 for (i = 0; i < stages.length; ++i) {
	         if (stages[i] == stage) {
	            break;
	         }
	      }
	      $.ajax({
	          type: "POST",
	          url: "/portal_web/school/teacher/metaData?school_id=1&stageId="+i,
	          success: function(data, textStatus) {
	          	$("#subject").empty();
	          	for(i = 0;i <data.subjects.length;i++){
	          	$("#subject").append("<option>"+ data.subjects[i].subjectName+"</option>");
	          	}
	       }
	      });
	     });
	  });

</script>

<script>
function addShow()
{
	add.style.display="table";
	checkin.style.display="none";
}
function checkinShow()
{
	add.style.display="none";
	checkin.style.display="table";
}
</script>
<script type="text/javascript">
function confirmSubmit()
{
	document.getElementById("addTeacher").submit();
}
function cancelSubmit()
{
	document.getElementById("addTeacher").reset();	
}
</script>
<script type="text/javascript">
function batchSubmit()
{
	document.getElementById("checkin").submit();
}
function batchCancel()
{
	document.getElementById("checkin").reset();	
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
							添加教师
						</div>
						<div class="formTab">
              				<ul class="TabTit">
                			<li id="singleAdd"><a>单个添加</a></li>
                			<li id="batchAdd"><a>批量导入</a></li>
              				</ul>
            			</div>
						<div class="mainPart">
							<div class="conFormWrap" id="single">
								<div class="formCon formCon02">
									<form action="addTeacher" method="post" enctype="multipart/form-data" id="addTeacher" name="addTeacher">
										<div class="formList">
											<label>姓名<em>*</em>：</label>
											<div class="info">
												<label><input id="name" name="name" type="text" /></label>
												<label><font size="-1">姓名可以重复</font></label>
											</div>
										</div>	
											
										<div class="formList">
											<label>学段<em>*</em>：</label>
											<div class="info">
												<select id="stage" name="stage">
      												<option value="0">--请选择所在学段--</option>
      												<option value="小学">小学</option>
      												<option value="初中">初中</option>
	  												<option value="高中">高中</option>
       											</select>
											</div>
										</div>
										<div class="formList">
											<label>学科<em>*</em>：</label>
											<div class="info">
												<select id="subject" name="subject">
       												<option value="0">--请选择--</option>
      											</select>
      										</div>
      									</div>
										<div class="formList">
      										<label>性别：</label>
      										<div class="info">
      											<select name="sex">
       												<option>--请选择--</option>
													<option value="1">男</option>
	  												<option value="0">女</option>
      											</select>
      										</div>
										</div>
										<div class="formList">
											<label>手机：</label>
											<div class="info">
												<label><input id="phone" name="phone" type="text" size="13"  /></label>	
												<label><font size="-1">只能13位数字</font></label>
											</div>
										</div>
										<div class="conBtnWrap conBtnWrap01">
            								<div class="BtnOrange30">
              									<a id="btnSave" class="btnSave" onClick="confirmSubmit()"><span class="downloadIco"></span>确认</a>
            								</div>
            								<div class="BtnGray30">
              									<a id="btnSave" class="btnSave" onClick="cancelSubmit()"><span class="downloadIco"></span>取消</a>
            								</div>
          								</div>	
									</form>
								</div>
							</div>
							<div class="conFormWrap" id="batch">
								<div class="formCon">
									<form id="checkin" action="addBatch" method="post" enctype="multipart/form-data">
										<div class="formList">
                							<div class="BtnWhite28">
                  									<a id="btnSave" class="btnSave" href="javascript:void(0)"><span class="downloadIco"></span>模版下载</a>
               		 						</div>
              							</div>
              							<div class="formList">
                							<label>上传文件:</label>
                							<div class="info">
                  								<input type="file" name="file" />
                							</div>
                						<div class="BtnGray23">
                 							<a class="btnSave" id="btnSave"><span>浏览...</span></a>
                						</div>
              							</div>
              							<div class="formList">
                							<p class="infoHint">文件格式必须为excel，后缀是xls或者xlsx</p>
              							</div>
										<div class="conBtnWrap conBtnWrap02">
            							<div class="BtnOrange30">
              								<a id="btnSave" class="btnSave" onClick="batchSubmit()"><span class="downloadIco"></span>确认</a>
            							</div>
            							<div class="BtnGray30">
              								<a id="btnSave" class="btnSave" onClick="batchCancel()"><span class="downloadIco"></span>取消</a>
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