$(document).ready(function(){
	$("#hd_menu_teacher").attr("class","current");
	$("#lmenu_1").attr("class","current");
});

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
		type: "get",
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

function add()
{
	var teacherName = $.trim($("#teacherName").val());
	if( teacherName == null || teacherName == '' )
	{
		util.dialog.messageDialog('姓名不可为空');
		return;
	}
	
	var stageVal = $("#stage").val();
	if( stageVal == null || stageVal == '' )
	{
		util.dialog.messageDialog('学段不可为空');
		return;
	}
	
	var subject = $("#subject").val();
	if( subject == null || subject == '' )
	{
		util.dialog.messageDialog('学科不可为空');
		return;
	}
	
	var tel = $.trim($("#tel").val());
	if( tel != null && tel != '' )
	{
		var regPartton = /1[3-8]+\d{9}/;
		if( !regPartton.test(tel) )
		{
			util.dialog.messageDialog('手机号格式不正确');
			return;
		}
	}
	
	var email = $.trim($("#email").val());
	if( email != null && email != '' )
	{
		var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if( !emailReg.test(email) )
		{
			util.dialog.messageDialog('邮箱格式不正确');
			return;
		}
	}
	
	var gender = $("#gender").val();
	if( gender == null || gender == '' )
	{
		gender = 1;
	}
	
	var url = $("#context").val() + "/school/teacher/add";
	
	var data = {
		name: teacherName,
		stage: stageVal,
		subject: subject,
		gender: gender,
		tel: tel,
		email: email
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				util.dialog.messageDialog('添加成功');
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

function cancel()
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "cancel_dialog",
        title : '确认取消',
        content : '<div>确定取消吗？</div>',
        okValue : '确定',
        ok : function() {
        	var url = $("#context").val() + "/school/teacher/toListPage";
        	window.location.href = url;
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

