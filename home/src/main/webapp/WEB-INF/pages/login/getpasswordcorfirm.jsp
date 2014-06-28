<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<link href="${static_ctx}/static/css/vote.css" rel="stylesheet"
	type="text/css" media="all" />
<title>重新设置密码</title>
<style type="text/css">
</style>
	<script type="text/javascript">
	$(document).ready(function() {
		//initUploader();
		var message = '${message}';
		if(message){
			alert(message);
		}
		
		$('#btnSave').click(function() {
			$("#form").submit();
			return false;
		});
	});
	</script>
</head>
<body>

<div class="container">
  <div class="wrapper">


	<%@include file="/WEB-INF/pages/commons/header.jsp"%>

<!-- main start -->
    <div class="mainWrap">
      <div class="mainBgCl">
        <div class="mainBgCr">
          <div class="mainBoxCon">
            
			<%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
            
            <div class="mainBox"> 
              <div class="mainCutBox">
                <!-- mainTitle start -->
                <div class="mainHead">
                  <ul class="mainTitle">
                    <li class="current"><a href="" >重新设置密码</a></li>
                  </ul>
                </div>
                <!-- mainTitle end -->
                <!-- main end -->
                <div class="main main01">
                  <div class="mainIndex">
                    
	
                    <!-- right mainCon start -->
                    <div class="mainConWrap">
                      <div class="mainCon mainCon01">
<!--                         <div class="mainTitle"> -->
<!--                           <p class="titext">修改密码</p> -->
<!--                         </div> -->
                        <div class="mainPart">
                          <div class="conFormWrap">
                            <div class="formCon ">
                            
				<form action="" method="post" id="form">
                            
                              <div class="formList">
                                <label>密码：</label>
                                <div class="info info02">
							<input type="password" value="" id="password1" name="password1">
                                </div>
                              </div>
                              <div class="formList">
                                <label>确认密码：</label>
                                <div class="info info02">
							<input type="password" value="" id="password2" name="password2">
                                </div>
                              </div>
                              <div class="formList">
                                <label>验证码：</label>
                                <div class="info info02">
								<input type="text" value="" name="validatecode"
									style="width: 100px;"> 
									
									<img
									src="${ctx }/captchahtm" style="width: 90px;" title="点击刷新"
									onclick="this.src='${ctx }/captchahtm?date='+new Date()"
									style="cursor: pointer" />
<!--                                   <p class="ifHint"><em>两次输入的密码不一致</em></p> -->
                                </div>
                              </div>
                              <div class="conBtnWrap">
                                <div class="BtnBlue23">
                                 <a id="btnSave" class="btnSave" href="javascript:void(0)"><span>确定</span></a>
                                </div>
                              </div>
                              
                              




					<div class="register" style="padding-left:300px; padding-right:250px;">
					
					
					</div>
				</form>
			
			
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