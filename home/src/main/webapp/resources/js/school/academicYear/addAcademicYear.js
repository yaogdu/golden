$(document).ready(function(){
	var myDate = new Date();
	var year = myDate.getFullYear();
	
	var clip = "<option selected=\"selected\" value=\"\">请选择</option>" +
				"<option value=\"#1#\">#1#</option>" +
				"<option value=\"#2#\">#2#</option>" +
				"<option value=\"#3#\">#3#</option>" +
				"<option value=\"#4#\">#4#</option>" +
				"<option value=\"#5#\">#5#</option>" +
				"<option value=\"#6#\">#6#</option>" +
				"<option value=\"#7#\">#7#</option>" +
				"<option value=\"#8#\">#8#</option>";
	clip = clip.replace(/\#1#/g,(year - 5) + " - " + (year - 4))
				.replace(/\#2#/g,(year - 4) + " - " + (year - 3))
				.replace(/\#3#/g,(year - 3) + " - " + (year - 2))
				.replace(/\#4#/g,(year - 2) + " - " + (year - 1))
				.replace(/\#5#/g,(year - 1) + " - " + year)
				.replace(/\#6#/g, year + " - " + (year + 1))
				.replace(/\#7#/g,(year + 1) + " - " + (year + 2))
				.replace(/\#8#/g,(year + 2) + " - " + (year + 3));
	$("#year").html(clip);
	$("#startTime").datepicker({format:"yyyy-mm-dd"});
	$("#endTime").datepicker({format:"yyyy-mm-dd"});
	
	$("#hd_menu_system").attr("class","current");
	$("#lmenu_1").attr("class","current");
	
});

function checkYear()
{
	var yearVal = $("#year").val();
	if( yearVal == null || yearVal == '' )
	{
		return;
	}
	
	var url = $("#context").val() + "/school/ay/checkByYear";
	
	var data = {
		academicYear: yearVal
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				return true;
			}
			else
			{
				util.dialog.messageDialog('该学年已设置完毕');
				return false;
			}
		}
	});
	
}

function checkByYearAndTerm()
{
	var yearVal = $("#year").val();
	if( yearVal == null || yearVal == '' )
	{
		return;
	}
	
	var termVal = $("#term").val();
	if( termVal == null || termVal == '' )
	{
		return;
	}
	
	var url = $("#context").val() + "/school/ay/checkByYearAndTerm";
	
	var data = {
		academicYear: yearVal,
		term: termVal
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				return true;
			}
			else
			{
				util.dialog.messageDialog('该学年的这个学期已设置完毕');
				return false;
			}
		}
	});
}

function add()
{
	var yearVal = $("#year").val();
	if( yearVal == null || yearVal == '' )
	{
		util.dialog.messageDialog('学年不可为空');
		return;
	}
	
	var termVal = $("#term").val();
	if( termVal == null || termVal == '' )
	{
		util.dialog.messageDialog('学期不可为空');
		return;
	}
	
	var startTimeVal = $("#startTime").val();
	if( startTimeVal == null || startTimeVal == '' )
	{
		util.dialog.messageDialog('开始时间未设置');
		return;
	}
	if( !isDate(startTimeVal) )
	{
		util.dialog.messageDialog('开始时间格式不正确');
		return;
	}
	
	var endTimeVal = $("#endTime").val();
	if( endTimeVal == null || endTimeVal == '' )
	{
		util.dialog.messageDialog('结束时间未设置');
		return;
	}
	if( !isDate(endTimeVal) )
	{
		util.dialog.messageDialog('结束时间格式不正确');
		return;
	}
	
	var startTime = new Date(startTimeVal);
	var endTime = new Date(endTimeVal);
	
	var diff = ( endTime - startTime ) / (1000 * 60 * 60 * 24);
	
	if( diff < 120 || diff > 180 )
	{
		util.dialog.messageDialog('120 < 结束时间 - 开始时间 < 180');
		return;
	}
	
	var timeVal = parseInt(yearVal.substring(0,4));
	if( "上学期" == termVal )
	{
		if( startTime.getFullYear() != timeVal )
		{
			util.dialog.messageDialog('开始时间与学年学期不匹配');
			return;
		}
		if( endTime.getFullYear() != timeVal + 1 )
		{
			util.dialog.messageDialog('开始时间与学年学期不匹配');
			return;
		}
	}
	
	if( "下学期" == termVal )
	{
		if( startTime.getFullYear() != timeVal + 1 )
		{
			util.dialog.messageDialog('开始时间与学年不匹配');
			return;
		}
		if( endTime.getFullYear() != timeVal + 1 )
		{
			util.dialog.messageDialog('开始时间与学年不匹配');
			return;
		}
	}
	
	var url = $("#context").val() + "/school/ay/add";
	
	var data = {
		academicYear: yearVal,
		term: termVal,
		startTime:startTime,
		endTime:endTime
    };
	
	$.ajax({
		url: url,
		type: "post",
		data: JSON.stringify(data),
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
				util.dialog.messageDialog('保存成功');
				return true;
			}
			else
			{
				util.dialog.messageDialog(data.message);
				return false;
			}
		},
		error: function(XMLHttpRequest, textStatus){
			util.dialog.messageDialog("请求异常：" + XMLHttpRequest.statusText + "|" 
					+ XMLHttpRequest.status + "。请稍后重试或者联系技术支持。");
			return false;
		}
	});
}

function cancel()
{
	art.dialog({
		lock: true,
	    opacity: 0.5,	// 透明度
		width:240,
		height:120,
		top : 200,
        id : "cancel_dialog",
        title : '确认取消',
        content : '<div>确定取消此次操作？</div>',
        okValue : '确定',
        ok : function() {
        	var url = $("#context").val() + "/school/ay/toListPage";
        	window.location.href = url;
        },
        cancelValue : '返回',
        cancel : function() {
        },
        init: function() {
            $("a.aui_close").remove();
        },
        esc: false
    });
}

function isDate(strDate){
	 var   strSeparator = "-";   //日期分隔符 
	 var   strDateArray; 
	 var   intYear; 
	 var   intMonth; 
	 var   intDay; 
	 var   boolLeapYear; 
	 //var strDate=form1.a.value   //表单中的日期值
	 strDateArray = strDate.split(strSeparator); 
	 
	 //判断是否为年、月、日三段
	 if(strDateArray.length!=3){return   false;}
	 
	 //设置为10进制
	 intYear  =  parseInt(strDateArray[0],10); 
	 intMonth  =  parseInt(strDateArray[1],10); 
	 intDay   =   parseInt(strDateArray[2],10); 
	 
	 //判断年、月、日是否为数字
	 if(isNaN(intYear)||isNaN(intMonth)||isNaN(intDay)){return   false;}
	 
	 //判断月份大小是否为1到12
	 if(intMonth>12||intMonth<1){return   false;}
	 
	 //判断1 3 5 7 8 10 12月是否为1到31天
	 if((intMonth==1||intMonth==3||intMonth==5||intMonth==7||intMonth==8||intMonth==10||intMonth==12)&&(intDay>31||intDay<1)){return   false;}
	 
	 //判断4 6 9 11月是否为1到30天
	 if((intMonth==4||intMonth==6||intMonth==9||intMonth==11)&&(intDay>30||intDay<1)){return   false;}
	 
	 //判断2月是否为1到28或29天
	 if(intMonth==2){ 
	  if(intDay<1){return   false;}
	  boolLeapYear   =   false; 
	  if((intYear%4==0 && intYear %100!=0)||(intYear %400==0)){boolLeapYear=true;} 
	  if(boolLeapYear){ 
	   if(intDay>29){return   false;}
	  } 
	  else{ 
	   if(intDay>28){return   false;}
	  } 
	 }
	 //正确返回
	 return   true; 
}

