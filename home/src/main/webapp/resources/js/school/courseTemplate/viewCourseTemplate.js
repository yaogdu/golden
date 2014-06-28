$(document).ready(function(){
	$("#hd_menu_system").attr("class","current");
	$("#lmenu_3").attr("class","current");
	
	$("li[id^='chapter_']").each(function(){
		var tempId = $(this).attr("id");
		var cid = tempId.substring(8,tempId.length);
		$("li[id^='sectionLeft_" + cid + "_']").each(function(){
			$(this).appendTo($("#lefts_" + cid));
		});
		$("li[id^='sectionRight_" + cid + "_']").each(function(){
			$(this).appendTo($("#rights_" + cid));
		});
		refreshSectionTitles(cid);
	});
	refreshChapterTitles();
	
	$("a[id^='sectionRight_r_']").each(function(){
		var id = $(this).attr("id");
		var sid = id.substring(15,id.length);
		var value = $.trim($("#section_input_value_" + sid).html());
		$.ajax({
			url: $("#context").val() + "/school/data/findSingleRecommend?resourceName=" + encodeURI(encodeURI(value)),
			type: "post",
			dataType: "json",
			contentType: 'application/json;charset=UTF-8',
			success: function(data){
				if( data.result != 0 )
				{
					$("#sectionRight_empty_" + sid).hide();
					$("#sectionRight_show_" + sid).show();
					$("#sectionRight_r_" + sid).html(value);
					$("#sectionRight_r_" + sid).attr("href",data.url);
					return true;
				}
				else
				{
					$("#sectionRight_empty_" + sid).show();
					$("#sectionRight_show_" + sid).hide();
					return false;
				}
			}
		});
	});
	
});

function Chinese(num)  //将阿拉伯数字翻译成中文的大写数字
{
    var AA = new Array("零","一","二","三","四","五","六","七","八","九");
    var BB = new Array("","十","百","千","万","亿","点","");
   
    var a = (""+ num).replace(/(^0*)/g, "").split("."), k = 0, re = "";

    for(var i=a[0].length-1; i>=0; i--)
    {
        switch(k)
        {
            case 0 : re = BB[7] + re; break;
            case 4 : if(!new RegExp("0{4}//d{"+ (a[0].length-i-1) +"}$").test(a[0]))
                     re = BB[4] + re; break;
            case 8 : re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
        }
        if(k%4 == 2 && a[0].charAt(i+2) != 0 && a[0].charAt(i+1) == 0) re = AA[0] + re;
        if(a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k%4] + re; k++;
    }

    if(a.length>1) //加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for(var i=0; i<a[1].length; i++) re += AA[a[1].charAt(i)];
    }
    
    if( re.indexOf("一十") == 0 )
    {
    	re = re.replace("一十","十");
    }
    
    return re;
}


function refreshChapterTitles()
{
	var spans = $("span[id^='chapter_title_']");
	spans.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"章");
	});
	var spans2 = $("span[id^='chapter_title2_']");
	spans2.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"章");
	});
}

function refreshSectionTitles(cid)
{
	var spans = $("span[id^='sectionLeft_title_" + cid + "_']");
	spans.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"节");
	});
	var spans2 = $("span[id^='sectionLeft_title2_" + cid + "_']");
	spans2.each(function(index){
		$(this).html("第" + Chinese(index + 1) +"节");
	});
}



function back()
{
	window.location.href = $("#context").val() + "/school/ct/toListPage";
}
