<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>我的主页</title>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.full.min.js?v=${version}"></script>
	<script type="text/javascript">
	var initUploader = function (){
		plupload.addI18n({
	        'File extension error.' : '文件类型错误',
	        'File size error.' : '文件大小超出限制'
	    });
	    //文件上传控件参数配置
	    var avatar_uploader = new plupload.Uploader({
	    	runtimes : 'html5,flash,silverlight,html4',
	        browse_button : 'buttonupload', //选择文件按钮ID 
	        max_file_size : '50mb',  //文件上传最大值
	        chunks : false,//不分块上传
	        unique_names : true,  // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
	        url: ctx+'/common/upfile', //提交到后台的url地址
	        flash_swf_url: static_ctx+'/js/lib/plupload/Moxie.flash.swf',//plupload.flash.swf文件所在路径
	        silverlight_xap_url : static_ctx+'/js/lib/plupload/Moxie.xap',
	        multi_selection : false,
	        filters: [
	              {title: "document", extensions: "jpg,bmp,gif"}
	        ],
	        init : {
	            FileUploaded : function(up, file, info) {
	                avatar_uploader.disableBrowse(false);
	                var data = eval('('+info.response+')');
	                if (data.success == false) {
	                	util.dialog.errorDialog('上传失败');
	                    return;
	                }else{
	                	//document.getElementById("head_image").value = data.filename;
	                	document.getElementById("imagepriview").src = data.url;
	                	updateUserInfo("head_image", data.filename);
	                	window.location = window.location;
	                }
	                
	            },
	            FilesAdded : function(up, files){
	                avatar_uploader.start();
	            },
	            BeforeUpload : function(up, file){
	                avatar_uploader.disableBrowse(true);
	            },
	            UploadProgress : function(up, file) { 
	                $('.paper-upload-btn').text('已上传'+file.percent+'%');
	                if(file.percent === 100){
	                	$('.paper-upload-btn').text('文件处理中...');
	                }
	            },
	            Error : function(up, err) {
	                avatar_uploader.disableBrowse(false);
	                up.refresh(); // Reposition Flash/Silverlight
	                util.dialog.errorDialog(err.message);
	            }
	        }
	    });
	    avatar_uploader.init();
	};
	
	function updateUserInfo(type, value){
		var url = ctx + "/user/edit";
		var ret = true;
		var updatedata = {};
		
		if(type == "head_image"){
			updatedata["head_image"] = value;
		}
		if(type == "nickname"){
			updatedata["nickname"] = value;
		}
		if(type == "phone"){
			updatedata["phone"] = value;
		}
		if(type == "email"){
			updatedata["email"] = value;
		}
		if(type == "fullname"){
			updatedata["fullname"] = value;
		}
		if(type == "gender"){
			updatedata["gender"] = value;
		}
		
		$.ajax({ 
				url : url,
				type : 'post',
				async : false,
		        dataType : "json",
				data : updatedata,
				success : function(value) {
					if (value.success) {
						//window.location = window.location;
					}
					else{
						alert(value.message);
						ret = false;
					}
				}
		});
		if(!ret){
			return false;
		}
	}
	function changeNickName(){
    	updateUserInfo("nickname", $("#nickname").val());
    	window.location = window.location;
	}
	function changePhone(){
    	updateUserInfo("phone", $("#phone").val());
    	window.location = window.location;
	}
	function changeEmail(){
    	updateUserInfo("email", $("#email").val());
    	window.location = window.location;
	}
	function changefullname(){
    	updateUserInfo("fullname", $("#fullname").val());
    	window.location = window.location;
	}
	function changegender(){
		var gender = $("input[name='gender']:checked").val();
		if(gender){
			var g = gender == "male" ? "true" : "false";
	    	updateUserInfo("gender", g);
	    	window.location = window.location;
		}
	}
	
$(document).ready(function() {
	//initUploader();
	
	$('#change_password').click(function() {
		art.dialog({
					lock : true,
					opacity : 0.5, // 透明度
					width : 390,
					height : 170,
					zIndex : 2000,
					id : "dialog_password",
					title : '修改密码',
					content : '<div class="formCon">' + document.getElementById("divchangepassword").innerHTML + "</div>",
					okValue : '确认',
					padding : '0px',
					model : true,
					okValue : '确认',
					ok : function() {
						var url = ctx + "/user/changepassword";
						var ret = true;
						
						$.ajax({ 
								url : url,
								type : 'post',
								async : false,
						        dataType : "json",
								data : {
									oldpassword : $("[name='oldpassword']").val(),
									password1 : $("[name='password1']").val(),
									password2 : $("[name='password2']").val()
								},
								success : function(value) {
									if (value.success) {
										window.location = window.location;
									}
									else{
										alert(value.message);
										ret = false;
									}
								}
						});
						if(!ret){
							return false;
						}
					}
				});
		return false;
	});
});
function activate(){
	var url = ctx + "/user/activate";
	$.ajax({
		url : url,
		type : 'post',
		async : false,
		success : function(value) {
			if (value.success) {
				alert("发送激活邮件成功！");
			}
			else{
				alert(value.message);
			}
		}
	});
}
	</script>
	<%
	request.setAttribute("left_menu", "index");
	%>
</head>
<body>
<div class="container">
  <div class="wrapper">
	<%@include file="/WEB-INF/pages/commons/header.jsp" %>
	
	    <!-- main start -->
    <div class="mainWrap">
      <div class="mainBgCl">
        <div class="mainBgCr">
          <div class="mainBoxCon">
            
			<c:if test="${user.getType().name().equalsIgnoreCase(\"teacher\")}">
			<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
			</c:if>
			<c:if test="${user.getType().name().equalsIgnoreCase(\"student\")}">
			<%@include file="/WEB-INF/pages/student/commons/navigation.jsp" %>
			</c:if>
            
            <div class="mainBox"> 
              <div class="mainCutBox">
                <!-- mainTitle start -->
                <div class="mainHead">
                  <ul class="mainTitle">
                    <li class="current"><a href="" >个人中心</a></li>
                  </ul>
                </div>
                <!-- mainTitle end -->
                <!-- main end -->
                <div class="main main01">
                  <div class="mainIndex">
                    
					<%@include file="left.jsp" %>
	
                    <!-- right mainCon start -->
                    <div class="mainConWrap">
                      <div class="mainCon mainCon01">
                        <div class="mainTitle">
                          <p class="titext">基本信息</p>
<!--                           <a href="" class="titLink titLink01"><em></em>编辑</a> -->
                        </div>
                        <div class="mainPart">
                          <div class="conFormWrap">
                            <div class="formCon ">
<!--                               <div class="formList"> -->
<!--                                 <label><em>*</em>所在学校：</label> -->
<!--                                 <div class="info"> -->
<!--                                   <span class="infoLabel">石家庄实验小学 </span> -->
<!--                                 </div> -->
<!--                               </div> -->


							<c:if test="${isteacher}">
                              <div class="formList">
                                <label><em>*</em>任课班级：</label>
                                <div class="info">
                                	
                                	<c:forEach items="${classlist}" var="row">
	                                  <div class="infoTp">
	                                    <span class="infoLabel"> ${row.grade } ${row.classNumber} 班</span>
	                                  </div>
                                	</c:forEach>
                                
                                </div>
                              </div>
                              <div class="formList">
                                <label><em>*</em>任课科目：</label>
                                <div class="info">
                                  <span class="infoLabel">${ userinfo.subject }</span>
                                </div>
                              </div>
                              </c:if>
                              
                              
                              <div class="formList">
                                <label>系统号：</label>
                                <div class="info">
                                  <span class="infoLabel">${ userinfo.system_id }</span>
                                </div>
                              </div>
                              <div class="formList">
                                <label>登录号：</label>
                                <div class="info">
                                  <span class="infoLabel">${userinfo.login_name }</span>
                                </div>
<!--                                 <div class="info"> -->
<!--                                   <input class="inputText" type="text" name="" value="" /> -->
<!--                                   <p class="ifHint"><em>登录名重复，请重新输入</em></p> -->
<!--                                 </div> -->
                              </div>
                              <div class="formList">
                                <label><em>*</em>姓名：</label>
                                <div class="info">
                                  <span class="infoLabel">${userinfo.name }</span>
                                </div>
                                <div class="info">
                                  <input class="inputText" type="text" id="fullname" value="${userinfo.name }" />
                    				<a href="" class="ifAdd" onclick="changefullname(); return false;">【修改】</a>
                                </div>
                              </div>
                              <div class="formList">
                                <label>性别：</label>
                                <div class="info">
                                  <span class="infoLabel">${userinfo.gender == 1 ? "男" : "女" }</span>
                                </div>
                                <div class="info">
                                  <div class="infoBox">
                                    <input type="radio" name="gender" value="male" class="infoRadio" ${userinfo.gender == 1 ? "checked" : "" }>
                                    <p class="infoLabel">男</p>
                                  </div>
                                  <div class="infoBox">
                                    <input type="radio" name="gender" value="female" class="infoRadio" ${userinfo.gender == 0 ? "checked" : "" }>
                                    <p class="infoLabel">女</p>
                                  </div>
                    				<a href="" class="ifAdd" onclick="changegender(); return false;">【修改】</a>
                                </div>
                              </div>
<!--                               <div class="formList"> -->
<!--                                 <label>昵称：</label> -->
<!--                                 <div class="info"> -->
<%--                                   <span class="infoLabel">${userinfo.nickname }</span> --%>
<!--                                 </div> -->
<!--                                 <div class="info"> -->
<%--                                   <input class="inputText" type="text" name="" id="nickname" value="${userinfo.nickname }" /> --%>
<!--                     			  <a href="" class="ifAdd" onclick="changeNickName(); return false;">【修改】</a> -->
<!--                                 </div> -->
<!--                               </div> -->
                              <div class="formList">
                                <label>电话：</label>
                                <div class="info">
                                  <span class="infoLabel">${userinfo.tel }</span>
                                </div>
                                <div class="info">
                                  <input class="inputText" type="text" id="phone" value="${userinfo.tel }" />
                    				<a href="" class="ifAdd" onclick="changePhone(); return false;">【修改】</a>
                                </div>
                              </div>
                              <div class="formList">
                                <label>邮箱：</label>
                                <div class="info">
                                  <span class="infoLabel">${userinfo.email }</span>
                                </div>
                                <div class="info">
                                  <input class="inputText" type="text" name="" value="${userinfo.email }" />
<!--                                   <p class="ifHint"><em>邮箱格式不正确</em></p> -->

<%-- 					<c:if test="${userinfo.getIsActivate() == 0}"> --%>
					 
<%-- 					   <input class="infoText" type="text" value="${userinfo.email }" id="email" style="width:125px;" /> --%>
					   <a href="" class="ifAdd" onclick="changeEmail(); return false;">【修改】</a>
<!-- 					   <a href="" class="ifAdd" onclick="activate(); return false;">【激活】</a> -->
					 
<%-- 					</c:if> --%>
<%-- 					<c:if test="${userinfo.getIsActivate() != 0}"> --%>
					
<!-- 					<p class="ifHint">（已激活）</p> -->
<%-- 					</c:if> --%>
                                </div>
                              </div>
<!--                               <div class="conBtnWrap"> -->
<!--                                 <div class="BtnBlue23"> -->
<!--                                  <a id="btnSave" class="btnSave" href="javascript:void(0)"><span>保存</span></a> -->
<!--                                 </div> -->
<!--                                 <div class="BtnGray23"> -->
<!--                                  <a id="btnSave" class="btnSave" href="javascript:void(0)"><span>取消</span></a> -->
<!--                                 </div> -->
<!--                               </div> -->
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- right mainCon end -->
                  </div>
                </div>
                <!-- main end -->
              </div>        
            </div>       
          </div>
        </div>
      </div>
      <div class="mainBgBt"></div>
      <div class="BackToTop"><a href="#" title="回顶部"><span></span>回顶部</a></div>
    </div>
    <!-- main end -->
	
	
	<%@include file="/WEB-INF/pages/commons/footer.jsp"%>
</div>
</div>
</body>
</html>