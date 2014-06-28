<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<%@include file="/WEB-INF/pages/commons/meta.jsp"%>
<link href="${static_ctx}/static/css/common.css" rel="stylesheet" type="text/css" media="all" />
<link href="${static_ctx}/static/css/stylesheet.css" rel="stylesheet" type="text/css" media="all" />
<link href="${static_ctx}/static/css/index.css" rel="stylesheet" type="text/css" media="all" />
<title>制作课件</title>
</head>

<body>
<div class="container">
  <div class="wrapper">
    <!-- header start-->
    <%@include file="/WEB-INF/pages/commons/header.jsp"%>
    <!-- header end -->
    <!-- main start -->
    <div class="mainWrap">
      <div class="mainBgCl">
        <div class="mainBgCr">
          <div class="mainBoxCon">
            <%@include file="/WEB-INF/pages/teacher/commons/navigation.jsp" %>
            <div class="mainBox"> 
              <div class="mainCutBox">
              <input type="hidden" id="stageId" value="${stageId}">
  			  <input type="hidden" id="subjectId" value="${subjectId}">
                <!-- mainHead start -->
                <div class="mainHead">
                  <ul class="mainTitle">
                    <li class="current"><a href="" >制作课件</a></li>
                    <li><a href="${ctx }/teacher/resource/courseware" >参考课件</a></li>
                  </ul>
                </div>
                <!-- mainHead end -->
                <!-- main start -->
                <div class="main">
                  <div class="mainIndex">
                    <!-- mainPart start -->
                    <div class="mainPart">
                      <div class="infoList">
						<dl id = "kownledge_type" class="infoLine">
								<dt><em>*</em>知识类别：</dt>
								<dd>
									<a class="current" href="javascript:void(0);" onclick="latte.createcourse.getmodules()" >主题</a>
									<a href="javascript:void(0);" onclick="latte.createcourse.getseries()" >专题</a>
								</dd>
							</dl>
                        <dl id="kownledge_module" class="infoLine">
									<dt><em>*</em>知识模块：</dt>
									<dd></dd>
						</dl>
                        <dl id="kownledge_unit" class="infoLine">
									<dt><em>*</em>知识单元：</dt>
									<dd></dd>
								</dl>
                        <dl id="kownledge_topic" class="infoLine">
									<dt><em>*</em>知识主题：</dt>
									<dd></dd>
								</dl>
                        <dl id="kownledge_selected" class="infoLine selected">
                          <dt>已选知识：</dt>
                          <dd>
                            <div class="clear" href="javascript:void(0);" class="removeAll" id="removeAll">全部清除</div> 
                          </dd>
                        </dl>
                      </div>
                      <!-- <div class="hintBubble">
                        <span class="hintIco"></span>
                        <p>点击名称，可查看知识点详情。</p>
                        <a href="">知道了</a>
                      </div> -->
                      <div class="conBtnWrap">
                        <div class="BtnBlue23">
                         <a href="javascript:void(0)" class="btnSave" id="btn_goto_whiteboard" ><span>直接制作</span></a>
                        </div>
                        <div class="BtnBlue23">
                         <a href="javascript:void(0)" class="btnSave" id="btn_upload_ppt"><span>导入ppt</span></a>
                        </div>
                      </div>
                    </div>
                    <!-- mainPart end -->
                  </div>
                </div>
                <!-- main end -->
              </div>        
            </div>       
          </div>
        </div>
      </div>
      <div class="mainBgBt"></div>
      <div class="BackToTop"><a href="" title="回顶部"><span></span>回顶部</a></div>
    </div>
    <!-- main end -->
    <!-- footer start -->
   		 <%@include file="/WEB-INF/pages/commons/footer.jsp" %>
    <!-- footer end -->
  </div>
</div>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.html5.js?v=${version}"></script>
	<script type="text/javascript" src="${static_ctx}/static/js/lib/plupload/plupload.flash.js?v=${version}"></script>
	<script src="${static_ctx}/static/js/teacher/course/createcourseware.js"
		type="text/javascript"></script>

	<script type="text/javascript" >
		$(document).ready(function(){
			latte.createcourse.init();
		});
	
	</script>

</body>
</html>
