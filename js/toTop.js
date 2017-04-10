// 滚动到顶部或底部
$('.to-top').on('click',function(){
	window.scrollTo(0,0);
});

$('.to-bottom').on('click',function(){
	window.scrollTo(0,$(document).height() - $(window).height());
});

function setScrollTop(){
	var st = $(window).scrollTop(),
		dt = $(document).height(),
		wh = $(window).height(),
		toTop=$('.to-top'),
		toBottom=$('.to-bottom');

	if(st>500){
		if(toTop.hasClass('hide')){
			toTop.removeClass('hide').addClass('show');
		}
	} else {
		if(toTop.hasClass('show')){
			toTop.removeClass('show').addClass('hide');
		}
	}

	if(dt-wh-st>500){
		if(toBottom.hasClass('hide')){
			toBottom.removeClass('hide').addClass('show');
		}
	} else {
		if(toBottom.hasClass('show')){
			toBottom.removeClass('show').addClass('hide');
		}
	}
	return false;
}

scrollEventCtr(setScrollTop);