/**
 * create by xuezhen
 */
latte.student.coursebychapter = {
		updateTable:function(data){
	    	   var newRow = "<tr class='tr1'><td class='td1'>课程内容</td><td>课时计划</td></tr><hr/>";
		    	  $("#coursetable").append(newRow);
		    	   $.each(data,function(index,course){
		    		   var chapter = course.chaptername;
		    		   if(index == 0){
		    			   var tr = $("<tr class='tr2'></tr>");
		    			   var td = "<td class='td1' colspan='2'>" 
	    					   + course.chaptername +"</td>";
	    					   tr.append(td);
	    					   tr.appendTo("#coursetable");
		    		   }
		    		   
		    		   if(chapter == course.chaptername){
		    			  
	    					   var tr = $("<tr></tr>");
			    			   var td = "<td class='td1'>"
		    					   + course.sectionname + "</td><td>"
		    					   + course.sectionname
									+ "</td>";
		    					   tr.append(td);
		    					   tr.appendTo("#coursetable");
			    			//   $("#coursetable tr:last").append(tr);
		    		   }else{
		    			   var tr = $("<tr class='tr2'></tr>");
		    			   var td = "<td class='td1' colspan='2'>" 
	    					   + course.chaptername +"</td>";
	    					   tr.append(td);
	    					   tr.appendTo("#coursetable")
		    			//   $("#coursetable tr:last").append(tr);
		    		   }
		    		  
		    		  
		    	   })
		       },
		
		getCourseListByDiscipline:function() {

			$("#subjectlist").change(function() {
				var subject = $("#subjectlist").val();
				alert(subject);
				$("tr").remove();
				var url= "${static_ctx}/student/course/coursedata";
				 $.ajax({
				       url:url, 
				       type:'get',         
				       dataType:'json', 
				       contentType: "application/x-www-form-urlencoded; charset=UTF-8",
				       data:"subject=" + subject,
				       error:function(data){
				    	   alert(data);
				       },
				       success:function(data){
				    	   this.updateTable(data);
				       },
				     });
			})
		},
		
};
$(document).ready(function() {
	latte.student.coursebychapter.getCourseListByDiscipline();
});