<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<div class="feedback">
    <div class="feedback-top">
        <a href="#" title="回到顶部"></a>
    </div>
</div>

<div class="footer">
  <p>新东方教育科技集团旗下成员公司 全国客服专线：<em>400-676-2300</em> 上海客服专线：021-65017211 购卡咨询(上海)：021-65026384</p>
  <p>Copyright &copy; 2000-2012 koolearn.com Inc. All rights reserved. 新东方在线 版权所有 </p>
  <p>京ICP证050421号京ICP备05067669号京公安备110-1081940 网络视听许可证0110531号</p>
</div>

<script type="text/javascript">
//当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
$(document).ready(function(){
	$(window).scroll(function(){
		if ($(window).scrollTop()>100){
		 $('.feedback-top').show();
		 }
		 else
		 {
		  $('.feedback-top').hide();
		 }
	});
});

</script>