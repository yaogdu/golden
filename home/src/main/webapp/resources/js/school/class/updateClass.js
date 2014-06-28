$(document).ready(function(){
	$("#hd_menu_class").attr("class","current");
	$("#lmenu_2").attr("class","current");
});

function update()
{
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
	
	var url = $("#context").val() + "/school/class/update";
	
	var teachersData = [];
	var teachers = $("select:visible[id^='teacher_select_']");
	teachers.each(function(index){
		if( $(this).val() == null || $(this).val() == '' )
		{
			return;
		}
		var id = $(this).attr("id");
		var count = id.substring(15, id.length);
		var teacher = {"id":$(this).val(),"subject":$("#teacher_value_" + count).val(),"name":$(this).find("option:selected").html()};
//		var teacher = {"id":$(this).val()};
		teachersData.push(teacher);
	});
	
	var data = {
		id:$("#classId").val(),
		academicYear: $("#year").val(),
		stage: $("#stage").val(),
		grade: $("#grade").val(),
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
				util.dialog.messageDialog('更新成功');
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

function back()
{
	window.location.href = $("#context").val() + "/school/class/toListPage";
}
