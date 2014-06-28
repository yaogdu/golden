latte.teacher.clip = {
	data : {
		searchData : {
			stageid : '1',
			subjectid : '1',
			src : '-1',// 来源
			format : '-1',// 格式
			order : 'ref',// 排序
			topicId : '-1',
			keyword : '',
			seriesid : '-1',
			pageNo : '1',
			desc : true
		},
		resourceList : {},
		resourceListTpl : null,
		topics:'',
		series:'',
		totalPage : null,
		currPage : null,
		prefix :  null,//路径前缀(不包括文件名)
		suffix : null,//原文件后缀
		orgFileName : null,//原文件名,不包含后缀
		fileName : null,//转换后文件名,不包含后缀
		playType : null,//转换后文件后缀
		image : 'jpg,png,gif,jpeg,bmp',
		initData : null,
		initCallback : null
		 
	},
	http : '',
	rms : '', 
	init : function() {
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_manage').addClass('current');
		latte.teacher.clip.data.resourceTpl = juicer($('#resource-tpl').html());
		latte.teacher.clip.data.topics=$('#topic_name').val();
		latte.teacher.clip.data.series=$('#series_name').val();
		latte.teacher.reviewClip.init();
		latte.teacher.clip.data.searchData.topicId=latte.teacher.clip.data.topics;
		latte.teacher.clip.data.searchData.seriesid=latte.teacher.clip.data.series;
		latte.teacher.clip.initSrc();
		
		$('body').on('click','#btnFav',function(){
			var $obj=$(this);
			var id = $(this).attr('data-id');
			//TODO judge the resource belongs to me or not
//			var data = latte.teacher.material.data.resourceList[id];
			util.dialog.defaultDialog('分类:<select id="rmr">'+latte.teacher.courseware.rms+'</select>',function(){
				$.ajax({
					type : "POST",
					cache : false,
					contentType: 'application/json',
					url : ctx+"/teacher/resource/favResource",
					dataType : 'json',
					data:JSON.stringify({
						"resourceManagementId":$('#rmr').val(),
						"resourceId":id,
						"resourceType":2
					}),
					success : function(response){
						var result=response;
						if(result.success){
							util.dialog.infoDialog("收藏成功");
						}else{
							util.dialog.infoDialog(result.msg);
							$obj.unbind();
							$obj.on('click',function(){
								util.dialog.infoDialog('已经收藏');
								return false;
							})
						}
					}
				});
			});
		});
		
		$('#resource_list').on('click','.sortTitle',function(){
			var id = $(this).attr('data-id');
			var data = latte.teacher.clip.data.resourceList[id];
			latte.teacher.reviewClip.view(data);
		});
/*		

		$('body').on('click', '#resource_list .sortTitle a', function() {
			art.dialog({
				lock : true,
				width : 700,
				height : 700,
				id : 'preview_dialog',
				title : '资源搜索',
				content : $('#review-dialog-tpl').html()
			});
		});*/
	},
	initSrc : function() {
		$.ajax({
			type : "get",
			cache : false,
			async:false,
			contentType : "application/json",
			url : ctx + "/teacher/resource/initSearchClip",
			data:{
				"topics":latte.teacher.clip.data.topics,
				"series":latte.teacher.clip.data.series
			},
			dataType : 'json',
			success : latte.teacher.clip.handleInit,
			error : function() {
				alert("error");
			}
		});
	},
	handleInit : function(data) {
		var result = data;
		
		latte.teacher.clip.http=result.http;
		
		latte.teacher.clip.rms = '';
		var rms = result.rms;
		var ht = "";//"<option id=-1>请选择</option>";
		for (var i = 0; i < rms.length; i++) {
			var rm = rms[i];
			ht += "<option value='" + rm.id + "'>" + rm.name + "</option>";
		}
		latte.teacher.clip.rms = ht;

		var srcs = result.src;
		ht = "<dt>来源：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < srcs.length; i++) {
			var src = srcs[i];
			ht += "<dd id='" + src.dictCode + "'>" + src.dictName + "</dd>";
		}
		//ht+="<dd id=\"0\">我的</dd>";
		$('#src').html(ht);

		var tts = result.topics;
		ht = "<dt>主题：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < tts.length; i++) {
			var t = tts[i];
			ht += "<dd id='" + t.id + "'>" + t.name + "</dd>";
		}
		$('#topic').html(ht);
		
		var ss = result.series;
		ht = "<dt>专题：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < ss.length; i++) {
			var s = ss[i];
			ht += "<dd id='" + s.id + "'>" + s.name + "</dd>";
		}
		$('#series').html(ht);
		
	 
		var formats = result.formats;
		ht = "<dt>格式：</dt><dd id=\"-1\" class=\"current\">全部</dd>";
		for (var i = 0; i < formats.length; i++) {
			var format = formats[i];
			ht += "<dd id='" + format.dictCode + "'>" + format.dictName
					+ "</dd>";
		}
		$('#format').html(ht);
		$('#phase').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.phase = $(this).attr("id");
		});
		
		$('#src').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.src = $(this).attr("id");
		});
		
		$('#format').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.format = util.appFormatSearch($(this).attr('id'));;
		});
		
		$('#topic').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.topicId = $(this).attr('id');
		});

		
		$('#series').on("click","dd",function(){
			$(this).siblings('dd').removeClass('current');
			$(this).addClass('current');
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.seriesid = $(this).attr('id');
		});


		var stage = result.stage;
		var subject = result.subject;
		latte.teacher.clip.data.searchData.stageid = stage;
		latte.teacher.clip.data.searchData.subjectid = subject;
		
		 
		
		
		latte.teacher.clip.initTab();
	 
	},
	/* init ends */
	initTab : function() {// 初始化顶部tab标签
		$('.right_button li').click(function() {
			$(this).siblings('li').removeClass('current');
			$(this).addClass('current');
			/** 在这里添加点击tab标签触发的事件 */
		});

		$('.infoText').change(function() {
			latte.teacher.clip.data.searchData.pageNo = 1;
			latte.teacher.clip.data.searchData.keyword = encodeURI(encodeURI($(this).val()));
		});
		
		 
		$('#btnSearch').click(function() {
			latte.teacher.clip.searchResource();
		});

		$('.nataDetail>div>dl').on('click', 'a', latte.teacher.clip.sort);

		
		$('body').on('click','#btnFav',function() {
			var id = $(this).attr('data-id');
			// var data =
			// latte.teacher.clip.data.resourceList[id];
			util.dialog.defaultDialog('分类:<select id="rmr">'+ latte.teacher.clip.rms+ '</select>',function() {
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
						alert("收藏成功!");
					},
					error : function() {
						alert("发生错误!");
					}
				});
			});

		 
		});
		$('body').on('click', '#btnRef', function() {
			var id = $(this).attr('data-id');
			
			$.ajax({
        		url: ctx + "/teacher/resource/refResource?resourceId=" + id + "&resourceType=2",
        		type: "post",
        		success: function(returnValue){
        		}
        	});
			
			var data = latte.teacher.clip.data.resourceList[id];
			var url ='';
			 
				$.ajax({
					type : 'GET',
					cache : false,
					async : true,
					contentType : 'application/json',
					url : ctx+"/teacher/preview",
					dataType : 'json',
					data:{
						"filename":data.md5,
						"resourceId":data.id,
						"resourceType":data.resourceType
					},
					success : function(response){
						var result = response;
						latte.teacher.clip.data.playType = result.playType;
						latte.teacher.clip.data.prefix = result.http;
						var index = data.fileName.lastIndexOf('.');//分解原文件名
						latte.teacher.clip.data.orgFileName = data.fileName.substr(0,index);
						latte.teacher.clip.data.suffix = data.fileName.substr(index+1);
						index = result.fileName.lastIndexOf('.');//分解转换后文件名
						latte.teacher.clip.data.fileName = result.fileName.substr(0,index);
						
						if(latte.teacher.clip.data.image.indexOf(latte.teacher.clip.data.suffix.toLowerCase())!=-1){
							url=latte.teacher.clip.data.prefix+latte.teacher.clip.data.fileName+'.'+latte.teacher.clip.data.suffix;
						}else{
							util.jsonp.rst = function(data){
								latte.teacher.clip.data.totalPage = data.count;
								if(data.status && data.status!=0){
									return ;
								}
								if(!latte.teacher.clip.data.totalPage)
									latte.teacher.clip.data.totalPage = 1; 
							};
							
							if(latte.teacher.clip.data.playType == 'png'){
								//可能需要把docx修改为doc等等
								$('#preview_info').html('<div style="text-align:center;vertical-align:middle;"><img id="img_preview" style="max-width:918px;margin:auto;"></img></div>');
								$('.btn-up').click(latte.teacher.clip.pre);
								$('.btn-down').click(latte.teacher.clip.next);
								$('.preview-page').show();
								$.ajax({
									url: latte.teacher.clip.data.prefix + latte.teacher.clip.data.suffix + '_png/' + latte.teacher.clip.data.fileName + ".json",
									async:false,
									dataType:"jsonp"
								});
							}else{
								url=result.http+result.fileName;
							}
						}
						if(top){
							(function (method, p) {
								if ($("#quote_iframe").length === 0) {
						            $("<iframe>").attr({
						                id: "quote_iframe"
						            }).css("display", "none").appendTo(document.body);
								}
								
					            $("<form>").attr({
					                method: "POST",
					                action: whiteboard_host,
					                target: "quote_iframe"
					            }).css("display", "none").append([_ipt("method", method), _ipt("p", JSON.stringify(p))]).appendTo(document.body).submit();

					            function _ipt(n, v) {
					                return $("<input>").attr({
					                    name: n,
					                    value: v
					                })[0];
					            }
					        })("compAV", url);
						}
					}
				});
			 
			
			
		});
		
		latte.teacher.clip.sort(true);
	},
	searchResource : function() {

		var url = ctx + "/teacher/clip/retrieve";

		var data = latte.teacher.clip.data.searchData;
		$.ajax({
			type : "get",
			cache : false,
			url : url,
			dataType : 'json',
			data : data,
			success : latte.teacher.clip.initPageResource,
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

		latte.teacher.clip.data.resourceList = {};
		for ( var index in data.list) {
			var resource = data.list[index];
			latte.teacher.clip.data.resourceList[resource.id] = resource;
		}

		data['ctx'] = ctx;// 上下文,模板中有超链接时需要使用
		data['static_ctx'] = static_ctx;// 静态内容上下文
		var html = latte.teacher.clip.data.resourceTpl.render(data);
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
						latte.teacher.clip.data.searchData.pageNo = pageNo;
						if (latte.teacher.clip.instance_resource == null)
							latte.teacher.clip.instance_resource = this;
						latte.teacher.clip.searchResource();
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
					latte.teacher.clip.data.searchData.desc = true;
				} else {
					$array.removeClass('down').addClass('up').text('↑');// 升序
					latte.teacher.clip.data.searchData.desc = !latte.teacher.clip.data.searchData.desc;
				}
			}
		} else {
			$obj.addClass('current').addClass('down').siblings('span')
					.removeClass('current');
			latte.teacher.clip.data.searchData.desc = true;
		}
		latte.teacher.clip.data.searchData.order = $obj.attr("id");// 查询
		latte.teacher.clip.searchResource();
	}
};
