
$(window).on('resize',windowResize);
$('.container').on('click',function(){
	$('.share-popup').css('display','none');
	if($(this).hasClass('animate-prepare')){
		hideEffect();
	}
});

$('#barBtn').on('click',function(e){
	e.stopPropagation();
	e.preventDefault();
	$('.share-popup').css('display','none');
	if(!$('.container').hasClass('animate-prepare')){
		$('.container').addClass('animate-prepare');
	}
	if(!$('.header').hasClass('open-menu')){
		$('body').css('overflow','hidden');
		$('.header').addClass('open-menu');
		$('.main').addClass('push');
	} else {
		hideEffect();
	}
});

function hideEffect(){
	$('body').css('overflow','');
	$('.header').removeClass('open-menu');
	$('.main').removeClass('push');
	setTimeout(function() {
		$('.container').removeClass('animate-prepare');
	}, 550);
}

function windowResize(){
	if($(window).width()>960 && $('.container').hasClass('animate-prepare')){
		hideEffect();
	}
	var mainW=$('.main').width();
	$('.post-banner').css('backgroundSize',(94000/mainW)+'%');
}
windowResize();