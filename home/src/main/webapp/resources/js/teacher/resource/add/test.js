latte.teacher.ap = {
	
	init : function() {
		$('#hd_menu_resource').addClass('current');
		$('#lmenu_add').addClass('current');
//		latte.teacher.ap.optionRatternTpl = juicer($('#option-pattern-tpl')
//				.html());
		
		//latte.teacher.ap.initSrc();
		//latte.teacher.ap.initTab();
		latte.teacher.ap.initUploader();
		//latte.teacher.ap.hiddenDetail();
		// $('#btn_select_theme').click(latte.teacher.ap.showThemeSelector);
		// $('#btn_select_special').click(latte.teacher.ap.showSpecialSelector);
		$('#btn_save_ap').click(latte.teacher.ap.commit);
	},
	/* init kings of values */
	 
	
	initUploader : function() {// ��ʼ���ļ��ϴ��ؼ�
		var fileTypeFilters = [];
		for(var type in latte.fileType){
			fileTypeFilters.push(type);
		}
		plupload.addI18n({
			 'File extension error.' : '文件类型错误',
		        'File size error.' : '文件大小超出限制'
	    });
		
		latte.teacher.ap.fileUploader = new plupload.Uploader(
				{
					runtimes : 'html5,flash',
					browse_button : 'file', // ѡ���ļ���ťID
					max_file_size : '100mb', // �ļ��ϴ����ֵ
					chunks : false,// ���ֿ��ϴ�
					unique_names : true, // �ϴ����ļ����Ƿ�Ψһ,ֻ����δ���зֿ��ϴ�ʱ�ļ���Ψһ����Ч
					url : ctx + "/ap/attach",
//					container: $('#'),//document.getElementById('ap_file_name'),
					flash_swf_url : static_ctx + '/js/lib/plupload/plupload.flash.swf',// plupload.flash.swf�ļ�����·��
					multi_selection : true,
					filters: [
							     {title: "允许文件类型", extensions: fileTypeFilters.join(',')}
					        ],
					init : {
						PostInit: function() {
							document.getElementById('filelist').innerHTML = '';

							document.getElementById('uploadfiles').onclick = function() {
								uploader.start();
								return false;
							};
						},

						FilesAdded: function(up, files) {
							plupload.each(files, function(file) {
								document.getElementById('filelist').innerHTML += '<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b></div>';
							});
						},
						
						
						FileUploaded : function(up, file, info) {
							$('#btn_save_ap').css('disabled', '');// ���ñ��水ť
							$('#file a').text('修改');
							latte.teacher.ap.fileUploader.disableBrowse(false);
							var data = eval('(' + info.response + ')');
							if (data.success == false) {
								util.dialog.errorDialog('文件内容不合规范,请重新选择文件上传');
								return;
							} else {
								util.dialog.messageDialog('上传成功');
								return;
							}
						},
//						FilesAdded : function(up, file) { 
//							console.log(up);
//							console.log(file);
////							$('#file a').text('修改');
////							
////							$('#ap_file .search').hide();
////							$('#ap_file .info').show();
////							$('#ap_file_name').append(file[0].name);
//							
//						},
//						BeforeUpload : function(up, file) {
//							latte.teacher.ap.fileUploader.disableBrowse(true);
//							$('#btn_save_ap').css('disabled', 'disabled');// ���ñ��水ť
//						},
						UploadProgress : function(up, file) {
							$('#ap_file .barBg').css('width',
									file.percent + '%');
						},
						Error : function(up, err) {
							latte.teacher.ap.fileUploader.disableBrowse(false);
							up.refresh(); // Reposition Flash/Silverlight
							util.dialog.errorDialog(err.message);
						}
					}
				});
		latte.teacher.ap.fileUploader.init();
	},
	commit : function() {// �ύ
		
		var resource={
			"ownerId":$('#apid').val(),
			"ownerType": 2,
			
		};
		var data = {
			"resource" : JSON.stringify(resource)
		};
		latte.teacher.ap.fileUploader.settings.multipart_params = data;
		latte.teacher.ap.fileUploader.settings.url = ctx + "/ap/attach";// ƴ���ϴ�url��param
		latte.teacher.ap.fileUploader.start();// �ϴ�
	},
	
};