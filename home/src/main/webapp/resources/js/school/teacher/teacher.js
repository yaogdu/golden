   $(document).ready(function () {
		$("#hd_menu_teacher").attr("class","current");
		$("#lmenu_2").attr("class","current");
		
    	$("#checkout").click(function() {
    		var  data = "[";
			var  cols = new Array("systemId", "loginName", "name", "stage", "subject", "status");
			
			$("#exportData tr").each(function() {
			    data += "{";
				var  i = 0;
			    $(this).find("td").each(function() {
                    if (i < cols.length) {
			    	    data += "\"" + cols[i++] + "\":" + "\"";
                        if ($(this).text()) {
                            data += $.trim($(this).text());
                        } else {
                    	    data += " ";
                        } 
                        data += "\",";
                    }
				});

                data = data.substring(0, data.length - 1);
                data += "},";					
			});
			
			if (data == "[") {
				alert("没有可以导出的记录");
				return;
			}
			data = data.substring(0, data.length - 1);
			data += "]";
			alert(data);
			window.location.href = "http://localhost:8080/portal_web/school/teacher/exportExcel?data=" + data;
    	})
    });

  
   function resetPwd()
   {
	   //util.dialog.messageDialog("密码重置成功,重置后的密码为123456");
	   alert("您的密码重置为：123456");
   }
   
   function submitForm()
   {
	   //document.getElementById("teacherManagement").submit();
       var systemId= document.getElementById("systemId").value;
	   var name = document.getElementById("systemId").value; 
	   var stage =$("#stage").find("option:selected").text();
	   var subject=$("#subject").find("option:selected").text();
	   var url= "/portal_web/school/teacher/teacherManagement?systemId="+systemId+"&name="+name+"stage="+stage+"subject="+subject;
	   $.ajax({
		   url: url, 
		   type: 'POST', 
		   success: function(){} 
		   }); 
   }
   
   function prePage()
   {
	   var pageNumber=document.getElementById("currentPage").value-1;
	   alert(pageNumber);
	   var url= "/portal_web/school/teacher/pageController?pageNumber="+pageNumber;
	   $.ajax({
		   url: url, 
		   type: 'POST', 
		   success: function(){} 
		   }); 
   }
   
   function afterPage()
   {
	   var pageNumber=document.getElementById("currentPage").value+1;
	   alert(pageNumber);
	   var url= "/portal_web/school/teacher/pageController?pageNumber="+pageNumber;
	   $.ajax({
		   url: url, 
		   type: 'POST', 
		   success: function(){} 
		   }); 
   }