/**
 * Create by Martin Ding
 * 
 */


latte.teacher.course.issue_course = {
		issueCourse:function (periodid,scheduleid){
			var url = ctx + "/teacher/course/issue";
			var mode = $('input[name="radio"]:checked').val();
			$.ajax({
				url : url,
				type : 'get',
				dataType : 'json',
				contentType : "application/x-www-form-urlencoded; charset=UTF-8",
				data :  {"periodid":periodid,"scheduleid":scheduleid,"classMode":mode},
				error : function(data) {
				},
				success : function(data) {
					alert("发布成功！")
				},
			});
		}
};

