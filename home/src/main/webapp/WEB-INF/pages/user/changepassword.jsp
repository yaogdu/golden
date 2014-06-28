<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
	<title>修改密码</title>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.full.min.js?v=${version}"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		//initUploader();
		
		$('#btnSave').click(function() {

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
							alert("修改成功！");
							window.location = ctx + "/user/index";
						}
						else{
							alert(value.message);
							ret = false;
						}
					}
			});
			return false;
		});
	});
	</script>
	<%
	request.setAttribute("left_menu", "changepassword");
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
                          <p class="titext">修改密码</p>
                        </div>
                        <div class="mainPart">
                          <div class="conFormWrap">
                            <div class="formCon ">
                              <div class="formList">
                                <label>当前密码：</label>
                                <div class="info info02">
                                  <input type="password" value=""  name="oldpassword" class="infoText">
<!--                                   <p class="ifHint"><em>请您输入当前密码</em></p> -->
                                </div>
                              </div>
                              <div class="formList">
                                <label>新密码：</label>
                                <div class="info info02">
                                  <input type="password" value="" name="password1" class="infoText">
<!--                                   <p class="ifHint"><em>请输入您的新密码</em></p> -->
                                </div>
                              </div>
                              <div class="formList">
                                <label>确认新密码：</label>
                                <div class="info info02">
                                  <input type="password" value="" name="password2" class="infoText">
<!--                                   <p class="ifHint"><em>两次输入的密码不一致</em></p> -->
                                </div>
                              </div>
                              <div class="conBtnWrap">
                                <div class="BtnBlue23">
                                 <a id="btnSave" class="btnSave" href="javascript:void(0)"><span>确定</span></a>
                                </div>
                                <div class="BtnGray23">
                                 <a id="btnCancel" class="btnSave" href="javascript:void(0)"><span>取消</span></a>
                                </div>
                              </div>
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