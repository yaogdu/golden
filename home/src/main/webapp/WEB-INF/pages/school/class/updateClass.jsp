<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@include file="/WEB-INF/pages/commons/school/libs.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<%@include file="/WEB-INF/pages/commons/school/meta.jsp"%>
	
	<script src="${static_ctx}/static/js/school/class/updateClass.js" type="text/javascript"></script>
	<title>编辑班级</title>
</head>
<body>
	<div class="container">
		<%@include file="/WEB-INF/pages/commons/school/header.jsp" %>
		<div class="mainWrap">
        	<div class="mainIndex">
        		<%@include file="include/left-menu.jsp" %>
        		<div class="mainCon">
        			<div class="mainTitle">编辑班级</div>
        			<div class="mainPart">
           				<div class="conFormWrap">
           					<div class="formCon formCon02">
           						<input type="hidden" id="context" value="${static_ctx}"/>
								<input type="hidden" id="schoolId" value=""/>
								<input type="hidden" id="classId" value="${klass.id}"/>
								<input type="hidden" id="year" value="${klass.academicYear}"/>
								<input type="hidden" id="stage" value="${klass.stage}"/>
								<input type="hidden" id="grade" value="${klass.grade}"/>
           						<div class="formList">
                 					<label>入学学年：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${klass.academicYear}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label>学段&nbsp;/&nbsp;年级：</label>
				                  	<div class="info">
					                    <span class="infoLabel">${klass.stage}&nbsp;/&nbsp;${klass.grade}</span>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label><em>*</em>班级类型：</label>
				                  	<div class="info">
					                    <select id="classType">
									        <option selected="selected" value="">请选择</option>
											<c:forEach var="relation" items="${types}">
												<option  value="${relation.classTypeName}" <c:if test="${klass.type == relation.classTypeName }">selected="selected"</c:if>  >${relation.classTypeName}</option>
											</c:forEach>
									    </select>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label><em>*</em>班级号：</label>
				                  	<div class="info">
					                    <input type="text" maxlength="6" id="classNumber" value="${klass.classNumber}" onkeyup="value=value.replace(/[^\d]/g,'')"/>
				                  	</div>
				                </div>
           						<div class="formList">
                 					<label>任课教师：</label>
				                  	<div class="info info01" id="teacherArea">
					                    <c:forEach var="relation" items="${subjectList}" varStatus="sta">
					                    	<div class="infoBox">
					                    		<label>${relation.subjectName}:</label>
												<c:set var="tempId" value="0"></c:set>
												<select id="teacher_select_${sta.count}" style="width: 120px;">
													<option value="">请选择</option>
													<c:forEach var="classTeacher" items="${teahcers}">
									        			 <c:if test="${classTeacher.subject == relation.subjectName}">
									        			 	<option selected="selected" value="${classTeacher.teacherId}">${classTeacher.teacherName}</option>
									        			 	<c:set var="tempId" value="${classTeacher.teacherId }"></c:set>
									        			 </c:if>
									        		</c:forEach>
													<c:forEach var="availableTeacher" items="${teachersList}">
														<c:if test="${tempId != availableTeacher.id && availableTeacher.subject == relation.subjectName }">
															<option  value="${availableTeacher.id}">${availableTeacher.name}</option>
														</c:if>
									        		</c:forEach>
											    </select>
											    <input type="hidden" value="${relation.subjectName}" id="teacher_value_${sta.count}"/>
											</div>
										</c:forEach>
				                  	</div>
				                </div>
        					</div>
        				</div>
        				<div class="conBtnWrap conBtnWrap01">
				        	<div class="BtnOrange30">
				              	<a href="javascript:void(0)" class="btnSave" id="btnSave" onclick="update()">确定</a>
				            </div>
				            <div class="BtnGray30">
				              	<a href="${static_ctx}/school/class/toListPage" class="btnSave">取消</a>
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

