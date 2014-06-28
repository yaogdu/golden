latte.teacher.focus = {
	data : {
		resourceTpl : null,
		searchData : {
			resourcetype : '0',
			rid : '-1',
			resourceFormat : '-1',
			operation : '2',
			pageNo:1
		},
		resourceList : null
	},
	rms : '',
	topicData : [],
	theme : 0,
	init : function() {
		$('#nav_resource').addClass('current');
		latte.teacher.focus.data.resourceTpl = juicer($('#resource-tpl').html());
		latte.teacher.focus.initSrc();
		latte.teacher.focus.initTree();
		latte.teacher.focus.initTab();
		latte.teacher.focus.searchResource();
		
		latte.teacher.reviewCourseware.init();
		latte.teacher.review.init();
		latte.teacher.reviewClip.init();
		latte.teacher.reviewTestPaper.init();
		 $('#resource_list').on('click','.infoLabel',function(){
			 var id = $(this).attr('data-id');
			 var type=$(this).attr('data-type');
			 var data = latte.teacher.focus.data.resourceList[id];
			 if(0==type){
				 latte.teacher.reviewCourseware.view(data);
			 }else if(1==type){
				 latte.teacher.review.view(data);
			 }else if(2==type){
				 latte.teacher.reviewClip.view(data);
			 }else if(3==type){
				 latte.teacher.reviewTestPaper.view(data);
			 }
		 });
		

	},
	checking : function() {
		// $.ajax({
		// type : "POST",
		// cache : false,
		// contentType: 'application/json',
		// url : ctx+"/res/resource/approve",
		// dataType : 'json',
		// data:JSON.stringify({
		// "checkStatus":3,
		// "resourceType":1,
		// "resource":latte.xk.review.data.resourceId
		// }),
		// success : function(response){
		//			 
		// },
		// error : function() {
		//			 
		// }
		// });

	},
	start : function(data) {
		util.dialog.defaultDialog('确认启用?', function() {
			// $.ajax({
			// type : "POST",
			// cache : false,
			// contentType : 'application/json',
			// url : ctx + "/res/resource/enable",
			// dataType : 'json',
			// data : JSON.stringify({
			// "resourceType" : 1,
			// "id" : data.id
			// }),
			// success : function(response) {
			// util.dialog.messageDialog('成功');
			// latte.teacher.focus.searchResource();
			// },
			// error : function(response) {
			// util.dialog.errorDialog('启用失败');
			// }
			// });
		});
	},
	stop : function(data) {
		util.dialog.defaultDialog('确认停用?', function() {
			// $.ajax({
			// type : "POST",
			// cache : false,
			// contentType : 'application/json',
			// url : ctx + "/res/resource/disable",
			// dataType : 'json',
			// data : JSON.stringify({
			// "resourceType" : 1,
			// "id" : data.id
			// }),
			// success : function(response) {
			// util.dialog.messageDialog('成功');
			// latte.teacher.focus.searchResource();
			// },
			// error : function(response) {
			// util.dialog.errorDialog('停用失败');
			// }
			// });
		});
	},
	edit : function(data) {
		// location.href = ctx + '/res/resource/toUpdate/1/' + data.id;

	},
	del : function(data) {
		util.dialog.defaultDialog('确认删除?', function() {
			// $.ajax({
			// type : "DELETE",
			// cache : false,
			// contentType : 'application/json',
			// url : ctx + "/res/material/delete",
			// dataType : 'json',
			// data : JSON.stringify({
			// "id" : data.id
			// }),
			// success : function(response) {
			// util.dialog.messageDialog('成功');
			// latte.teacher.focus.searchResource();
			// },
			// error : function(response) {
			// util.dialog.errorDialog('删除失败');
			// }
			// });
		});
	},
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initMyFocus",
			dataType : 'json',
			success : latte.teacher.focus.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result = data;

		var operation=$('#operation').val();
		latte.teacher.focus.data.searchData.operation=operation;
		
		

		$('.mainTitle a[data-id='+operation+']').parents('li').addClass('current');
			/*$(this).parents('li').siblings('li').removeClass('current');
			$(this).parents('li').addClass('current');
			var dataId = $(this).attr("data-id");
			latte.teacher.focus.data.searchData.pageNo = 1;
			latte.teacher.focus.data.searchData.operation = dataId;
			latte.teacher.focus.initResType();
			
			 * $('.conNata dd').siblings('dd').removeClass('current');
			 * $('.conNata dd:first').addClass('current');
			 * latte.teacher.focus.data.searchData.resourcetype=0;
			 
		});*/
		// // src handle
		// var srcs = result.src;
		// $("<option value='-1'>来源</option>").appendTo($("#src"));
		// for ( var i = 0; i < srcs.length; i++) {
		// var src = srcs[i];
		// $(
		// "<option value='" + src.dictCode + "'>" + src.dictName
		// + "</option>").appendTo($("#src"));
		// }
		//
		// // //phase handle
		// var phases = result.phase;
		// $("<option value='-1'>阶段</option>").appendTo($("#phase"));
		// for ( var i = 0; i < phases.length; i++) {
		// var phase = phases[i];
		// $(
		// "<option value='" + phase.dictCode + "'>" + phase.dictName
		// + "</option>").appendTo($("#phase"));
		// }

		latte.teacher.focus.rms = '';

		var rms = result.rms;
		var rmArray = new Array();
		rmArray.push({
			"pId" : 0,
			"open" : false,
			"id" : -1,
			"name" : "全部"
		});

		var ht = "";//"<option id=-1>请选择</option>";
		for (var i = 0; i < rms.length; i++) {
			var rm = rms[i];
			rm["pId"] = -1;
			rm["open"] = false;
			rmArray.push(rm);
			ht += "<option value='" + rm.id + "'>" + rm.name + "</option>";
		}
		latte.teacher.focus.rms = ht;

		var formats = result.formats;
		ht = "<dt>格式：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			ht += "<dd id='" + format.dictCode + "'>" + format.dictName
					+ "</dd>";
		}
		$('#resource_format').html(ht);

		/*
		 * $('#resource_format').on("click","dd",function(){
		 * $(this).siblings('dd').removeClass('current');
		 * $(this).addClass('current'); alert($(this).attr("id"));
		 * latte.teacher.material.data.searchData.resourceFormat =
		 * util.appFormatSearch($(this).attr('id'));; });
		 */

		latte.teacher.focus.zNodes = rmArray;
		latte.teacher.focus.initTree();
		latte.teacher.focus.initResType();
		// var srcs=result.src;
		// ht="<dt>来源：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		// for(var i=0;i<srcs.length;i++){
		// var src=srcs[i];
		// ht+="<dd id='"+src.dictCode+"'>"+src.dictName+"</dd>";
		// }
		// $('#src').html(ht);
		//		
		// var phases=result.phase;
		// ht="<dt>阶段：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		// for(var i=0;i<phases.length;i++){
		// var phase=phases[i];
		// ht+="<dd id='"+phase.dictCode+"'>"+phase.dictName+"</dd>";
		// }
		// $('#phase').html(ht);
		//		
		// var formats=result.formats;
		// ht="<dt>格式：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		// for(var i=0;i<formats.length;i++){
		// var format=formats[i];
		// ht+="<dd id='"+format.dictCode+"'>"+format.dictName+"</dd>";
		// }
		// $('#format').html(ht);
		//		
		// $('#phase').on("click","dd",function(){
		// $(this).siblings('dd').removeClass('current');
		// $(this).addClass('current');
		// latte.teacher.focus.data.searchData.phase = $(this).attr("id");
		// });
		//		
		// $('#src').on("click","dd",function(){
		// $(this).siblings('dd').removeClass('current');
		// $(this).addClass('current');
		// latte.teacher.focus.data.searchData.src = $(this).attr("id");
		// });
		//		
		// $('#format').on("click","dd",function(){
		// $(this).siblings('dd').removeClass('current');
		// $(this).addClass('current');
		// latte.teacher.focus.data.searchData.format =
		// util.appFormatSearch($(this).attr('id'));;
		// });
		//		

		// var checkStatus = result.checkStatus;
		// $("<option value='-1'>审批状态</option>").appendTo($("#checkStatus"));
		// for ( var i = 0; i < checkStatus.length; i++) {
		// var c = checkStatus[i];
		// $("<option value='" + c.dictCode + "'>" + c.dictName + "</option>")
		// .appendTo($("#checkStatus"));
		// }
		//
		// var publishStatus = result.publishStatus;
		// $("<option value='-1'>发布状态</option>").appendTo($("#publishStatus"));
		// for ( var i = 0; i < publishStatus.length; i++) {
		// var p = publishStatus[i];
		// $("<option value='" + p.dictCode + "'>" + p.dictName + "</option>")
		// .appendTo($("#publishStatus"));
		// }
		// var stage=result.stage;
		// var subject=result.subject;
		// latte.teacher.focus.data.searchData.stageid = stage;
		// latte.teacher.focus.data.searchData.subjectid =subject;
		// latte.teacher.focus.initTopic(latte.teacher.focus.data.searchData.subjectid);
		// latte.teacher.focus.sort(true);
		// latte.teacher.focus.initTab();
		// var stages = result.stage;
		//
		// for ( var i = 0; i < stages.length; i++) {
		// var stage = stages[i];
		// /* dl="<dl><dt id=\""+stage.id+"\">"+stage.name+"</dt>"; */
		// var subjects = stage.subject;
		// for ( var j = 0; j < subjects.length; j++) {
		// var subject = subjects[j];
		// if (i == 0 && j == 0) {
		// $(
		// "<option value='" + subject.id + "'>" + stage.name
		// + subject.name + "</option>").appendTo(
		// $("#subject"));
		//
		// latte.teacher.focus.data.searchData.subjectid = subject.id;
		//
		// } else {
		// $(
		// "<option value='" + subject.id + "'>" + stage.name
		// + subject.name + "</option>").appendTo(
		// $("#subject"));
		// }
		//
		// }
		//
		// }
		//
		// $('#subject').on("change", function() {
		// latte.teacher.focus.clearFilter();
		// latte.teacher.focus.data.searchData.subjectid = $(this).val();
		// latte.teacher.focus.initTopic($(this).val());
		// latte.teacher.focus.sort(true);
		//
		// });
		// latte.teacher.focus.initTopic($("#subject").val());
		// latte.teacher.focus.initTab();
	},
	/* init ends */
	initTab : function() {// 初始化顶部tab标签
		$('.right_button li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			/** 在这里添加点击tab标签触发的事件 */
		});

		// $('.infoText')
		// .change(
		// function() {
		// latte.teacher.focus.data.searchData.pageNo = 1;
		// latte.teacher.focus.data.searchData.keyword = encodeURI(encodeURI($(
		// this).val()));
		// });
		// $('#theme').click(latte.teacher.focus.selectTheme);
		// $('#special').click(latte.teacher.focus.selectSpecial);
		// $('#phase').on('change','dd',function(){
		// latte.teacher.focus.data.searchData.pageNo = 1;
		// latte.teacher.focus.data.searchData.phase = $(this).val();
		// });
		// $('#src').on('change','dd',function(){
		// latte.teacher.focus.data.searchData.pageNo = 1;
		// latte.teacher.focus.data.searchData.src = $(this).val();
		// });
		// $('#format').on('change','dd',function(){
		// latte.teacher.focus.data.searchData.pageNo = 1;
		// latte.teacher.focus.data.searchData.format =
		// util.appFormatSearch($(this).val());;
		// });
		// $('#btnSearch').click(function() {
		// latte.teacher.focus.searchResource();
		// });
		//		
		$('#resourcetype').on(
				'click',
				'dd',
				function() {
					$(this).siblings('dd').removeClass('current');
					$(this).addClass('current');
					latte.teacher.focus.data.searchData.pageNo = 1;
					latte.teacher.focus.data.searchData.resourcetype = $(this)
							.attr("id");
					latte.teacher.focus.initFormat();
					latte.teacher.focus.searchResource();					
				});

		$('.mainTitle').on('click', 'a', function() {
			$(this).parents('li').siblings('li').removeClass('current');
			$(this).parents('li').addClass('current');
			var dataId = $(this).attr("data-id");
			latte.teacher.focus.data.searchData.pageNo = 1;
			latte.teacher.focus.data.searchData.operation = dataId;
			latte.teacher.focus.initResType();
			latte.teacher.focus.searchResource();
			/*
			 * $('.conNata dd').siblings('dd').removeClass('current');
			 * $('.conNata dd:first').addClass('current');
			 * latte.teacher.focus.data.searchData.resourcetype=0;
			 */
		});

		$('#resource_format').on(
				"click",
				"dd",
				function() {
					$(this).siblings('dd').removeClass('current');
					$(this).addClass('current');
					latte.teacher.focus.data.searchData.resourceFormat = $(this).attr("id");/*util
							.appFormatSearch($(this).attr('id'));*/
					latte.teacher.focus.searchResource();
				});

		/*
		 * $('#resource_format').on('click','dd',function(){
		 * $(this).siblings('dd').removeClass('current');
		 * $(this).addClass('current');
		 * latte.teacher.focus.data.searchData.pageNo = 1;
		 * latte.teacher.focus.data.searchData.resourcetype=$(this).attr("data-id");
		 * $('.conNata dd').siblings('dd').removeClass('current'); $('.conNata
		 * dd:first').addClass('current');
		 * latte.teacher.focus.data.searchData.resourcetype=0; });
		 */
		
		$('#rm').bind('click',function(){
			art.dialog.open(ctx + '/teacher/resourceManagement/toResourceManagementPopUp', {
				lock: true,
				opacity: 0.5,
				width:510,
			    title: '资源分类',
			    id : "resourceManagement_dialog"
			});
		});
		
		$('#btnMove')
				.on(
						'click',
						function() {
							var ids = "";
							$("input[name=chk][type=checkbox]").each(
									function() {
										if ($(this).attr("checked")) {
											ids += $(this).val() + ",";
										}
									});
							// var data =
							// latte.teacher.focus.data.resourceList[id];
							util.dialog
									.defaultDialog(
											'分类:<select id="rmr">'
													+ latte.teacher.focus.rms
													+ '</select>',
											function() {
												$
														.ajax({
															type : "POST",
															cache : false,
															contentType : 'application/json',
															url : ctx
																	+ "/teacher/resource/updateCategories",
															dataType : 'json',
															data : JSON
																	.stringify({
																		"resourceManagementId" : $(
																				'#rmr')
																				.val(),
																		"resourceType" : latte.teacher.focus.data.searchData.resourcetype,
																		"ids" : ids
																	}),
															success : function(
																	response) {
																util.dialog
																		.messageDialog('成功');
																latte.teacher.focus
																		.searchResource();
															},
															error : function() {

															}
														});
											});
						});

		$('#btnDel')
				.on(
						'click',
						function() {
							var ids = "";
							$("input[name=chk][type=checkbox]").each(
									function() {
										if ($(this).attr("checked")) {
											ids += $(this).val() + ",";
										}
									});
							// var data =
							// latte.teacher.focus.data.resourceList[id];
							util.dialog
									.defaultDialog(
											'确认删除?',
											function() {
												$
														.ajax({
															type : "POST",
															cache : false,
															contentType : 'application/json',
															url : ctx
																	+ "/teacher/resource/deleteResource",
															dataType : 'json',
															data : JSON
																	.stringify({
																		"resourceManagementId" : $(
																				'#rmr')
																				.val(),
																		"resourceType" : latte.teacher.focus.data.searchData.resourcetype,
																		"ids" : ids
																	}),
															success : function(
																	response) {
																util.dialog
																		.messageDialog('成功');
																latte.teacher.focus
																		.searchResource();
															},
															error : function() {
																util.dialog
																		.messageDialog('发生错误');
															}
														});
											});
						});

	},
	initResType : function() {

		var dataId = latte.teacher.focus.data.searchData.operation;
		var ht = '';
		if (dataId == 2) {
			ht = "<dt>类型：</dt><dd id=\"0\" class=\"current\">课件</dd>";
			ht += "<dd id=\"1\" >教学材料</dd>";
			ht += "<dd id=\"2\" >素材</dd>";
			ht += "<dd id=\"3\" >试卷</dd>";
			ht += "<dd>题目</dd>";
			latte.teacher.focus.data.searchData.resourcetype = 0;
		} else if (dataId == 3) {
			ht = "<dt>类型：</dt><dd id=\"1\" class=\"current\" >教学资料</dd>";
			ht += "<dd id=\"3\" >试卷</dd>";
			latte.teacher.focus.data.searchData.resourcetype = 1;
		} else if (dataId == 1) {
			ht = "<dt>类型：</dt><dd id=\"2\" class=\"current\" >素材</dd>";
			ht += "<dd >题目</dd>";
			latte.teacher.focus.data.searchData.resourcetype = 2;
		}
		latte.teacher.focus.initFormat();
		$('#resourcetype').html(ht);

	},
	initFormat : function() {
		var resourceType = latte.teacher.focus.data.searchData.resourcetype;
		if (resourceType == 1 || resourceType == 2) {
			$('#resource_format').show();
			$('#resource_format dd').removeClass('current');
			$('#resource_format dd:first').addClass('current');
		}else if(resourceType==0){
			$('#resource_format').hide();
		}else{
			$('#resource_format').hide();
		}
		latte.teacher.focus.data.searchData.resourceFormat=-1;
	},
	searchResource : function() {
		var url = ctx + "/teacher/resource/myFav";
		var data = latte.teacher.focus.data.searchData;
		$.ajax({
			type : "get",
			cache : false,
			url : url,
			dataType : 'json',
			data : data,
			success : latte.teacher.focus.initPageResource,
			error : function() {
				alert("error");
			}
		});
	},
	initPageResource : function(data) {
		if (!data.success) {
			util.dialog.messageDialog('查询出错');
			return;
		}

		latte.teacher.focus.data.resourceList = {};
		for ( var index in data.list) {
			var resource = data.list[index];
			latte.teacher.focus.data.resourceList[resource.id] = resource;
		}

		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = latte.teacher.focus.data.resourceTpl.render(data);
		$('#resource_list').html(html);

		var totalPage = data.totalPage;
		var totalcount = data.totalCount;
		if (totalPage <= 1) {
			$("#pagebar").html('');
		}
		if (totalPage >= 2) {
			$(function() {
				$.fn.jpagebar({
					renderTo : $("#pagebar"),
					totalpage : totalPage,
					totalcount : totalcount,
					pagebarCssName : 'pagination2',
					currentPage : data.pageNo,
					onClickPage : function(pageNo) {
						$.fn.setCurrentPage(this, pageNo);
						latte.teacher.focus.data.searchData.pageNo = pageNo;
						if (latte.teacher.focus.instance_resource == null)
							latte.teacher.focus.instance_resource = this;
						latte.teacher.focus.searchResource();
					}
				});
			});
		}
	},
	initResourceFunc : function() {
		$('.starIco em').click(function() {
			$(this).prevAll('em').addClass("limit");
			$(this).addClass("limit");
			$(this).nextAll('em').removeClass("limit");
		});
	},
	zTree : null,
	zNodes : null,
	setting : {
		view : {
			dblClickExpand : false,
			showLine : true,
			selectedMulti : false
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",// id 自定义
				pIdKey : "pId",// 父节点id 自定义
				rootPId : ""
			}
		},
		callback : {
			beforeClick : function(treeId, treeNode) {
				var zTree = $.fn.zTree.getZTreeObj("tree");
				if (treeNode.isParent) {
					zTree.expandNode(treeNode);
					latte.teacher.focus.data.searchData.rid = '-1';
					return false;
				} else {
					// console.log(arguments);//点击叶子节点事件
					var rid = arguments[1].id;
					latte.teacher.focus.data.searchData.rid = rid;
					latte.teacher.focus.data.searchData.pageNo = 1;
					latte.teacher.focus.searchResource();
					return true;

				}
			}
		}
	},
	initTree : function() {// 初始化树功能，折叠展开点击事件
		var t = $("#tree");
		t = $.fn.zTree.init(t, latte.teacher.focus.setting,
				latte.teacher.focus.zNodes);
		latte.teacher.focus.zTree = $.fn.zTree.getZTreeObj("tree");
		latte.teacher.focus.zTree.selectNode(latte.teacher.focus.zTree
				.getNodeByParam("id", 101));

		$('.treeOper .unfold').click(function() {
			latte.teacher.focus.zTree.expandAll(true);
		});

		$('.treeOper .shrink').click(function() {
			latte.teacher.focus.zTree.expandAll(false);
		});

	},
	selectTheme : function() {
		var $li = $('#theme').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.focus.theme = 0;
		latte.teacher.focus.handleTopic(latte.teacher.focus.topicData);
	},
	selectSpecial : function() {
		var $li = $('#special').parent('li'); 
		$li.addClass('current').siblings('li').removeClass('current');
		latte.teacher.focus.theme = 1;
		latte.teacher.focus.handleTopic(latte.teacher.focus.topicData);
	},
	sort : function(init) {// init 为默认排序项

		var $obj;
		if (init == true) {
			$obj = $('#default');
		} else {
			$obj = $(this);
		}
		var id = $obj.attr("id");

		if ($obj.hasClass('current')) {
			if (id != "default") {
				var $array = $(this).find('em');
				if ($array.hasClass('up')) {
					$array.removeClass('up').addClass('down').text('↓');// 降序
					latte.teacher.focus.data.searchData.desc = true;
				} else {
					$array.removeClass('down').addClass('up').text('↑');// 升序
					latte.teacher.focus.data.searchData.desc = !latte.teacher.focus.data.searchData.desc;
				}
			}
		} else {
			$obj.addClass('current').addClass('down').siblings('span')
					.removeClass('current');
			latte.teacher.focus.data.searchData.desc = true;
		}
		latte.teacher.focus.data.searchData.order = $obj.attr("id");// 查询
		latte.teacher.focus.searchResource();
	}
};
