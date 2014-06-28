var  gradeDefault = "年级";
var  classDefault = "班级";
var  defaultPassword = "123456";
$(document).ready(function () {
	query(0);
	$("#excel_frame").hide();
	
    $("#startTime").datepicker({format:"yyyy-mm-dd"});
    $("#endTime").datepicker({format:"yyyy-mm-dd"});
    
    $("#start_click").click(function() {
    	$("#startTime").focus();
    });
    
    $("#end_click").click(function() {
    	$("#endTime").focus();
    })

    $("#hd_menu_student").attr("class","current");
    $("#lmenu_2").attr("class","current");

    $("#export").click(function() {
    var url = ctx + "/school/student/exportExcel?";
    url += "system_id=" + $("#system_id").val() + "&";
    url += "name=" + encodeURI(encodeURI($("#name").val())) + "&";
    url += "stage=" + encodeURI(encodeURI($("#stage").val())) + "&";
    url += "grade=" + encodeURI(encodeURI($("#grade").val())) + "&";
    url += "class=" + $("#class").val() + "&";
    url += "startTime" + $("#startTime").val() + "&";
    url += "endTime" + $("#endTime").val();
    window.location.href = url;
    $("#export").css("color", "#1476c8");
    });

     $("#stage").change(function(){
        var stage = $("#stage").val();
        if (stage == "学段") {
        	$("#grade").empty().append("<option>年级</option>");
        	$("#class").empty().append("<option>班级</option>");
        	return;
        }
        stage = encodeURI(encodeURI(stage));
        $.ajax({
         type: "POST",
         url: ctx+"/school/student/metaData?school_id=1&stage=" + stage,
         success: function(data, textStatus) {
         $("#grade").empty();
         $("#grade").append("<option>" + gradeDefault +"</option>");
         for (i = 0; i < data.grades.length; ++i) {
             $("#grade").append("<option>" + data.grades[i].gradeName + "</option>");
         }
         $("#class").empty();
         $("#class").append("<option value='0'>"+ classDefault +"</option>");
         for (i = 0; i < data.klasses.length; ++i) {
             $("#class").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
         }
      }
     });
    });

    $("#grade").change(function() {
       var stage = $("#stage").val();
       var grade = $("#grade").val();
       if (grade == "年级") {
    	   $("#class").empty().append("<option>班级</option>");
    	   return;
       }
       stage = encodeURI(encodeURI(stage));
       grade = encodeURI(encodeURI(grade));
    $.ajax({
       type: "POST",
       url: ctx +"/school/student/metaData?school_id=1&stage=" + stage + "&grade=" + grade,
       success: function(data, textStatus) {
            $("#class").empty();
            $("#class").append("<option value='0'>" + classDefault + "</option>");
            for (i = 0; i < data.klasses.length; ++i) {
                 $("#class").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
            }
         }
      });
   });
    
    $("#btnQuery").click(function() {
    	query(0);
    });
 
});

function query(pageNo) {
	var url = ctx +"/school/student/query?";
	var systemId = $("#system_id").val();
	url += "system_id=" + systemId;
	
	if (systemId != null && systemId.length != 0 && systemId.length > 12) {
		util.dialog.messageDialog("系统号为8到12位!")
		return;
	}
	url += "&name=" + encodeURI(encodeURI($("#name").val()));
	url += "&stage=" + encodeURI(encodeURI($("#stage").val()));
	url += "&grade=" + encodeURI(encodeURI($("#grade").val()));
	
	var klass = "";
	if ($("#class").val() == null) {
		klass = "";
	} else {
		klass = $("#class").val();
	}
	url += "&class=" + klass;
	url += "&enter_time_start=" + $("#startTime").val();
	url += "&enter_time_end=" + $("#endTime").val();
	url += "&page=" + pageNo;
	 $.ajax({
	       type: "POST",
	       url: url,
	       contentType: "application/x-www-form-urlencoded; charset=utf-8", 
	       success: function(data, textStatus) {
	    	    $("#currentPage").val(data.currentPage);
	    	    $("#totalPage").val(data.totalPage);
	    	    $("#totalCount").val(data.totalCount);
	            $("#exportData").empty();
	            if (data.students.length == 0) {
	            	$("#exportData").append("<tr><td align='center' colspan='7'>获得0条记录!</td></tr>");
	            }
	            for (i = 0; i < data.students.length; ++i) {
	            	var str = "<tr>";
	            	str += "<td align='center'>" + data.students[i].system_id + "</td>";
	                if (data.students[i].login_name != undefined) {
	            	    str += "<td align='center'><span class='oper'><a href='detailInfo?studentId="+ data.students[i].system_id + "'>" + data.students[i].login_name + "</a></span></td>";
	                } else {
	                	str += "<td></td>";
	                }
	            	str += "<td align='center' id='" + data.students[i].system_id+ "name'>" + data.students[i].name + "</td>";
	            	str += "<td align='center'>" + data.students[i].stage + "/" + data.students[i].grade + "/" + data.students[i].class_number + "班</td>";
	            	str += "<td align='center'>"+ data.students[i].enter_time+"</td>";
	            	if (data.students[i].status == 1) {
	            	    str += "<td id='" + data.students[i].system_id + "status'>启用</td>";
	            	} else {
	            		str += "<td id='" + data.students[i].system_id + "status'>停用</td>";
	            	}
	            	str += "<td align='center'><span class='oper'><a href='detailInfo?studentId="+ data.students[i].system_id + "'>查看</a> ";
	            	str += "<a href='update?systemId=" + data.students[i].system_id +"'>编辑</a> ";
	            	if (data.students[i].status == 1) {
	            		str += "<a href='javascript:void(0)' id='" + data.students[i].system_id + "'";
	            		str += " onclick=\"changeStatus(" + data.students[i].system_id + ");\">停用</a> ";
	            	} else {
	            		str += "<a href='javascript:void(0)' id='" + data.students[i].system_id + "'";
	            		str += " onclick=\"changeStatus(" + data.students[i].system_id + ");\">启用</a> ";
	            	}
	            	str += "<a href='javascript:void(0)' onclick='resetPassword(\"" + data.students[i].system_id + "\");'>重置密码</a></span></td></tr>";
	            	$("#exportData").append(str);
	            }
	            page();
	         }
	      });
}

function page() {
	 var currentPage = $("#currentPage").val();
		var totalPage = $("#totalPage").val();
		var totalCount = $("#totalCount").val();
		
	    if( totalPage > 1 )
	    {
	    	$("#pagebar").show();
	    	$.fn.jpagebar({
	            renderTo : $("#pagebar"),
	            totalpage : totalPage,
	            totalcount : totalCount,
	            pagebarCssName : 'pagination2',
	            currentPage : currentPage,
	            onClickPage : function(pageNo) {
	                $.fn.setCurrentPage(this, pageNo);
	                query(pageNo);
	            }
	        });
	    } else {
	    	$("#pagebar").hide();
	    }
	    
	    $("#hd_menu_student").attr("class","current");
		$("#lmenu_2").attr("class","current");
}

function changeStatus(systemId) {
    var url = ctx +"/school/student/updateStatus?systemId=" + systemId + "&status=";
     url += $("#"+systemId).text() == "启用" ? "1" : "0";
     $.ajax({
     type: "POST",
     url: url,
     success: function(data){
    	 util.dialog.messageDialog("状态修改成功");
     $("#"+systemId).text($("#"+systemId).text() == "启用" ? "停用" : "启用");
     $("#"+systemId+"status").text($("#"+systemId).text() == "启用" ? "停用" : "启用"); 
    },
    error: function() {
    util.dialog.messageDialog("状态修改失败");
    }
});
}

function resetPassword(systemId) {
	var content = "确定重置学生" + $("#"+systemId+"name").text() + "的登录密码?" +
	              "<br />(密码将被重置为: <span style='color:GREEN;'>"+ defaultPassword +"</span>)<br />";
	var title = "信息提醒";
	util.dialog.defaultDialog(content, function() {
		$.ajax({
		       type: "POST",
		       url: ctx +"/school/student/updatePassword?systemId=" + systemId,
		       success: function(data, textStatus) {
		           util.dialog.messageDialog("密码重置成功,重置后的密码为123456");
		      },
		      error: function() {
		      util.dialog.messageDialog("密码重置失败");
		     }
		});
	}, function() {}, title);
}

function initParams(){
	var XXX = $('#XXX').val();
	if(XXX){
		
	}
}