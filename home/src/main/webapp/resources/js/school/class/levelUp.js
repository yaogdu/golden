$(document).ready(function(){
    $("#hd_menu_class").attr("class","current");
	$("#lmenu_2").attr("class","current");
});

function levelUp()
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "rate_dialog",
        title : '确认升级',
        content : '<div>确认进行升级操作？</div>',
        okValue : '确认',
        ok : function() {
        	var url = $("#context").val() + "/school/class/levelUp";
        	$.ajax({
        		url: url,
        		type: "post",
        		success: function(data){
        			if( data.result == true )
        			{
        				util.dialog.messageDialog('升级成功');
        				$("#bodyData").html("");
//        				window.location.href =  $("#context").val() + "/school/class/toLevelUpPage";
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