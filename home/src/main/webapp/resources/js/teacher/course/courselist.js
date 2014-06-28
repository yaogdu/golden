/**
 * 
 * create by Martin Ding
 */
latte.teacher.course.courselist = {
	createCourse : function(resource, resourceName, chapertid, chapterName,
			sectionid, sectionName, classperiod) {
		var gradeid = $("#selectgrade").val();
		var url = ctx + "/teacher/course/createCourse?resource=" + resource
				+ "&resourceName=" + resourceName + "&chapertid=" + chapertid
				+ "&chapterName=" + chapterName + "&sectionid=" + sectionid
				+ "&sectionName=" + sectionName + "&gradeid=" + gradeid;
		url = encodeURI(encodeURI(url));
		art
				.dialog({
					width : 600,
					height : 400,
					id : "add_res",
					title : '添加课程',
					// "<iframe src='"+ctx+"/foreground/main/login'
					// style='width:100%;height:100%;border:0px;'></iframe>"
					content : "<iframe name='resframe' src='"
							+ url
							+ "' style='width:600px;height:400px;border:0px;'></iframe>",
					okValue : '添加选中资源',
					padding : '0px',
					model : true,
					ok : function() {
						/*
						 * var url = ctx + "/teacher/course/getTeacherClass";
						 * $.ajax({ url : url, type : 'get', dataType : 'json',
						 * contentType : "application/x-www-form-urlencoded;
						 * charset=UTF-8", data : {"gradeid":gradeid}, error :
						 * function(data) { }, success : function(data) {
						 * resframe.window.createCourse(resource,resourceName,chapertid,chapterName,sectionid,sectionName,data.teacherclass); },
						 * });
						 */

						resframe.window.latte.teacher.course.create_course.createSchedule(resource, chapertid, sectionid,
										classperiod, resourceName);
						// location.reload();
						return false;
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},

	issueCourse : function(periodid, scheduleid) {
		var url = ctx + "/teacher/course/issueview";
		art
				.dialog({
					width : 400,
					height : 160,
					id : "add_res",
					title : '添加课程',
					content : "<iframe name='resframe' src='"
							+ url
							+ "' style='width:400px;height:160px;border:10px;'></iframe>",
					okValue : '添加选中资源',
					padding : '0px',
					model : true,
					ok : function() {
						resframe.window.latte.teacher.course.issue_course
								.issueCourse(periodid, scheduleid);
						// location.reload();
						return false;
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},
	delCourseware : function(periodid) {
		art
				.dialog({
					title : "删除课件",
					content : "确认删除课件嘛？",
					okValue : '确定',
					padding : '10px',
					model : true,
					ok : function() {
						var url = ctx + "/teacher/course/delcourseware";
						$
								.ajax({
									url : url,
									type : 'get',
									dataType : 'json',
									contentType : "application/x-www-form-urlencoded; charset=UTF-8",
									data : {
										"periodid" : periodid
									},
									error : function(data) {
										alert("failed");
									},
									success : function(data) {
										location.reload();

									},
								});
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},
	delCourse : function(scheduleid) {
		art
				.dialog({
					title : "删除课程",
					content : "确认删除课程嘛？",
					okValue : '确定',
					padding : '10px',
					model : true,
					ok : function() {
						var url = ctx + "/teacher/course/delcourse";
						$
								.ajax({
									url : url,
									type : 'get',
									dataType : 'json',
									contentType : "application/x-www-form-urlencoded; charset=UTF-8",
									data : {
										"scheduleid" : scheduleid
									},
									error : function(data) {
										alert("failed");
									},
									success : function(data) {
										location.reload();

									},
								});
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});

	},

	delSection : function(sectionid) {
		art
				.dialog({
					title : "删除章节",
					content : "确认删除该节嘛？",
					okValue : '确定',
					padding : '10px',
					model : true,
					ok : function() {
						var url = ctx + "/teacher/item/section/delete/"
								+ sectionid;
						$
								.ajax({
									url : url,
									type : 'get',
									dataType : 'json',
									contentType : "application/x-www-form-urlencoded; charset=UTF-8",
									error : function(data) {
										alert("failed");
									},
									success : function(data) {
										location.reload();

									},
								});
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},
	delChapter : function(chapterid) {
		art
				.dialog({
					title : "删除章节",
					content : "确认删除该章嘛？",
					okValue : '确定',
					padding : '10px',
					model : true,
					ok : function() {
						var url = ctx + "/teacher/item/chapter/delete/"
								+ chapterid;
						$
								.ajax({
									url : url,
									type : 'get',
									dataType : 'json',
									contentType : "application/x-www-form-urlencoded; charset=UTF-8",
									error : function(data) {
										alert("failed");
									},
									success : function(data) {
										location.reload();

									},
								});
					},
					cancelValue : '取消',
					cancel : function() {
					}
				});
	},
	addChapterEditBoxAfter : function(courseid, chapterid) {
		var html = "<li class='treeLi'>"
				+ " <div class='tree1Node tree1Node02'>"
				+ " <div class='tree1Info'>"
				+ " <a class='tree1Aarrow' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ " <span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='' name='' />"
				+ " <div class='BtnWrap'>"
				+ "   <div class='BtnBlue23'>"
				+ "    <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.insertChapter("
				+ courseid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "   </div>"
				+ "   <div class='BtnGray23'>"
				+ "    <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ "   </div>" + " </div>" + "</div>" + "</div>" + "</li>";
		/* $("#courselist").append($(html)); */

		$(html).insertAfter($("#lichapter" + chapterid));

	},
	addChapterEditBoxBefore : function(courseid, chapterid) {
		var html = "<li class='treeLi'>"
				+ " <div class='tree1Node tree1Node02'>"
				+ " <div class='tree1Info'>"
				+ " <a class='tree1Aarrow' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ " <span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='' name='' />"
				+ " <div class='BtnWrap'>"
				+ "   <div class='BtnBlue23'>"
				+ "    <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.insertChapter("
				+ courseid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "   </div>"
				+ "   <div class='BtnGray23'>"
				+ "    <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ "   </div>" + " </div>" + "</div>" + "</div>" + "</li>";
		/* $("#courselist").append($(html)); */

		$(html).insertBefore($("#lichapter" + chapterid));

	},

	parsePeriod : function(period) {
		var str;
		switch (period) {
		case 1:
			str = "第一节";
			break;
		case 2:
			str = "第二节";
			break;
		case 3:
			str = "第三节";
			break;
		case 4:
			str = "第四节";
			break;
		case 5:
			str = "第五节";
			break;
		case 6:
			str = "第六节";
			break;
		case 7:
			str = "第七节";
			break;
		case 8:
			str = "第八节";
			break;

		default:
			break;
		}
		return str;
	},
	addSectionEditBoxAfter : function(chapterid, sectionid) {
		var html = "<li class='treeLi'>"
				+ " <div class='tree1Node tree1Node02'>"
				+ "  <div class='tree1Info'>"
				+ "  <span class='tree1NodeIndent'>"
				+ "  <b class='tree1NodeLine3'></b>"
				+ "</span>"
				+ " <a class='tree1Active' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ "<span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='' name='' />"
				+ " <div class='BtnWrap'>"
				+ "  <div class='BtnBlue23'>"
				+ "  <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.insertSection("
				+ chapterid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "  </div>"
				+ " <div class='BtnGray23'>"
				+ "  <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ " </div>" + " </div>" + " </div> " + "</div>" + " </li>";
//		$("#sectionlist" + chapterid + ":last").append($(html));
		$(html).insertAfter("#lisection" + sectionid);
	},
	addSectionEditBoxBefore : function(chapterid, sectionid) {
		var html = "<li class='treeLi'>"
				+ " <div class='tree1Node tree1Node02'>"
				+ "  <div class='tree1Info'>"
				+ "  <span class='tree1NodeIndent'>"
				+ "  <b class='tree1NodeLine3'></b>"
				+ "</span>"
				+ " <a class='tree1Active' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ "<span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='' name='' />"
				+ " <div class='BtnWrap'>"
				+ "  <div class='BtnBlue23'>"
				+ "  <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.insertSection("
				+ chapterid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "  </div>"
				+ " <div class='BtnGray23'>"
				+ "  <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ " </div>" + " </div>" + " </div> " + "</div>" + " </li>";
//		$("#sectionlist" + chapterid + ":last").append($(html));
		$(html).insertBefore("#lisection" + sectionid);
	},

	insertSection : function(chapterid) {
		var url = ctx + "/teacher/course/insertSection";
		$.ajax({
			url : url,
			type : 'get',
			dataType : 'json',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"chapterId" : chapterid,
				"sectionName" : encodeURI($(
						"#sectionlist" + chapterid + ":last").find("input")
						.val())
			},
			error : function(data) {
				alert("failed");
			},
			success : function(data) {
				location.reload();

			},
		});
	},
	insertChapter : function(courseid) {
		var url = ctx + "/teacher/course/insertChapter";
		$.ajax({
			url : url,
			type : 'get',
			dataType : 'json',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"courseId" : courseid,
				"chapterName" : encodeURI($("#courselist:last").find("input")
						.val())
			},
			error : function(data) {
				alert("failed");
			},
			success : function(data) {
				location.reload();

			},
		});
	},
	renameChapter : function(chapterid) {
		var cha = $("#spanchapter" + chapterid).text();
		$("#spanchapter" + chapterid).text("");
		var html = " <div class='tree1Node tree1Node02'>"
				+ " <div class='tree1Info'>"
				+ " <a class='tree1Aarrow' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ " <span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='"
				+ cha
				+ "' id='inputchapter"
				+ chapterid
				+ "' />"
				+ " <div class='BtnWrap'>"
				+ "   <div class='BtnBlue23'>"
				+ "    <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.updateChapter("
				+ chapterid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "   </div>"
				+ "   <div class='BtnGray23'>"
				+ "    <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ "   </div>" + " </div>" + "</div>" + "</div>";

		$("#lichapter" + chapterid).html(html);

	},

	renameSection : function(sectionid) {
		var sec = $("#spansection" + sectionid).text();
		$("#spansection" + sectionid).text("");
		var html = " <div class='tree1Node tree1Node02'>"
				+ "  <div class='tree1Info'>"
				+ "  <span class='tree1NodeIndent'>"
				+ "  <b class='tree1NodeLine3'></b>"
				+ "</span>"
				+ " <a class='tree1Active' href='javascript:void(0);'>&nbsp;</a>"
				+ " <span class='tree1NodeFolder'></span>"
				+ "<span class='tree1NodeName'></span>"
				+ " <input class='inputText' type='text' value='"
				+ sec
				+ "' id='inputsection"
				+ sectionid
				+ "' />"
				+ " <div class='BtnWrap'>"
				+ "  <div class='BtnBlue23'>"
				+ "  <a href='javascript:void(0)' onclick='latte.teacher.course.courselist.updateSection("
				+ sectionid
				+ ")' class='btnSave' id='btnSave'><span>确定</span></a>"
				+ "  </div>"
				+ " <div class='BtnGray23'>"
				+ "  <a href='' class='btnSave' id='btnSave'><span>取消</span></a>"
				+ " </div>" + " </div>" + " </div> " + "</div>";
		$("#lisection" + sectionid).html(html)
		// $(html).appendTo($("#divsection"+sectionid));

	},
	updateChapter : function(chapterId) {
		var url = ctx + "/teacher/course/updateChapter";
		$.ajax({
			url : url,
			type : 'get',
			dataType : 'json',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"chapterId" : chapterId,
				"chapterName" : encodeURI($("#inputchapter" + chapterId).val())
			},
			error : function(data) {
				alert("failed");
			},
			success : function(data) {
				location.reload();

			},
		});
	},
	updateSection : function(sectionId) {
		var url = ctx + "/teacher/course/updateSection";
		$.ajax({
			url : url,
			type : 'get',
			dataType : 'json',
			contentType : "application/x-www-form-urlencoded; charset=UTF-8",
			data : {
				"sectionId" : sectionId,
				"sectionName" : encodeURI($("#inputsection" + sectionId).val())
			},
			error : function(data) {
				alert("failed");
			},
			success : function(data) {
				location.reload();

			},
		});
	}
};
