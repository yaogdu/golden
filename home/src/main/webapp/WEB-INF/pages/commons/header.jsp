<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<div class="header">
	<div class="logo">
		<h1><a href="${ctx }"><img alt="" title="智慧学堂" src="${static_ctx}/static/img/logo/logo.png" /></a></h1>
		<a href="${ctx }" class="home" title="返回首页"></a>
	</div>
	<div class="oper">
		<div class="operLf">
			<c:if test="${islogin}">
			<span class="welcome">欢迎你，<em>${ user.name }</em></span>
			<a style="margin-left:10px;" href="${ctx}/user/index" target="_blank">个人中心</a>
			</c:if>
		</div> 
			<c:if test="${!islogin}">
		<div class="operRt">
			<a class="login" id="hd_menu_login" href="javascript:void(0);">登录</a>
		</div>
			</c:if>
			<c:if test="${islogin}">
		<div class="operRt">
			<a class="exit"  id="hd_menu_logout" href="javascript:void(0);">退出</a>
		</div>
			</c:if>
	</div>
</div>

<script type="text/javascript">
	$(document).ready(function() {
		$("#hd_menu_logout").click(function() {
			var url = ctx + "/login/logout";
			$.ajax({
				url : url,
				type : 'post',
				async : false,
				success : function(value) {
					if (value.success) {
						window.location = ctx;
					}
					else{
						alert(value);
					}
				},
				error : function(value){
					alert(value.responseText);
				}
			});
		});
		$('#hd_menu_login').click(function() {
			var popuppath = ctx + "/login/popup/login/";
			if(returnurl){
				popuppath += "?returnurl=" + encodeURIComponent(returnurl);
			}
			art.dialog({
				lock: true,
				top: 100,
			    opacity: 0.5,	// 透明度
				width : 320,
				height : 270,
				zIndex : 1000,
				id : "login_dialog",
				title : '登录',
				content : "<iframe style='width:310px; height:350px; border:0px;' src='"+popuppath+"'></iframe>",
				okValue : '确认',
				padding : '0px',
				model : true
			});
			return false;
		});

		if(returnurl){
			$('#hd_menu_login').trigger("click");
		}
	});
</script>