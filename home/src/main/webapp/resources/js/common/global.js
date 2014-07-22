var latte = {
	school : function(){
		student : {}
	},
	teacher : {//教师系统
		ad:{},
		courseware : {},//课件
		material : {},//教学资料
		rb : {}
	},
	resource : {},//资源选择组件
	fileType:{
//		'PPT' : '0',
//		'PPTX' : '0',
//		'DOC' : '1',
//		'DOCX' : '1',
//		'PDF' : '2',
		'PNG' : '3',
		'JPEG' : '3',
		'JPG' : '3',
		'BMP' : '3',
		'GIF' : '3',		
		'WMV' : '4',
		'AVI' : '4',
		'RM' : '4',
		'RMVB' : '4',
		//'DAT' : '4',
		//'ASF' : '4',
		'RAM' : '4',
		'MPG' : '4',
		'MPEG' : '4',
		'3GP' : '4',
		'MOV' : '4',
		'MP4' : '4',
		'M4V' : '4',
		'DVIX' : '4',
		'DV' : '4',
		'MKV' : '4',
		'FLV' : '4',
		'VOB' : '4',
		'QT' : '4',
		'CPK' : '4',
		/*'FLI' : '4',
		'FLC' : '4',
		'MOD' : '4',
		'SWF' : '4',
		'FLA' : '4', */
		'VOB' : '4',
		'MP3' : '5',
		'WAV' : '5',
		'APK' : '6',
		'IP'  : '6'
		/*'WMA' : '5',*/
		//'TXT' : '6'
	},
	formatParent:{
			'PDF':'PDF',
			'PPT' : 'PPT',
			'WORD' : 'WORD',
			'PIC' : '图片',	
			'AUDIO' : '音频',
			'VIDEO' : '视频',
			'TXT' : '文本'
	},
	paperType:{
		'-1':'不限', 
		0:'高考真题',
		1:'高考模拟', 
		2:'期中考试',
		3:'期末考试', 
		4:'会考卷',
		5:'月考卷',
		6:'同步测试',
		7:'单元测试', 
		8:'竞赛题', 
		9:'中考真题', 
		10:'中考模拟', 
		11:'其他' 
	},
	periods:{
		'1':"第1节",
		'2':"第2节",
		'3':"第3节",
		'4':"第4节",
		'5':"第5节",
		'6':"第6节",
		'7':"第7节",
		'8':"第8节"
	},
	appFormat:{
		"0": "PPT",
		"1": "WORD",
		"2": "PDF",
		"3": "PIC",
		"4": "VIDEO",
		"5": "AUDIO",
		"6": "TXT"
	},
	audience:{
		"0": "教师",
		"1": "学生",
		"2": "教师，学生"
	},
	resourceType:{
		"0": "课件",
		"1": "教学资料",
		"2": "素材",
		"3": "试卷"
	},
};

//add by wangbeichen
//$(document).ready(function(){
//    //check browser
//    var isChrome = navigator.userAgent.toLowerCase().match(/chrome/) != null;
//    if(!isChrome) {
//        util.dialog.lockDialog("<img src='/static/images/chrome.png' style='margin:-8px 10px 0 -10px'> <a href='http://www.google.cn/intl/zh-CN/chrome/browser/' style='vertical-align:top'>请下载Chrome浏览器进行浏览</a>");
//    }
//});


$.ajaxSetup({
    url: "/",
    global: true,
    cache: false,
    converters: { "text json": function (jsonString) {
//        var res = JSON.parseWithDate(jsonString);
//        if (res && res.hasOwnProperty("d"))
//            res = res.d;
        return jsonString;
    } },
    dataFilter:function(data,type) {
        var errorCode =  data.status;
        if(errorCode){
            switch (errorCode) {
                case 401:
                    window.location.href= "/error?errorCode=401";
                    break;
                case 403:
                    util.dialog.errorDialog("没有权限!");
                    break;
                default:
                    break;
            }
        }

        if (type == 'html' || type == 'script') {
            return data;
        } else {
            return eval('(' + data + ')');
        }
    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        var errorCode =  XMLHttpRequest.status;
        if(errorCode){
            switch (errorCode) {
                case 401:
                    window.location.href= "/error?errorCode=401";
//                    util.dialog.infoDialog("登陆超时", function() {window.location.href= "/error?errorCode=401";});
                    break;
                case 403:
                    util.dialog.errorDialog("没有权限");
                    break;
                default:
                    break;
            }
        }

//        console.log(XMLHttpRequest);
//        console.log(textStatus);
//        console.log(errorThrown);
//        util.dialog.errorDialog("服务器异常，请稍后再试!");
    }
});

var util = {
		ajax : function(options){
			options.error = function(data){
				var errorCode =  data.status;
				if(errorCode){
					switch (errorCode) {
					case 401:
						util.dialog.errorDialog("没有权限!");
						break;
					case 403:
						window.location.href= ctx;
						break;
					default:
						break;
					}
				}
			};
			$.ajax(options);
		},
		date : {
			format : function(time){
				/** 格式化时间 */
			    var date = new Date(parseInt(time));
			    var year = date.getFullYear();
			    var month = date.getMonth() + 1;
			    var day = date.getDate();
			    var hour = date.getHours();
			    var minute = date.getMinutes();
			    var second = date.getSeconds();

			    hour = ((hour < 10) ? '0' : '') + hour;
			    minute = ((minute < 10) ? '0' : '') + minute;
			    second = ((second < 10) ? '0' : '') + second;

			    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			},
			getDate : function(time){//截取日期
				if(!isNaN(time)){
					time = util.date.format(time);
				}
				var index =  time.indexOf(' ');
				if(index != -1)
					return time.substr(0, index);
				return time;
			}
		},
		dict:{
			src:{
//				0:"教师",
//				1:"平台",
//				2:"用户"
				0:"平台",
				1:"平台",
				2:"用户"
			},
			phase:{
				0:'新授课',
				1:'复习课'
			},
			checkStatus:{
				0:'通过',
				1:'拒绝',
				2:'待审批',
				3:'审批中'
			},
			publishStatus:{
				0:'启用',
				1:'停用'
				
			}
		},
		
		getSeriesName:function(series){
			if(series!=null){
				return series.name;
			}else{
				return "";
			}
		},
		topicNames:function(topics){
			if(topics!=null){
				var topicNames="";
				for(var i=0;i<topics.size;i++){
					var topic=topics[i];
					topicNames+=topic.name+",";
				}
				return topicNames.substring(0, topicNames.lastIndexOf(","));
			}else{
				return "";
			}
		},
		src : function(src){
			return util.dict.src[src];
		},
		phase : function(phase){
			if(phase!=null){
				return util.dict.phase[phase];
			}else{
				return "";
			}
		},
		commentScore : function(score){
			var scoreInt = parseInt(score);
			var html='';
			for(var i=1;i<=5;i++){
				if(i<=scoreInt)
					html+='<em class="limit"></em>';
				else{
					html+='<em></em>';
				}
			}
			return html;
		},
		dialog : {
			messageDialog : function(message){
				art.dialog({
					lock:true,
					width:240,
					height:120,
			        id : 'msg_dialog',
			        title : '信息',
			        content : message,
			        okValue : '确认',
			        ok : function() {
			        },
			        init: function() {
                        $("a.aui_close").remove();
                    },
                    esc: false
			    });
			},
			messageAndRelocation : function(message,url){
				art.dialog({
					lock:true,
					width:240,
					height:120,
			        id : 'msg_dialog',
			        title : '信息',
			        content : message,
			        okValue : '确认',
			        ok : function() {
			        	window.location.href = url;
			        },
			        init: function() {
                        $("a.aui_close").remove();
                    },
                    esc: false
			    });
			},
			errorDialog : function(message){
				if(!message)
					message = '操作不成功';
				art.dialog({
					lock:true,
					width:240,
					height:120,
			        id : 'msg_dialog',
			        title : '信息',
			        content : message,
			        okValue : '确认',
			        ok : function() {},
			        cancelValue : '取消',
			        cancel : function() {}
			    });
			},
			defaultDialog : function(content,successCallback,cancelCallback,title){
				if(!title)
					title = "信息";
				if(!successCallback){
					successCallback = function(){};
				}
				if(!cancelCallback){
					cancelCallback = function(){};
				}
				art.dialog({
					lock:true,
	     			width:300,
	     			height:120,
	     	        id : 'default_dialog',
	     	        title : title,
	     	        content : content,
	     	        okValue : '确认',
	     	        ok : successCallback,
	     	        cancelValue : '取消',
	     	        cancel : cancelCallback
				});
			},
			infoDialog : function(message){//只有确定按钮的弹窗
				if(!message)
					message = '操作不成功';
				art.dialog({
					lock:true,
					width:240,
					height:120,
			        id : 'msg_dialog',
			        title : '信息',
			        content : message,
			        okValue : '确认',
			        ok : function() {}
			    });
			},
			timerTipsDialog : function(time,content,successCallback,cancelCallback,title){
				if(!title)
	                title = "信息";
	            art.dialog({
	                width:200,
	                height:100,
	                id : 'timer_dialog',
	                title : title,
	                content : content,
	                time:time,
	                okValue : '确认',
	                ok : successCallback,
	                cancelValue : '取消',
	                cancel : cancelCallback
	            });
			},
	        timerTipsDialogWithId : function(id,time,content,successCallback,cancelCallback,title){
	            if(!title)
	                title = "信息";
	            art.dialog({
	                width:200,
	                height:100,
	                id : id,
	                title : title,
	                content : content,
	                time:time,
	                okValue : '确认',
	                ok : successCallback,
	                cancelValue : '取消',
	                cancel : cancelCallback
	            });
	        },
            lockDialog : function(message){
                if(!message)
                    message = '禁止操作';
                art.dialog({
                    lock:true,
                    width:340,
                    height:120,
                    id : 'lock_dialog',
                    title : '提示',
                    content : message,
                    init: function() {
                        $("a.aui_close").remove();
                    },
                    esc: false
                });
            }
		},
		getTail : function(fileName) {
			var strArr = fileName.split('.');
			var length = strArr.length;
			if(length>1){}
			return strArr[length-1];
		},
		getFormatParent:function(suffix){
			var name = latte.fileType[suffix.toUpperCase()];
			
			return name;
		},
		getFormatParentBySuffix:function(suffix){
		},
		getFormatChinese:function(code){
			return latte.formatParent[code];
		},
		getPaperType:function(code){
			return latte.paperType[code];
		},
		appFormatSearch:function(code){
			if(code!=-1){
				return latte.appFormat[code];
			}else{
				return "-1";
			}
		},
		audienceCode:function(code){
			return latte.audience[code];
		},
		getResourceType : function (code){
			return latte.resourceType[code];
		},
		formatDate:function(submitTime){
			if(submitTime!=null){
				var time=submitTime.time;
				if(time!=null){
					return util.date.format(time);
				}else{
					return "";
				}
			}else{
				return "";
			}
			
		},
		formatTime:function(submitTime){
			if(submitTime!=null){
				var time=submitTime.time;
				if(time!=null){
					return util.date.getDate(time);
				}else{
					return "";
				}
			}else{
				return "";
			}
			
		},
		getCheckStatus:function(code){
			return util.dict.checkStatus[code];
		},
		getPublishStatus:function(code){
			return util.dict.publishStatus[code];
		},
		formatIndex : function(index){
			return parseInt(index) + 1;
		},
		isEmptyObject : function(obj){
		 
			    for(var key in obj){
			        return false;//
			    }
			    return true;
			 
		},
		getNfsUrl : function(){
			return nfs_url;
		}, 
		fileSizeFormat:function(fileS){  
			 var fileSizeString = "";
		       if (fileS < 1024) {
		           fileSizeString = fileS+" B";
		       } else if (fileS < 1048576) {
		           fileSizeString = new Number(fileS / 1024).toFixed(1)  + " KB";
		       } else if (fileS < 1073741824) {
		           fileSizeString =  new Number(fileS / 1048576).toFixed(1) + " MB";
		       } else {
		           fileSizeString =  new Number(fileS/ 1073741824).toFixed(1) +" GB";
		       }
		       return fileSizeString;
		},
		escapeCode : function(code){
			return code.replace(/[^0-9a-zA-Z\u4E00-\u9FA5\\(\s*)|(\s*$)]/g, '');
		},
		escapeSpace : function(code){
			return code.replace(/\s+/g,'');
		},
		jsonp : {}
	};

	/** 修改juicer的默认配置 */
	juicer.set({
	    'tag::interpolateOpen' : '?{',
	    'tag::noneencodeOpen' : '??{'
	});
	juicer.register('formatscore',util.commentScore);
	juicer.register('srcCode',util.src);
	juicer.register('getSeriesName',util.getSeriesName);
	juicer.register('topicNames',util.topicNames);
	juicer.register('phaseCode',util.phase);
	juicer.register('getFormat',util.getFormatParentBySuffix);
	juicer.register('timeFormat',util.formatDate);
	juicer.register('fileTypeChinese',util.getFormatChinese);
	juicer.register('getCheckStatus',util.getCheckStatus);
	juicer.register('audienceCode',util.audienceCode);
	juicer.register('getResourceType',util.getResourceType);
	juicer.register('getPublishStatus',util.getPublishStatus);
	juicer.register('getPaperType',util.getPaperType);
	juicer.register('dateFormat',util.date.format);
	juicer.register('getDate',util.formatTime);
	juicer.register('fileSizeFormat',util.fileSizeFormat);