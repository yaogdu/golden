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
                var url = $("#context").val() + "/school/ay/toListPage?page=" + pageNo;
//                var data = {
//                    pageNo : pageNo,
//                };
//                $.ajax({
//                    type : "get",
//                    cache : false,
//                    url : url,
//                    data : data,
//                    dataType : 'json',
//                    success : function(data){}
//                });
                window.location.href = url;
            }
        });
    }
    
    $("#hd_menu_system").attr("class","current");
	$("#lmenu_2").attr("class","current");
});
