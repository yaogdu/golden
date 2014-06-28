<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
	<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/school/class/viewTeacherChangeHistory.js" type="text/javascript"></script>	
	<title>教师变更历史</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">
        				<p>教师变更历史</p>
		           		<div class="operBtn">
		             		<div class="BtnWhite28">
		             			<a href="javascript:window.history.back(-1);" class="btnSave"><span class="returnIco"></span>返回</a>
		             		</div>
		           		</div>	
        			</div>
        			<div class="mainPart">
        				<div class="conBox">
        					<input type="hidden" id="context" value="${static_ctx}"/>
							<input type="hidden" id="currentPage" value="${currentPage}"/>
							<input type="hidden" id="totalPage" value="${totalPage}"/>
							<input type="hidden" id="totalCount" value="${totalCount}"/>
            				<input type="hidden" id="classId" value="${classId }"/>
        					<div class="conShow">
              					<div class="list">
              						<table class="listTable">
					                    <thead>
					                      	<tr>
						                        <th>科目</th>
								              	<th>变更后教师</th>
								              	<th>变更前教师</th>
								              	<th>变更人</th>
								              	<th>变更时间</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach var="item" items="${historyList }">
												<tr>
													<td>${item.subject }</td>
													<td>${item.newName }</td>
													<td>${item.oldName }</td>
													<td>${item.operatorName }</td>
													<td><fmt:formatDate value="${item.updateTime }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
												</tr>
											</c:forEach>
					                    </tbody>
					                </table>
					                <div id="pagebar"></div>
        						</div>
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

