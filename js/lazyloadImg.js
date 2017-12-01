// 图片延时加载
var Imgs=$('.img-placeholder');
function lazyLoadImg(){
	setTimeout(function() {
		var st=$(window).scrollTop(),
			wh=$(window).height();
		for(var i=0;i<Imgs.length;i++){
			var item=$(Imgs[i]);
			var ot=item.offset().top;
			var src=item.attr('src');
			
			if(st+wh>ot&&st<ot){
				item.replaceWith('<img src="'+src+'" width="100%" height="100%">');
				Imgs.splice(i--,1);
			}
		}
	}, 500);
	return false;
}

if(Imgs.length){
	scrollEventCtr(lazyLoadImg);
}
