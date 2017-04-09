var $pay=$('#payMe');
$('#payBtn').on('click',function(){
	var $overlay=$('<div class="popup-overlay"></div>');
	$(document.body).css('overflow','hidden').append($overlay);
	$overlay.on('click',hidePay);
	$pay.show().removeClass('hide').addClass('show');
});

$pay.on('click','input',function(){
	var type=this.id;
	$pay.find('[alt='+type+']').show().siblings().hide();
});
$pay.find('.icon-cancel').on('click',hidePay);

function hidePay(){
	$(document.body).css('overflow','');
	$pay.removeClass('show').addClass('hide');
	setTimeout(function() {
		$pay.hide();
		$('.popup-overlay').remove();
	}, 500);
}