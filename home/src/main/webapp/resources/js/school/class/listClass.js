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
    
    $("#hd_menu_class").attr("class","current");
	$("#lmenu_2").attr("class","current");
	
	var stage = $("#stage").val();
	
	if( stage == null || stage == '' )
	{
		$("#grade").html("<option selected=\"selected\" value=\"\">请选择</option>");
		$("#grade").attr("disabled","disabled");
	}
	
});

function query()
{
	var url = $("#context").val() + "/school/class/toListPage?z=";
    var academicYear = $("#academicYear").val();
    var stageVal = $("#stage").val();
	var gradeVal = $("#grade").val();
	var classNumber = $("#classNumber").val();
	var type = $("#type").val();
	
	if( academicYear != null && academicYear != '' )
	{
		url += "&academicYear=" + encodeURI(encodeURI(academicYear));
	}
	if( stageVal != null && stageVal != '' )
	{
		url += "&stage=" + encodeURI(encodeURI(stageVal));
	}
	if( gradeVal != null && gradeVal != '' )
	{
		url += "&grade=" + encodeURI(encodeURI(gradeVal));
	}
	if( classNumber != null && classNumber != '' )
	{
		url += "&classNumber=" + classNumber;
	}
	if( type != null && type != '' )
	{
		url += "&type=" + encodeURI(encodeURI(type));
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
		return false;
//		$("#grade").removeAttr("disabled");
	}
	
	var url = $("#context").val() + "/school/data/findGradeByStageName?stage=" + encodeURI(encodeURI(stage));
	
//	var data = {
//		stageName: stage
//    };
	
	$.ajax({
		url: url,
		type: "post",
//		data: JSON.stringify(data),
//		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			var gradeOptions = "<option value=\"\">请选择</option>";
			$(data.gradelist).each(function(index,item){
				gradeOptions += "<option value=\"" + item.gradeName + "\">" + item.gradeName + "</option>";
			});
			$("#grade").html(gradeOptions);
			$("#grade").removeAttr("disabled");
		}
	});
	
}

function toLevelUp()
{
	var url = $("#context").val() + "/school/class/isLevelUpValid";
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				window.location.href = $("#context").val() + "/school/class/toLevelUpPage";
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

function toGraduate()
{
	var url = $("#context").val() + "/school/class/isGraduateValid";
	$.ajax({
		url: url,
		type: "post",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				window.location.href = $("#context").val() + "/school/class/toGraduatePage";
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



