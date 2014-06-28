$(document).ready(function(){
	$("#hd_menu_teacher").attr("class","current");
	$("#lmenu_1").attr("class","current");
	$("#excelShowBar").hide();
	latte.school.teacher.init();
});

var  postData = { fileName : ''};

latte.school.teacher = {
	init : function(){
		latte.school.teacher.initUploader();
	},
	initUploader : function() {// 初始化文件上传控件
		plupload.addI18n({
	        'File extension error.' : '文件类型错误',
	        'File size error.' : '文件大小超出限制'
	    });
		latte.school.teacher.fileUploader = new plupload.Uploader({
			runtimes : 'html5,flash',
			browse_button : 'selectFile', // 选择文件按钮ID
			max_file_size : '100mb', // 文件上传最大值
			chunks : false,// 不分块上传
			unique_names : true, // 上传的文件名是否唯一,只有在未进行分块上传时文件名唯一才有效
			url : $("#context").val() + "/school/teacher/batchAdd",
			flash_swf_url : $("#context").val() + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf文件所在路径
			multi_selection : false,
			filters: [
			     {title: "允许文件类型", extensions: 'xls,xlsx'}
	        ],
			init : {
				FileUploaded : function(up, file, info) {
					var message = jQuery.parseJSON( info.response ).message;
					
					art.dialog({
						lock: true,
					    opacity: 0.5,	// 透明度
						width:240,
						height:120,
						top : 200,
				        id : "message_dialog",
				        title : '导入结果',
				        content : message.replace(/\n/g, "<br/>"),
				        okValue : '确认',
				        ok : function() {
				        	window.location.href = window.location.href;
				        },
				        init: function() {
	                        $("a.aui_close").remove();
	                    },
	                    esc: false
				    });
					
//					util.dialog.messageDialog(jQuery.parseJSON( info.response ).message);
//					$('#excelShowBar').hide();
				},
				FilesAdded : function(up, file) {
					$.each(up.files, function (i, file) {
						if (up.files.length <= 1) {
				            return;
				        }
				        up.removeFile(file);
					});
					
					$('#fileName').val(file[0].name);
					postData.fileName = file[0].name;
				},
				BeforeUpload : function(up, file) {
					$("#excelShowBar").show();
					latte.school.teacher.fileUploader.disableBrowse(true);
//					$('#selectFile').css('disabled', 'disabled');// 禁用保存按钮
//					$('#confirmBtn').css('disabled', 'disabled');// 禁用保存按钮
					
				},
				UploadProgress : function(up, file) {
					$("#excelShowBar").show();
					$(".barBg").css("width", file.percent + '%');
				},
				Error : function(up, err) {
					latte.school.teacher.fileUploader.disableBrowse(false);
					up.refresh(); // Reposition Flash/Silverlight
					util.dialog.errorDialog(err.message);
				}
			}
		});
		latte.school.teacher.fileUploader.init();
	}
};

function batchAdd()
{
	var fileName = $.trim($("#fileName").val());
	if( fileName == null || fileName == '' )
	{
		util.dialog.messageDialog('请选择文件');
		return;
	}
	latte.school.teacher.fileUploader.settings.multipart_params = postData;
	latte.school.teacher.fileUploader.settings.url = $("#context").val() + "/school/teacher/batchAdd";// 拼接上传url与param
    latte.school.teacher.fileUploader.start();// 上传
}

function downloadTemplate()
{
	var url = $("#context").val() + "/static/template/ImportTeachers.xlsx";
	console.log(url);
	$("#fileDownFrame").attr("src",url);
}
