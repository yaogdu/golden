var  postData = {stage : '', grade : '', klass : '', enter_time : '', fileName : ''};

latte.school.student = {
	init : function(){
		latte.school.student.initUploader();
	},
	initUploader : function() {// 初始化文件上传控件
		plupload.addI18n({
	        'File extension error.' : '文件类型错误',
	        'File size error.' : '文件大小超出限制'
	    });
		latte.school.student.fileUploader = new plupload.Uploader({
			runtimes : 'html5,flash',
			browse_button : 'file', // 选择文件按钮ID
			max_file_size : '100mb', // 文件上传最大值
			chunks : false,// 不分块上传
			unique_names : true, // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
			url : ctx + "/school/student/addBatch",
			flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf文件所在路径
			multi_selection : false,
			filters: [
			     {title: "允许文件类型", extensions: 'xls,xlsx'}
	        ],
			init : {
				FileUploaded : function(up, file, info) {
					var data = eval('(' + info.response + ')');
					if (data.result == "failed") {
						util.dialog.messageDialog(data.message);
						return;
					} else {
						util.dialog.messageDialog(data.message);
						return;
					}
				},
				FilesAdded : function(up, file) {
					$.each(up.files, function (i, file) {
						if (up.files.length <= 1) {
				            return;
				        }
				        up.removeFile(file);
					});
					
					$('#file_name').val(file[0].name);
					postData.fileName = file[0].name;
				},
				BeforeUpload : function(up, file) {
					latte.school.student.fileUploader.disableBrowse(true);
					$('#Bsubmit').css('disabled', 'disabled');// 禁用保存按钮
				},
				UploadProgress : function(up, file) {
					//$('#clip_file .barBg').css('width', file.percent + '%');
				},
				Error : function(up, err) {
					latte.school.student.fileUploader.disableBrowse(false);
					up.refresh(); // Reposition Flash/Silverlight
					util.dialog.errorDialog(err.message);
				}
			}
		});
		latte.school.student.fileUploader.init();
	},
};

$(document).ready(function(){		
	$("#startTime").datepicker({format:"yyyy-mm-dd"});
    $("#endTime").datepicker({format:"yyyy-mm-dd"});
    
	$("#hd_menu_student").attr("class","current");
	$("#lmenu_1").attr("class","current");
	
    $("#singleAdd").css("background-color", "#FEB04B");
    $("#singleTab").addClass("current");
	$("#single").show();
	$("#batch").hide();
	$("#batchAdd").css("background-color", "#E8E8E8");
	
	$("#singleAdd").click(function(){
		$("#singleTab").addClass("current");
		$("#batchTab").removeClass("current");
		$("#single").show();
		$("#batch").hide();
		$("#singleAdd").css("background-color", "#FEB04B");
		$("#batchAdd").css("background-color", "#E8E8E8");
	});
	
	$("#batchAdd").click(function(){
		latte.school.student.init();
		$("#singleTab").removeClass("current");
		$("#batchTab").addClass("current");
		$("#single").hide();
		$("#batch").show();
		$("#singleAdd").css("background-color", "#E8E8E8");
		$("#batchAdd").css("background-color", "#FEB04B");
	});
	
	$("#startTrigger").click(function() {
		$("#startTime").focus();
	});
	
	$("#endTrigger").click(function() {
		$("#endTime").focus();
	});
	
	$("#Sreset").click(function() {
		window.location.reload()
	});
	
	$("#Breset").click(function() {
		window.location.reload();
	})
	
	$("#tel").blur(function(){
	    var tel = $("#tel").val();
	    if (tel != null && tel.length != 0) {
	        $.ajax({
	    	   type: "POST",
    		   url: ctx + "/school/student/telCheck?tel=" + tel,
    	       success: function(data, textStatus) {
    	    	   if (data.result == "NO") {
    	    		  util.dialog.messageDialog("已存在该号码,请重新填写");
    	    	   }
    	        }
	       });
	    }
	});
	
	$("#email").blur(function() {
		var email = $("#email").val();
		if (email != null && email.length != 0) {
		    $.ajax({
		        type: "POST",
			    url: ctx + "/school/student/emailCheck?email=" + email,
	            success: function(data, textStatus) {
	    	        if (data.result == "NO") {
	    		        util.dialog.messageDialog("已存在该邮箱地址,请重新填写");
	    	        }
	             }
	         });
		}
	});
	
	
	$("#Sstage").change(function(){
		  var stage = $("#Sstage").val();
	      if (stage == "请选择") {
	    	  $("#Sgrade").empty().append("<option>请选择</option>");
	    	  $("#Sclass").empty().append("<option>请选择</option>");
	    	  return;
	      }
	      stage = encodeURI(encodeURI(stage));
		  $.ajax({
		    	type: "POST",
		    	url: ctx + "/school/student/metaData?school_id=1&stage=" + stage,
		        success: function(data, textStatus) {
		            $("#Sgrade").empty();
		            $("#Sgrade").append("<option>请选择</option>");
		            for (i = 0; i < data.grades.length; ++i) {
		            	$("#Sgrade").append("<option>" + data.grades[i].gradeName + "</option>");
		             }
		            $("#Sclass").empty();
		            $("#Sclass").append("<option>请选择</option>");
		            for (i = 0; i < data.klasses.length; ++i) {
		            	$("#Sclass").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
		            }   
		        }
		    });
	});
	
	$("#Bstage").change(function(){
		  var stage = $("#Bstage").val();
		   if (stage == "请选择") {
			   $("#Bgrade").empty().append("<option>请选择</option>");
			   $("#Bclass").empty().append("<option>请选择</option>");
			   return;
		   }
		   stage = encodeURI(encodeURI(stage));
		    $.ajax({
		    	type: "POST",
		    	url: ctx + "/school/student/metaData?school_id=1&stage=" + stage,
		        success: function(data, textStatus) {
		            $("#Bgrade").empty();
		            $("#Bgrade").append("<option>请选择</option>");
		        	var str = "";
		            for (i = 0; i < data.grades.length; ++i) {
		            	$("#Bgrade").append("<option>" + data.grades[i].gradeName + "</option>");
		             }
		            $("#Bclass").empty();
		            $("#Bclass").append("<option>请选择</option>");
		            for (i = 0; i < data.klasses.length; ++i) {
		            	$("#Bclass").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
		            }
		        }
		    });
	});
	
	$("#Sgrade").change(function() {
		var stage = $("#Sstage").val();
		var grade = $("#Sgrade").val();
		if (grade == "请选择") {
			$("#Sclass").empty().append("<option>请选择</option>");
			return;
		}
		stage = encodeURI(encodeURI(stage));
		grade = encodeURI(encodeURI(grade));
		$.ajax({
	    	type: "POST",
	    	url: ctx + "/school/student/metaData?school_id=1&stage=" + stage + "&grade=" + grade,
	        success: function(data, textStatus) {
	            $("#Sclass").empty();
	            $("#Sclass").append("<option>请选择</option>");
	            for (i = 0; i < data.klasses.length; ++i) {
	            	$("#Sclass").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
	            }
	        }
	    });
	});
	
	$("#Bgrade").change(function() {
		var stage = $("#Bstage").val();
		var grade = $("#Bgrade").val();
		if (grade == "请选择") {
			$("#Bclass").empty().append("<option>请选择</option>");
			return;
		}
		stage = encodeURI(encodeURI(stage));
	    grade = encodeURI(encodeURI(grade));
		$.ajax({
	    	type: "POST",
	    	url: ctx + "/school/student/metaData?school_id=1&stage=" + stage + "&grade=" + grade,
	        success: function(data, textStatus) {
	            $("#Bclass").empty();
	            $("#Bclass").append("<option>请选择</option>");
	            for (i = 0; i < data.klasses.length; ++i) {
	            	$("#Bclass").append("<option value='"+ data.klasses[i].classNumber + "'>" + data.klasses[i].classNumber + "班</option>");
	            }
	        }
	    });
	});
	
	$("#Ssubmit").click(function() {
		var stage = $("#Sstage").val();
		var grade = $("#Sgrade").val();
		var klass = $("#Sclass").val();
		if (stage == "请选择") {
			util.dialog.messageDialog("请选择学段!");
			return;
		}
		
		if (grade == "请选择") {
			util.dialog.messageDialog("请选择年级!");
			return;
		}
		
		if (klass == "请选择") {
			util.dialog.messageDialog("请选择班级");
			return;
		}
		
		var date = $("#startTime").val();
		if (date == null || date.length == 0) {
			util.dialog.messageDialog("请填入日期!");
		}
		
		var  name = $("#name").val();
		if (name == null || name.length == 0) {
			util.dialog.messageDialog("姓名不能为空!");
			return;
		}
		
		if (name.length > 32) {
			util.dialog.messageDialog("姓名长度不能超过32个字!");
			return;
		}
		
		var schoolNumber = $("#school_number").val();
		if (schoolNumber != null && schoolNumber.length !=0) {
		    if (schoolNumber.length > 32) {
		    	util.dialog.messageDialog("学号长度不超过32个字符!");
		    	return;
		    }	
		    if (!schoolNumber.match(/\d+/)) {
			    util.dialog.messageDialog("学号只能为数字!");
			    return;
		    }
		}
		
//		var  gender = $("#gender").val();
//		if (gender == 0) {
//			util.dialog.messageDialog("请选择性别!");
//		}
		
		var  tel = $("#tel").val();
		if (tel != null && tel.length != 0 && !tel.match(/\d{11}/)) {
			util.dialog.messageDialog("手机号码格式不正确!");
			return;
		}
		var  email = $("#email").val();
		if (email != null && email.length != 0 
		&& (email.length > 128 || !email.match(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/))) {
			util.dialog.messageDialog("邮箱地址格式不正确!");
			return;
		}
		
		$.ajax({
            cache: true,
            type: "POST",
            url: ctx + "/school/student/add",
            data:$('#Sform').serialize(),
            async: false,
            success: function(data) {
                if (data.result == 'succeed') {
                	util.dialog.messageDialog(data.message);
                } else if (data.result == 'failed') {
                	util.dialog.messageDialog(data.message);
                }
            },
            error: function() {
            	 util.dialog.messageDialog("提交失败!");
            }  
        })
	});
	
	$("#Bsubmit").click(function() {
		postData.stage = $("#Bstage").val();
		postData.grade = $("#Bgrade").val();
		postData.klass = $("#Bclass").val();
		
		if (postData.stage == "请选择") {
			util.dialog.messageDialog("请选择学段!");
		    return;
		}
		
		if (postData.grade == "请选择") {
			util.dialog.messageDialog("请选择年级!");
			return;
		}
		
		if (postData.klass == "请选择") {
			util.dialog.messageDialog("请选择班级!");
			return;
		}
		
		postData.enter_time = $("#endTime").val();
		if (postData.enter_time == null || postData.enter_time.length == 0) {
			util.dialog.messageDialog("请填写日期!");
			return;
		}
		latte.school.student.fileUploader.settings.multipart_params = postData;
		latte.school.student.fileUploader.settings.url = ctx + "/school/student/addBatch";// 拼接上传url与param
	    latte.school.student.fileUploader.start();// 上传
		/*
		$("#Bform").ajaxSubmit({
			url : ctx + "/school/student/addBatch",
	        type : "post",
	        dataType : "json",
	        async : false,
	        success : function(data) {
				util.dialog.messageDialog(data.message);
	        }
	    });
	    */
	});
});
			