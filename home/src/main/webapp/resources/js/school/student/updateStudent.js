 $(document).ready(function(){
		    	$("#startTime").datepicker({format:"yyyy-mm-dd"});
		    	$("#start_click").click(function() {
		    		$("#startTime").focus();
		    	});
		    	$("#Ssubmit").click(function() {
		    		var  loginName = $("#login_name").val();
		    		
		    		if (loginName != null && loginName.length != 0) {
		    			if (loginName.length > 32) {
			    			util.dialog.messageDialog("登录名长度不能超过32个字符!");
			    			return;
			    		}
		    			
		    			if (loginName.match(/^[\u4E00-\u9FA3]{1,}$/)) {
		    			    util.dialog.messageDialog("登录名不允许存在汉字!");
		    			    return;
		    			}
		    			
		    			if (!loginName.match(/^[0-9a-zA-Z]+$/)) {
			    			util.dialog.messageDialog("登录名只能包含字母或数字!");
			    			return;
			    		}
		    		}
		    		
		            var date = $("#startTime").val();
		            if (date == null || date.length == 0) {
		            	util.dialog.messageDialog("日期不允许为空!");
		            	return;
		            }
		            
		            var name = $("#name").val();
		            
		            if (name == null || name.length == 0) {
		            	util.dialog.messageDialog("姓名不能为空!");
		            	return;
		            }
		            
		            if (name.length > 32) {
		            	util.dialog.messageDialog("姓名长度不能超过32个字符!");
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
		            
		            var tel = $("#tel").val();
		            if (tel != null && tel.length != 0 && tel.length != 11 && !tel.match(/^\d{11}$/)) {
		            	util.dialog.messageDialog("手机号码格式不符合!");
		            	return;
		            }
		            
		            var email = $("#email").val();
		            if (email != null && email.length != 0 && !email.match(/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/)) {
		            	util.dialog.messageDialog("邮箱格式不符合!");
		            	return;
		            }
		    	    var data = $("#Form").serialize();
		    		$.ajax({
		                cache: true,
		                type: "POST",
		                url: ctx + "/school/student/update?system_id=" + $("#system_id").text(),
		                data:$('#Form').serialize(),
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
		            });
				});
		    });