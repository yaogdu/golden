$(document).ready(function(){
	$("#hd_menu_system").attr("class","current");
	$("#lmenu_2").attr("class","current");
	$("#startTime").datepicker({format:"yyyy-mm-dd"});
	$("#endTime").datepicker({format:"yyyy-mm-dd"});
});

function update()
{
	var startTimeVal = $("#startTime").val();
	if( startTimeVal == null || startTimeVal == '' )
	{
		util.dialog.messageDialog('开始日期不可为空');
		return;
	}
	
	var endTimeVal = $("#endTime").val();
	if( endTimeVal == null || endTimeVal == '' )
	{
		util.dialog.messageDialog('结束日期不可为空');
		return;
	}
	
	var startTime = new Date(startTimeVal);
	var endTime = new Date(endTimeVal);
	
	var diff = ( endTime - startTime ) / (1000 * 60 * 60 * 24);
	
	if( diff < 120 || diff > 180 )
	{
		util.dialog.messageDialog('120 < 结束时间 - 开始时间 < 180');
		return;
	}
	
	var originalEndTimeVal = $("#originalEndTime").val();
	var originalTime = new Date(originalEndTimeVal);
	if( originalTime - endTime > 0 )
	{
		util.dialog.messageDialog('结束日期只可后延');
		return;
	}
	
	var url = $("#context").val() + "/school/ay/update";
	
	var data = {
		id: $("#ayId").val(),
//		academicYear: yearVal,
//		term: termVal,
		startTime:startTime,
		endTime:endTime
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
        	var url = $("#context").val() + "/school/ay/toListPage";
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
