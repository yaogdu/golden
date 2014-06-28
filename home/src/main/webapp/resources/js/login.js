/**
 * liujianbin
 */

function initControl(data){
	for(var c in data){
		var obj = data[c];
		if(obj.inittext){
			$("#" + c).val(obj.inittext);
			//$("#" + c).click(function(){
			$("#" + c).focus(function(){
				var obj1 = data[this.id];
				if($(this).val() == obj1.inittext){
					$(this).val("");
					$(this).css("color", "black");
					if(obj1.ispassword){
						this.type = "password";
					}
				}
			});
			$("#" + c).blur(function(){
				var obj1 = data[this.id];
				if($(this).val() == ""){
					$(this).val(obj1.inittext);
					$(this).css("color", "");
					if(obj1.ispassword){
						this.type = "text";
					}
				}
			});
		}
	}
}

function validateControl(data){
	var cancontinue = true;
	for(var c in data){
		var obj = data[c];
		if(!obj.cannull && $("#" + c).length > 0){
			$("#"+c+"_message").text("");
			if(obj.ischeckbox){
				var ischeck = $("#" + c).attr("checked");
				if(ischeck != true && ischeck != "checked"){
					cancontinue = false;;
					alert("必须同意服务协议才能注册！");
				}
			}
			else{
				var v = $("#" + c).val();
				if(!v || v == obj.inittext){
					$("#"+c+"_message").text(obj.inittext + "不能为空");
					cancontinue = false;;
				}
				if(obj.isemail){
					var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
					 if(!myreg.test(v)){
							$("#"+c+"_message").text(obj.inittext + "格式不合法");
							cancontinue = false;;
					 }
				}
			}
		}
	}
	return cancontinue;
}