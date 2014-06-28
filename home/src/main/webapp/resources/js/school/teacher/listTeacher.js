$(document).ready(function(){
	
	var currentPage = $("#currentPage").val();
	var totalPage = $("#totalPage").val();
	var totalCount = $("#totalCount").val();
	
    if( totalPage > 1 )
    {
    	$.fn.jpagebar({
            renderTo : $("#pagebar"),
            totalpage : totalPage,
            totalcount : totalCount,
            pagebarCssName : 'pagination2',
            currentPage : currentPage,
            onClickPage : function(pageNo) {
                $.fn.setCurrentPage(this, pageNo);
                window.location.href = replaceParamVal("page",pageNo);
            }
        });
    }
    
    $("#hd_menu_teacher").attr("class","current");
	$("#lmenu_2").attr("class","current");
	
	var stage = $("#stage").val();
	
	if( stage == null || stage == '' )
	{
		$("#subject").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#subject").attr("disabled","disabled");
	}
	
	$("a[id^='toggleStatus_']").each(function(){
		var id = $(this).attr("id");
		var tid = id.substring(13,id.length);
		if( '启用' == $("#toggleStatus_" + tid).html() )
		{
			$("#toggleStatus_" + tid).bind("click", {id: tid}, enableHandler);
		}
		else
		{
			$("#toggleStatus_" + tid).bind("click", {id: tid}, disableHandler);
		}
		
	});
	
//	toggleStatus_${item.id
	
});

function query()
{
	var url = $("#context").val() + "/school/teacher/toListPage?z=";
    var loginName = $("#loginName").val();
    var teacherName = $("#teacherName").val();
	var stageVal = $("#stage").val();
	var subject = $("#subject").val();
	
	if( loginName != null && loginName != '' )
	{
		url += "&loginName=" + encodeURI(encodeURI(loginName));
	}
	if( teacherName != null && teacherName != '' )
	{
		url += "&name=" + encodeURI(encodeURI(teacherName));
	}
	if( stageVal != null && stageVal != '' )
	{
		url += "&stage=" + encodeURI(encodeURI(stageVal));
	}
	if( subject != null && subject != '' )
	{
		url += "&subject=" + encodeURI(encodeURI(subject));
	}
    window.location.href = url;
}

function exportExcel()
{
	var url = $("#context").val() + "/school/teacher/exportExcelNew?z=";
    var loginName = $("#loginName").val();
    var teacherName = $("#teacherName").val();
	var stageVal = $("#stage").val();
	var subject = $("#subject").val();
	
	if( loginName != null && loginName != '' )
	{
		url += "&loginName=" + encodeURI(encodeURI(loginName));
	}
	if( teacherName != null && teacherName != '' )
	{
		url += "&name=" + encodeURI(encodeURI(teacherName));
	}
	if( stageVal != null && stageVal != '' )
	{
		url += "&stage=" + encodeURI(encodeURI(stageVal));
	}
	if( subject != null && subject != '' )
	{
		url += "&subject=" + encodeURI(encodeURI(subject));
	}
    window.location.href = url;
}

function changeStage()
{
	var stage = $("#stage").val();
	
	if( stage == null || stage == '' )
	{
		$("#subject").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#subject").attr("disabled","disabled");
		return false;
	}
	
	var url = $("#context").val() + "/school/data/findSubjectByStageName?stage=" + encodeURI(encodeURI(stage));
	
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			var subjectOptions = "<option value=\"\">请选择</option>";
			$(data.subjectlist).each(function(index,item){
				subjectOptions += "<option value=\"" + item.subjectName + "\">" + item.subjectName + "</option>";
			});
			$("#subject").html(subjectOptions);
			$("#subject").removeAttr("disabled");
		}
	});
	
}

function disable(teacherId)
{
	var url = $("#context").val() + "/school/teacher/updateToDisable?teacherId=" + teacherId;
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				$("#toggleStatus_" + teacherId).unbind("click");
				$("#toggleStatus_" + teacherId).bind("click", {id: teacherId}, enableHandler);
				$("#toggleStatus_" + teacherId).html("启用");
				$("#status_value_" + teacherId).html("停用");
				util.dialog.messageDialog('停用成功');
				return true;
				
			}
			else
			{
				util.dialog.messageDialog(data.message);
				return false;
			}
		},
		error: function(XMLHttpRequest, textStatus){
			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
			return false;
		}
	});
}

function disableHandler(e)
{
	var teacherId = e.data.id;
	disable(teacherId);
}

function enable(teacherId)
{
	var url = $("#context").val() + "/school/teacher/updateToEnable?teacherId=" + teacherId;
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				$("#toggleStatus_" + teacherId).unbind("click");
				$("#toggleStatus_" + teacherId).bind("click", {id: teacherId}, disableHandler);
				$("#toggleStatus_" + teacherId).html("停用");
				$("#status_value_" + teacherId).html("启用");
				util.dialog.messageDialog('启用成功');
				return true;
			}
			else
			{
				util.dialog.messageDialog(data.message);
				return false;
			}
		},
		error: function(XMLHttpRequest, textStatus){
			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
			return false;
		}
	});
}

function enableHandler(e)
{
	var teacherId = e.data.id;
	enable(teacherId);
}

function resetPassword(teacherId)
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "reset_dialog",
        title : '确认重置密码',
        content : '<div>确认重置密码？</div>',
        okValue : '确认',
        ok : function() {
        	var url = $("#context").val() + "/school/teacher/resetPassword?teacherId=" + teacherId;
        	$.ajax({
        		url: url,
        		type: "post",
        		contentType: 'application/json;charset=UTF-8',
        		success: function(data){
        			if( data.result == true )
        			{
        				util.dialog.messageDialog('重置密码成功，重置后的密码为123456');
        				return true;
        			}
        			else
        			{
        				util.dialog.messageDialog(data.message);
        				return false;
        			}
        		},
        		error: function(XMLHttpRequest, textStatus){
        			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
        					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
        			return false;
        		}
        	});
        },
        cancelValue : '返回',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}

function replaceParamVal(paramName,replaceWith) {
    var oUrl = window.location.href.toString();
    if( oUrl.indexOf("?") == -1 )
    {
    	oUrl += "?";
    }
    if( oUrl.indexOf(paramName + "=") == -1 )
    {
    	oUrl += "&" + paramName + "=paramName";
    }
    var re=eval('/('+ paramName+'=)([^&]*)/gi');
    var nUrl = oUrl.replace(re,paramName+'='+replaceWith);
    return nUrl;
}
