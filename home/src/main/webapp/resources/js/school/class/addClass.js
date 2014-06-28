$(document).ready(function(){
	$("#hd_menu_class").attr("class","current");
	$("#lmenu_1").attr("class","current");
});

function autoComplete()
{
	var yearVal = $("#year").val();
//	if( yearVal == null || yearVal == '' )
//	{
//		return;
//	}
	
	var stageVal = $("#stage").val();
	if( stageVal == null || stageVal == '' )
	{
		return;
	}
	
	var schoolId = $("#schoolId").val();
	if( schoolId == null || schoolId == '' )
	{
		schoolId = 1;
	}
	
	var url = $("#context").val() + "/school/class/getGradesAndTeachers";
	
	var data = {
		stageName: stageVal,
		schoolId:schoolId
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){



			var gradeOptions = "<option value=\"\">请选择</option>";
			$(data.gradelist).each(function(index,item){
				gradeOptions += "<option value=\"" + item.gradeName + "\">" + item.gradeName + "</option>";
			});
			$("#grade").html(gradeOptions);
			$("#grade").removeAttr("disabled");
			
			$("div[id^='teacher_div_']").hide();
			$("select[id^='teacher_select_']").html("");
			$(data.subjectList).each(function(index,item){
				var subject = item.subjectName;
				var teacherOptions = "<option value=\"\">请选择</option>";
				for(var key in data.teacherData)
				{
				    if( key == subject )
				    {
				    	$(data.teacherData[key]).each(function(index,item){
							teacherOptions += "<option value=\"" + item.id + "\">" + item.name + "</option>";
						});
				    	
				    	
				    }
				}
				
				var count = 0;
		    	$("input[id^='teacher_value_']").each(function(index,item){
		    		if( $(this).val() == subject )
		    		{
		    			var id = $(this).attr("id");
						count = id.substring(14, id.length);
						return false;
		    		}
				});
		    	$("#teacher_select_" + count).html(teacherOptions);
				$("#teacher_div_" + count).show();
				
			});
		}
	});
	
}

function add()
{
	var yearVal = $("#year").val();
	if( yearVal == null || yearVal == '' )
	{
		util.dialog.messageDialog('学年不可为空');
		return;
	}
	
	var stageVal = $("#stage").val();
	if( stageVal == null || stageVal == '' )
	{
		util.dialog.messageDialog('学段不可为空');
		return;
	}
	
	var gradeVal = $("#grade").val();
	if( gradeVal == null || gradeVal == '' )
	{
		util.dialog.messageDialog('年级不可为空');
		return;
	}
	
	var classTypeVal = $("#classType").val();
	if( classTypeVal == null || classTypeVal == '' )
	{
		util.dialog.messageDialog('班级类型不可为空');
		return;
	}
	
	var classNumber = $("#classNumber").val();
	if( classNumber == null || classNumber == '' )
	{
		util.dialog.messageDialog('班号不可为空');
		return;
	}
	
	var url = $("#context").val() + "/school/class/add";
	
	
	var teachersData = [];
	var teachers = $("select:visible[id^='teacher_select_']");
	teachers.each(function(index){
		if( $(this).val() == null || $(this).val() == '' )
		{
			return;
		}
		var id = $(this).attr("id");
		var count = id.substring(15, id.length);
//		var teacher = {"id":$(this).val(),"subject":$("#teacher_value_" + count).val()};
		var teacher = {"id":$(this).val()};
		teachersData.push(teacher);
	});
	
	var data = {
		academicYear: yearVal,
		stage: stageVal,
		grade: gradeVal,
		classNumber:classNumber,
		type:classTypeVal,
		teachers: teachersData
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
        	var url = $("#context").val() + "/school/class/toListPage";
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
