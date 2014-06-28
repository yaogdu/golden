//用于选择的资源搜索列表
latte.resource.list = {
	data : {
		searchData : {
			stageid : '1',
			subjectid : '1', 
			src : '-1',// 来源
			format : '-1',// 格式
			order : 'submitTime',// 排序
			topicId : '-1',
			keyword : '-1',
			seriesid : '-1',
			pageNo : '1',
			desc : true
		},
		resourceList : {},
		resourceListTpl : null,
		
	},
	http:'',
	rms : '',
	callback : function() {
	},// 选中资源之后的回调函数
	init : function() {

		latte.resource.list.data.resourceListTpl = juicer($(
				'#resource-list-tpl').html());

		latte.resource.list.initSrc();
		
		$('body').on('click','#btnFav',function() {
							var id = $(this).attr('data-id');
							// var data =
							// latte.resource.list.data.resourceList[id];
							util.dialog.defaultDialog('分类:<select id="rmr">'+ latte.resource.list.rms+ '</select>',function() {
								$.ajax({
									type : "POST",
									cache : false,
									contentType : 'application/json',
									url : ctx+ "/teacher/resource/favResource",
									dataType : 'json',
									data : JSON.stringify({
												"resourceManagementId" : $('#rmr').val(),
												"resourceId" : id,
												"resourceType" : 2
											}),
									success : function(response) {

									},
									error : function() {

									}
								});
							});

							//			
							// latte.xk.review.view(data);
						});
		$('body').on('click', '#btnRef', function() {
			var id = $(this).attr('data-id');
						
        	$.ajax({
        		url: ctx + "/teacher/resource/refResource?resourceId=" + id + "&resourceType=2",
        		type: "post",
        		success: function(returnValue){
        		}
        	});
			
			var data = latte.resource.list.data.resourceList[id];
			var url=latte.resource.list.http+data.md5;
			top.XDFSlide.oper.compAV(url, null);
		});

		$('body').on('click', '#resource_list .sortTitle a', function() {
			art.dialog({
				lock : true,
				width : 700,
				height : 700,
				id : 'preview_dialog',
				title : '资源搜索',
				content : $('#review-dialog-tpl').html()
			});
		});
		//latte.resource.list.sort(true);
	},
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			async : false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initSearchClip",
			dataType : 'json',
			success : latte.resource.list.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result = data;
		
		latte.resource.list.http=result.http;
		
		latte.resource.list.rms = '';
		var rms = result.rms;
		var ht = "<option id=-1>请选择</option>";
		for (var i = 0; i < rms.length; i++) {
			var rm = rms[i];
			ht += "<option value='" + rm.id + "'>" + rm.name + "</option>";
		}
		latte.resource.list.rms = ht;

		var srcs = result.src;
		ht = "<dt>来源：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < srcs.length; i++) {
			var src = srcs[i];
			ht += "<dd id='" + src.dictCode + "'>" + src.dictName + "</dd>";
		}
		$('#src').html(ht);

	 
		var formats = result.formats;
		ht = "<dt>格式：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			ht += "<dd id='" + format.dictCode + "'>" + format.dictName
					+ "</dd>";
		}
		$('#format').html(ht);

		
		$('body').on("click", "#format dd", function() {
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.resource.list.data.searchData.pageNo = 1;
			latte.resource.list.data.searchData.format = util
			.appFormatSearch($(this).attr('id'));
		});
		
		
		 

		$('body').on("click", "#src dd", function() {
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.resource.list.data.searchData.pageNo = 1;
			latte.resource.list.data.searchData.src = $(this).attr("id");
		});

		$('body').on(
				"click",
				"#format dd",
				function() {
					$(this).siblings('dd').removeClass('current');
					$(this).addClass('current');
					latte.resource.list.data.searchData.format = util
							.appFormatSearch($(this).attr('id'));
					;
				});

		var stage = result.stage;
		var subject = result.subject;
		latte.resource.list.data.searchData.stageid = stage;
		latte.resource.list.data.searchData.subjectid = subject;
		
		
		

		$('body .infoText')
				.change(
						function() {
							latte.resource.list.data.searchData.pageNo = 1;
							latte.resource.list.data.searchData.keyword = encodeURI(encodeURI($(
									this).val()));
						});
		 
		$('body').on('change', '#src dd', function() {
			latte.resource.list.data.searchData.pageNo = 1;
			latte.resource.list.data.searchData.src = $(this).val();
		});
		$('body').on('change',
				'#format dd',
				function() {
					latte.resource.list.data.searchData.pageNo = 1;
					latte.resource.list.data.searchData.format = util
							.appFormatSearch($(this).val());
					;
				});
		$('body').on('click',' #btnSearch',function() {
			latte.resource.list.searchResource();
		});

		$('body').on('click', '.nataDetail div dl a', latte.resource.list.sort);

	
	},
	show : function() {
		art.dialog({
			lock : true,
			height : 500,
			id : 'resource_list_dialog',
			title : '资源搜索',
			content : $('#resource_list_dialog').html(),
			init : function() {
				latte.resource.list.searchResource();
			}
		});
	},
	searchResource : function() {
		var url = ctx + "/teacher/clip/retrieve";
		var data = latte.resource.list.data.searchData;
		$.ajax({
			type : "get",
			cache : false,
			url : url,
			dataType : 'json',
			data : data,
			success : latte.resource.list.initPageResource,
			error : function() {
				util.dialog.messageDialog('查询出错');
			}
		});
	},
	initPageResource : function(data) {
		if (!data.success) {
			util.dialog.messageDialog('查询出错');
			return;
		}

		latte.resource.list.data.resourceList = {};
		for ( var index in data.list) {
			var resource = data.list[index];
			latte.resource.list.data.resourceList[resource.id] = resource;
		}

		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = latte.resource.list.data.resourceListTpl.render(data);
		$('#resource_list').html(html);

		var totalPage = data.totalPage;
		var totalcount = data.totalCount;
		if (totalPage <= 1) {
			$("#pagebar").html('');
		}
		if (totalPage >= 2) {
			$(function() {
				$.fn.jpagebar({
					renderTo : $("#resource_pagebar"),
					totalpage : totalPage,
					totalcount : totalcount,
					pagebarCssName : 'pagination2',
					currentPage : data.pageNo,
					onClickPage : function(pageNo) {
						$.fn.setCurrentPage(this, pageNo);
						latte.resource.list.data.searchData.pageNo = pageNo;
						if (latte.resource.list.resourceList == null)
							latte.resource.list.resourceList = this;
						latte.resource.list.searchResource();
					}
				});
			});
		}
	},
	sort : function(init) {// init 为默认排序项
		var $obj;
		if (init == true) {
			$obj = $('#ref');
		} else {
			$obj = $(this);
		}
		var id = $obj.attr("id");

		if ($obj.hasClass('current')) {
			if (id != "default") {
				var $array = $(this).find('em');
				if ($array.hasClass('up')) {
					$array.removeClass('up').addClass('down').text('↓');// 降序
					latte.resource.list.data.searchData.desc = true;
				} else {
					$array.removeClass('down').addClass('up').text('↑');// 升序
					latte.resource.list.data.searchData.desc = !latte.resource.list.data.searchData.desc;
				}
			}
		} else {
			$obj.addClass('current').addClass('down').siblings('span')
					.removeClass('current');
			latte.resource.list.data.searchData.desc = true;
		}
		latte.resource.list.data.searchData.order = $obj.attr("id");// 查询
		latte.resource.list.searchResource();
	}
};