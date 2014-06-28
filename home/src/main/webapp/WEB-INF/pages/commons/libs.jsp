<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<c:set var="static_ctx" value="<%=request.getContextPath() %>"/>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
 
<script type='text/javascript' >
var nfs_url = '<fmt:bundle basename="server"><fmt:message key="server.nfs.url"/></fmt:bundle>';
var userId='${user.id}';
</script>