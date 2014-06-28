$(document).ready(function(){
	$("#parent_up_1").attr("class","first");
	$("#parent_up_1").bind("click", doNothing);
	$("#parent_down_1").attr("class","last");
	$("#parent_down_1").bind("click", doNothing);
	$("#parent_delete_1").attr("class","del");
	$("#parent_delete_1").bind("click", {id: "parent_1"}, deleteParentHandler);
	$("#newCategory").bind("click", addParent);
	$("#saveCategories").bind("click", save);
});

var parentClip = "<tr id=\"parent_#replacement#\">" +
					"<td><input type=\"text\" class=\"infoText\" maxlength=\"30\" id=\"parent_input_#replacement#\"/></td>" +
					"<td><a class=\"first\" href=\"javascript:void(0);\" id=\"parent_up_#replacement#\"></a></td>" +
					"<td><a class=\"down\" href=\"javascript:void(0);\" id=\"parent_down_#replacement#\"></a></td>" +
					"<td><a class=\"del\" href=\"javascript:void(0);\" id=\"parent_delete_#replacement#\"></a></td>" +
				"</tr>";


function addChildHandler(e)
{
	var parentId = e.data.id;
	addChild(parentId);
}

function addParent()
{
	var maxParentIndex = 0;
	$("tr[id^='parent_']").each(function(){
		var parentId = $(this).attr("id");
		var pid = parentId.substring(7,parentId.length);
		if( parseInt(pid) > maxParentIndex )
		{
			maxParentIndex = parseInt(pid);
		}
	});
	var target;
	var replacement = maxParentIndex + 1;
	
	if( $("tr[id^='parent_']").size() == 0 )
	{
		target = $("#flagtr");
	}
	else
	{
		target = $("tr[id^='parent_']").last();
	}
	target.after(parentClip.replace(/\#replacement#/g,replacement).replace(/\#context#/g, $("#context").val()));
	$("#parent_up_" + replacement).bind("click", {id: "parent_" + replacement}, upParentHandler);
	$("#parent_down_" + replacement).bind("click", {id: "parent_" + replacement}, downParantHandler);
	$("#parent_delete_" + replacement).bind("click", {id: "parent_" + replacement}, deleteParentHandler);
	refreshParentImg();
}

function upParent(parentId)
{
	var target = $("#" + parentId);
	$("tr[id^='parent_']").each(function(){
		var tempId = $(this).attr("id");
		if( tempId != parentId )
		{
			target = $(this);
		}
		else
		{
			return false;
		}
	});
	$("#" + parentId).insertBefore(target);
	
	refreshParentImg();
	
}

function upParentHandler(e)
{
	var parentId = e.data.id;
	upParent(parentId);
}

function downParant(parentId)
{
	var target = $("#" + parentId + " ~ tr[id^='parent_']").first();
	$("#" + parentId).insertAfter(target);
//	target = $("#" + parentId);
//	var pid = parentId.substring(7,parentId.length);
//	$("tr[id^='child_" + pid + "_']").each(function(){
//		$(this).insertAfter(target);
//		target = $(this);
//	});
	refreshParentImg();
}

function downParantHandler(e)
{
	var parentId = e.data.id;
	downParant(parentId);
}

function deleteParent(parentId)
{
	$("#" + parentId).remove();
	refreshParentImg();
}

function deleteParentHandler(e)
{
	var parentId = e.data.id;
	deleteParent(parentId);
}

function save()
{
	var flag = true;
	$("input[id^='parent_input_']").each(function(){
		var val = $(this).val();
		if( val == null || val == '' )
		{
//			alert("请将所有分类名称填写完全");
			flag = false;
			return false;
		}
	});
	
	if( !flag )
	{
		util.dialog.messageDialog('请将所有分类名称填写完全');
		return;
	}
	
	var itemsData = "[";
	var parents = $("input[id^='parent_input_']");
	var sequence = 1;
	parents.each(function(index){
		var parentData = {"name":$(this).val(),"seq":sequence++,"category":1};
		itemsData += JSON.stringify(parentData) + ",";
	});
	if( parents.size() >= 1 )
	{
		itemsData = itemsData.substring(0, itemsData.length - 1) + "]";
	}
	else
	{
		itemsData += "]";
	}
	
	
	var url = $("#context").val() + "/teacher/resourceManagement/add";
	
	$.ajax({
		url: url,
		type: "post",
		data: itemsData,
		dataType: "json",
		contentType: 'application/json;charset=UTF-8',
		success: function(data){
			if( data.result == true )
			{
//				util.dialog.messageDialog('保存成功');
				art.dialog({
					lock: true,
				    opacity: 0.5,	// 透明度
					width:240,
					height:120,
					top : 200,
					content : '<div>保存成功</div>',
			        okValue : '确认',
			        ok : function() {
			        	parent.window.location.href = parent.window.location.href;
			        	parent.art.dialog.list['resourceManagement_dialog'].close();
			        }
			    });
				return true;
			}
			else
			{
				util.dialog.messageDialog('保存失败');
				return false;
			}
		}
	});
}

function doNothing()
{
}

function refreshParentImg()
{
	var parents = $("tr[id^='parent_']");
	if( parents.size() == 0 )
	{
		return;
	}
	
	parents.each(function(){
		var parentId = $(this).attr("id");
		var pid = parentId.substring(7,parentId.length);
		var upLink = $("#parent_up_" + pid);
		upLink.unbind();
		upLink.bind("click",{id: parentId},upParentHandler);
		upLink.attr("class","up");
		var downLink = $("#parent_down_" + pid);;
		downLink.unbind();
		downLink.bind("click",{id: parentId},downParantHandler);
		downLink.attr("class","down");
	});
	
	var upDisable;
	var downDisable;
	upDisable = parents.first().find("a[id^='parent_up_']");
	upDisable.unbind();
	upDisable.attr("class","first");
		
	downDisable = parents.last().find("a[id^='parent_down_']");
	downDisable.unbind();
	downDisable.attr("class","last");
	
}

function cutstr(str,len) 
{ 
    var str_length = 0; 
    var str_len = 0; 
    str_cut = new String(); 
    str_len = str.length; 
    for(var i = 0; i < str_len; i++) 
    { 
        a = str.charAt(i); 
        str_length++; 
        if(escape(a).length > 4) 
        { 
            //中文字符的长度经编码之后大于4 
            str_length++; 
        } 
        str_cut = str_cut.concat(a); 
        if(str_length>=len) 
        { 
            str_cut = str_cut.concat("..."); 
            return str_cut; 
        } 
    } 
    //如果给定字符串小于指定长度，则返回源字符串； 
    if(str_length < len){ 
        return  str; 
    } 
}

function cancel()
{
	parent.art.dialog.list['resourceManagement_dialog'].close();
}
