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
});

function query()
{
	var url = $("#context").val() + "/school/class/toListPage?status=2";
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



