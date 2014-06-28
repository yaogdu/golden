<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
 <div class="header">
 	<div class="headIco">
      	<div class="headCon">
		    <h1 class="headLogo">
		      <a title="新东方" href=""><img src="${static_ctx}/static/img/school/logo/logo01.png" /> </a>
		    </h1>
		    <!-- nav start -->
		    <div class="headOper">
		     	<ul class="nav">
			        <li id="hd_menu_class" ><a href="${static_ctx}/school/class/toListPage" title="班级管理">班级管理</a></li>
					<li id="hd_menu_student" ><a href="${static_ctx}/school/student/home" title="学生管理">学生管理</a></li>
					<li id="hd_menu_teacher" ><a href="${static_ctx}/school/teacher/toListPage" title="教师管理">教师管理</a></li>
					<li id="hd_menu_system" ><a href="${static_ctx}/school/ct/toListPage" title="系统设置">系统设置</a></li>
		      	</ul>
		      	<div class="user">
		        	<a  class="userIco"></a>
			        <ul class="userList">
						<li><a id="hd_menu_logout" class="exit" href="javascript:void(0)">退出</a></li>
			        </ul>
		      	</div>
		    </div>
	    </div>
    </div>
</div>

<script type="text/javascript">
	$(document).ready(function(){
		$("#hd_menu_logout").on("click", function(){
	    	art.dialog({
	    		lock: true,
	    	    opacity: 0.5,	// 透明度
	    		width:240,
	    		height:120,
	    		top : 200,
	            id : "exit_dialog",
	            title : '确认退出',
	            content : '<div>确定要退出登录吗？</div>',
	            okValue : '确定',
	            ok : function() {
	            	var url = ctx + "/school/AdminLogin/logout";
	            	window.location.href = url;
	            },
	            cancelValue : '返回',
	            cancel : function() {
	            },
	            init: function() {
	                $("a.aui_close").remove();
	            },
	            esc: false
	        });
		});
	});
</script>