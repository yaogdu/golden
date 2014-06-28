<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<link href="${static_ctx}/static/css/pagebar.css" rel="stylesheet" type="text/css"/>
	<script src="${static_ctx}/static/js/school/academicYear/viewAcademicYear.js" type="text/javascript"></script>
	<script src="${static_ctx}/static/js/lib/jquery.pagebar.js" type="text/javascript"></script>
	<title>学年学期管理</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<input type="hidden" id="context" value="${static_ctx}"/>
					<input type="hidden" id="currentPage" value="${currentPage}"/>
					<input type="hidden" id="totalPage" value="${totalPage}"/>
					<input type="hidden" id="totalCount" value="${totalCount}"/>
					
					<div class="mainTitle">
        				<p>学年学期管理</p>			
        			</div>
					<div class="mainPart">
						<div class="conBox">
							<div class="conShow">
								<div class="list">
									<table class="listTable">
										<thead>
					                      	<tr>
						                        <th>学年</th>
						                        <th>学期名称</th>
						                        <th>开始日期</th>
						                        <th>结束日期</th>
						                        <th>操作</th>
					                      	</tr>
					                    </thead>
					                    <tbody>
					                    	<c:forEach items="${academicYears }" var="ay">
												<tr>
													<td>${ay.academicYear }</td>
													<td>${ay.term }</td>
													<td><fmt:formatDate value="${ay.startTime }" pattern="yyyy-MM-dd"/></td>
													<td><fmt:formatDate value="${ay.endTime }" pattern="yyyy-MM-dd"/></td>
													<td>
														<c:if test="${ay.canUpdate }">
															<a href="${static_ctx}/school/ay/toUpdatePage?academicYearId=${ay.id }">编辑</a>
														</c:if>
													</td>
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

