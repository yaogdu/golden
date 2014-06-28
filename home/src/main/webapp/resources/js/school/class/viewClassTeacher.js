$(document).ready(function(){
	var currentPage = $("#currentPage").val();
	var totalPage = $("#totalPage").val();
	var totalCount = $("#totalCount").val();
	var classId = $("#classId").val();
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
                var url = $("#context").val() + "/school/class/toViewTeacherPage?page=" + pageNo + "&classId=" + classId;
                window.location.href = url;
            }
        });
    }
    $("#hd_menu_class").attr("class","current");
	$("#lmenu_2").attr("class","current");
    
});
