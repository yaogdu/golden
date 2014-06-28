<%--
  User: Lance lance7in_gmail_com
  Date: 04/12/2013 11:09
--%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!doctype html>
<html>
<head>
    <title>错误</title>
</head>
<body>
<div class="main">
    <div class="errorType">
        <img src="/static/img/500.png"/>
    </div>
    <div class="errorInfo">
        <div>
            服务器内部错误。
        </div>
        <div class="errorDetail">
            <div>
                <c:if test="${not empty errCode}">
                    <h1>${errCode} : System Errors</h1>
                </c:if>

                <c:if test="${empty errCode}">
                    <h1>System Errors</h1>
                </c:if>

                <c:if test="${not empty errMsg}">
                    <h4>${errMsg}</h4>
                </c:if>
            </div>
            <div id="detail_system_error_msg">
            </div>
        </div>
    </div>
</div>
</body>
</html>
