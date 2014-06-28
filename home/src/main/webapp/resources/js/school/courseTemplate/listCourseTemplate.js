$(document).ready(function(){
	
    $("#hd_menu_system").attr("class","current");
	$("#lmenu_3").attr("class","current");
	
	var stage = $("#stage").val();
	
	if( stage == null || stage == '' )
	{
		$("#grade").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#grade").attr("disabled","disabled");
		$("#subject").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#subject").attr("disabled","disabled");
	}
	
	$("a[id^='toggleStatus_']").each(function(){
		var id = $(this).attr("id");
		var ctid = id.substring(13,id.length);
		if( '启用' == $("#toggleStatus_" + ctid).html() )
		{
			$("#toggleStatus_" + ctid).bind("click", {id: ctid}, enableHandler);
		}
		else
		{
			$("#toggleStatus_" + ctid).bind("click", {id: ctid}, disableHandler);
		}
		
	});
	
});

function query()
{
	var url = $("#context").val() + "/school/ct/toListPage?z=";
    var stage = $("#stage").val();
	var grade = $("#grade").val();
	var subject = $("#subject").val();
	var status = $("#status").val();
	
	if( stage != null && stage != '' )
	{
		url += "&stage=" + encodeURI(encodeURI(stage));
	}
	if( grade != null && grade != '' )
	{
		url += "&grade=" + encodeURI(encodeURI(grade));
	}
	if( subject != null && subject != '' )
	{
		url += "&subject=" + encodeURI(encodeURI(subject));
	}
	if( status != null && status != '' )
	{
		url += "&status=" + status;
	}
    window.location.href = url;
}

function changeStage()
{
	var stage = $("#stage").val();
	
	if( stage == null || stage == '' )
	{
		$("#grade").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#grade").attr("disabled","disabled");
		$("#subject").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#subject").attr("disabled","disabled");
		return false;
	}
	
	var url = $("#context").val() + "/school/data/findGradeAndSubjectByStageName?stage=" + encodeURI(encodeURI(stage));
	
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			var gradeOptions = "<option value=\"\">请选择</option>";
			$(data.gradelist).each(function(index,item){
				gradeOptions += "<option value=\"" + item.gradeName + "\">" + item.gradeName + "</option>";
			});
			$("#grade").html(gradeOptions);
			$("#grade").removeAttr("disabled");
			
			var subjectOptions = "<option value=\"\">请选择</option>";
			$(data.subjectlist).each(function(index,item){
				subjectOptions += "<option value=\"" + item.subjectName + "\">" + item.subjectName + "</option>";
			});
			$("#subject").html(subjectOptions);
			$("#subject").removeAttr("disabled");
		}
	});
	
}


function disable(courseTemplateId)
{
	var url = $("#context").val() + "/school/ct/disable?courseTemplateId=" + courseTemplateId;
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				$("#toggleStatus_" + courseTemplateId).unbind("click");
				$("#toggleStatus_" + courseTemplateId).bind("click", {id: courseTemplateId}, enableHandler);
				$("#toggleStatus_" + courseTemplateId).html("启用");
				$("#status_value_" + courseTemplateId).html("停用");
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
	var courseTemplateId = e.data.id;
	disable(courseTemplateId);
}

function enable(courseTemplateId)
{
	var url = $("#context").val() + "/school/ct/enable?courseTemplateId=" + courseTemplateId;
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				$("#toggleStatus_" + courseTemplateId).unbind("click");
				$("#toggleStatus_" + courseTemplateId).bind("click", {id: courseTemplateId}, disableHandler);
				$("#toggleStatus_" + courseTemplateId).html("停用");
				$("#status_value_" + courseTemplateId).html("启用");
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
	var courseTemplateId = e.data.id;
	enable(courseTemplateId);
}

