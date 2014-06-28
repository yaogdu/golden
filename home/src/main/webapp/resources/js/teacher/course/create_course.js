/**
 * create by Martin Ding
 */

latte.teacher.course.create_course = {
	
	displayDatePlugin : function() {
		$(this).datetimepicker({
			dateFormat : 'yy/mm/dd',
			timeFormat : ''
		});
	},
	createSchedule:function(resource, chapterid, sectionid, classperiod,
			resourceName) {

		$("input[type=checkbox]:checked")
				.each(
						function(i) {
							var val = $(this).val();
							alert(val);
							var date = $("#date" + val).val();
							var period = $("#select" + val).val();
							var url = ctx + "/teacher/course/createSchedule";
							
							var data  =  {
								resource : resource,
								resourceName : resourceName,
								chapterid : chapterid,
								sectionid : sectionid,
								clazzid : val,
								date : date,
								period : period,
								classperiod : classperiod
							};
							console.log(data);
							$.ajax({
								url : url,
								type : 'get',
								dataType : 'json',
								contentType : "application/x-www-form-urlencoded; charset=UTF-8",
								data : data,
								error : function(data) {
									alert("failed。。。");
								},
								success : function(data) {
								
									alert(data.msg);
									window.parent.location.reload();
								},
							});
						});

	}

};
