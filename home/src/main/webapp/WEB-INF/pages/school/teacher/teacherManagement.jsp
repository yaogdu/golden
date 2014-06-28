<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>教师管理</title>
<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
<link href="${static_ctx}/static/css/lib/jquery-ui.css" rel="stylesheet" type="text/css"/>
<link href="${static_ctx}/static/css/lib/jquery-ui-timepicker-addon.min.css" rel="stylesheet" type="text/css"/>


<script src="${static_ctx}/static/js/lib/jquery-ui.min.js"></script>
<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-addon.min.js"></script>
<script src="${static_ctx}/static/js/lib/datetimepicker/jquery-ui-timepicker-zh-CN.js"></script>
<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
<script type="text/javascript" src="${context}/static/js/jquery-1.10.2.min.js"></script>
<script src="${static_ctx}/static/js/school/teacher/teacher.js" type="text/javascript"></script>
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

</head>
<body>
<!-- cantainer start-->
<div class="container">

  <!-- header start -->
  <%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
  <!-- header end -->
  <!-- main start -->
  <div class="mainWrap">
    <div class="mainIndex">
      <!-- left sidebar start -->
      <%@include file="include/left-menu.jsp" %>
      <div class="mainCon">
        <div class="mainTitle">
		 	<label>教师管理</label>         
		  <div class="operBtn">
            <div class="BtnWhite28">
              <a href="javascript:void(0)" class="btnSave" id="checkout">批量导出</a>
            </div>
          </div>
        </div>
        <div class="mainPart">
          <div class="conBox">
          <form method="post" action="teacherManagement" id="teacherManagement" name="teacherManagement">
            <div class="conFormList">
              <div class="conForm">
			   			<div class="info">
					 		<label>系统号<input id="systemId" name="systemId" type="text" /></label>
					 		<label>姓名<input id="name" name="name" type="text" /></label>
                     		<label>学段<select id="stage" name="stage" >
      								<option value="0">--请选择所在学段--</option>
      								<c:forEach var="s" items="${stages}">
										<option value="${s.stageName}">${s.stageName}</option>
									</c:forEach>
       					  	  </select>
							</label>
							<label>学科<select name="subject" id="subject">
       							<option value="0">--请选择--</option>
      						  </select>
     						</label>
     				<div class="BtnBlue22">
                    	<a id="btnSave" class="btnSave"  onClick="submitForm()">查询</a>
                  	</div>
		      		</div>
		   		</div>
		   	</div>
		</form>
      </div>
    </div>
  <!--  <div class="tipsBox">搜索 “<em>2012年湖南省长沙市初中毕业物理考试</em>”，获得约<em>  </em>条结果</div> --> 
            <div class="conShow">
              <div class="list">
                  <table class="listTable">
                    <thead>
              			<th width="10%">系统号</th> 
            			<th width="10%">登录名</th> 
                		<th width="10%">姓名</th> 
                		<th width="10%">学段</th> 
               			<th width="10%">学科</th>
               			<th width="10%">状态</th>
                		<th width="40%">操作</th>
           			</thead>
           			<tbody id="exportData">
					<c:forEach var="t" items="${teacherList}" begin="1" end="${currentPageTotalNumber}"> 
                		
                		<tr id="noncondition" align="center"> 
                    	<td>${t.systemId}</td> 
                    	<td>${t.loginName}</td> 
                    	<td>${t.name}</td> 
                    	<td>${t.stage}</td> 
						<td>${t.subject}</td> 
                    	<td>
                    	<c:if test="${t.status=='1'}">启用</c:if>
                    	<c:if test="${t.status=='0'}">停用</c:if>
                   	 	<c:url var="checkUrl" value="checkPage">
                    		<c:param name="systemId" value="${t.systemId}" /> 
						</c:url>
						</td>
						<td>
                    	<a  id="check" href='<c:out value="${checkUrl}"/>'>查看</a> 
						<c:url var="editUrl" value="editTeacher">
							<c:param name="systemId" value="${t.systemId}" /> 
						</c:url>
                    	<a  id="edit" href='<c:out value="${editUrl}"/>'>编辑 </a> 
						<c:if test="${t.status=='0'}">
						<c:url var="editUrl" value="statusChangeToStart">
							<c:param name="systemId" value="${t.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>'>启用</a>
						</c:if>
                    	<c:if test="${t.status=='1'}">
                   		<c:url var="editUrl" value="statusChangeToStop">
							<c:param name="systemId" value="${t.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>'>停用</a>
                    	</c:if> 
						<c:url var="editUrl" value="resetPwd">
							<c:param name="systemId" value="${t.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>' onClick="resetPwd()">重置密码</a> 
						</td> 
                		</tr> 
         			 </c:forEach> 
          	 
		  			<c:forEach var="cL" items="${conditionList}" begin="${minNumber}" end="${maxNumber}"> 
               	 		<tr id="condition" align="center"> 
                    	<td>${cL.systemId}</td> 
                    	<td>${cL.loginName}</td> 
                    	<td>${cL.name}</td> 
                   	 	<td>${cL.stage}</td> 
						<td>${cL.subject}</td> 
                    	<td>
                   	 	<c:if test="${cL.status=='1'}">启用</c:if>
                    	<c:if test="${cL.status=='0'}">停用</c:if>
                    	</td> 
                   		<td>
                    	<c:url var="checkUrl" value="checkPage">
                    	<c:param name="systemId" value="${cL.systemId}" /> 
						</c:url>
                    	<a  id="check" href='<c:out value="${checkUrl}"/>'>查看</a> 
						<c:url var="editUrl" value="editTeacher">
							<c:param name="systemId" value="${cL.systemId}" /> 
						</c:url>
                    	<a  id="edit" href='<c:out value="${editUrl}"/>'>编辑 </a> 
						<c:if test="${cL.status=='0'}">
						<c:url var="editUrl" value="statusChangeToStart">
							<c:param name="systemId" value="${cL.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>'>启用</a>
						</c:if>
                   		<c:if test="${cL.status=='1'}">
                   		<c:url var="editUrl" value="statusChangeToStop">
							<c:param name="systemId" value="${cL.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>'>停用</a>
                   		</c:if> 
						<c:url var="editUrl" value="resetPwd">
							<c:param name="systemId" value="${cL.systemId}" /> 
						</c:url>
						<a  id="edit" href='<c:out value="${editUrl}"/>' onClick="resetPwd()">重置密码</a> 
						</td> 
                		</tr> 
          			</c:forEach> 
          			</tbody>
              </table>
           </div>
          </div>
          <div class="conPageWrap">
            <div class="conPage">
               <div class="pageTotal">
                 <div class="pageLabel">共<span>${totalPages}</span>页，<span>${count}</span>条记录</div>
               </div>
               
								
               
               <div class="pageNumber">
                 	<span class="pagePre"><a onClick="prePage()">上一页</a></span>
                 <c:forEach var="pageNumber" begin="1" end="${totalPages}">
						<c:url var="pageUrl" value="pageController">
							<c:param name="pageNumber" value="${pageNumber}" /> 
						</c:url>
							<div id="currentPage" value="${pageNumber}"><span><a href='<c:out value="${pageUrl}"/>' class="currentPage" >${pageNumber}</a></span></div>
                 </c:forEach>
					<span class="pageNext">
						<a onClick="afterPage()">下一页</a>
                 	</span>
               </div>
               <div class="pageTotal">
                 <div class="pageBox">
                   <label>到</label>
                   <input id="goPage" type="text" value="10" class="text"> 
                   <label>页</label>
                 </div>
                 <div class="BtnBlue22">
                    <a href="javascript:void(0)" class="btnSave" id="btnSave">确定</a>
                  </div>
               </div>
             </div>
          </div>
      </div>
      <!-- right mainCon end -->
    </div>
    <div class="BackToTop"><a title="返回顶部" href="${static_ctx}/school/teacher/teacherManagement">返回顶部</a></div>
  </div>
  <!-- main end -->
  <!-- footer start -->
  <div class="footer">
    <%@include file="/WEB-INF/pages/commons/school/footer.jsp" %>
  </div>
  <!-- footer end -->
</div>
<!-- cantainer end-->
</body>
</html>