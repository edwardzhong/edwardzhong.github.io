function hidePay(){$(document.body).css("overflow",""),$pay.removeClass("show").addClass("hide"),setTimeout(function(){$pay.hide(),$(".popup-overlay").remove()},500)}var $pay=$("#payMe");$("#payBtn").on("click",function(){var o=$('<div class="popup-overlay"></div>');$(document.body).css("overflow","hidden").append(o),o.on("click",hidePay),$pay.show().removeClass("hide").addClass("show")}),$pay.on("click","input",function(){var o=this.id;$pay.find("[alt="+o+"]").show().siblings().hide()}),$pay.find(".icon-cancel").on("click",hidePay);
function popupSearch(){function t(){l.removeClass("show").addClass("hide"),setTimeout(function(){l.remove(),r.css("overflow",""),o.remove()},500)}function e(){var t=this.className;"num"==t?i=parseInt($(this).html(),10)-1:"prev"==t?i--:"next"==t&&i++,a(c,i,s)}function n(){var t=$.trim($(this).val());if(!t)return c.length=0,i=0,p.empty(),void u.html("没有内容");var e=RegExp(t,"ig"),n=new Date,r=function(t){return t.replace(e,function(t,e,n){return"<em>"+t+"</em>"})};c=[],p.empty(),loadData().done(function(i){i.forEach(function(t,n){var a=[],i=!1,s=!1,o={};$.extend(!0,o,t),t.tags.forEach(function(t,e){a.push(t.name)}),a.length&&(o.tagStr=a.join("@#"),(i=e.test(o.tagStr))&&(o.tagStr=r(o.tagStr))),(s=e.test(t.title))&&(o.titleStr=r(t.title)),(s||i)&&c.push(o)}),c.length?(u.html("找到 <span>"+c.length+"</span> 条相关条目，用了 <span>"+(new Date-n)+"</span> 毫秒"),a(c,0,s)):u.html('未发现与 <span>"'+t+'"</span> 相关的内容')})}function a(t,e,n){n=n||10;var a=[],i=e*n,s=(e+1)*n;t.slice(i,s).forEach(function(t,e){a.push(getResultRow(t))}),p.html(a.join("")),h.html(getPagination(t.length,e,n))}var i=0,s=10,c=[],r=$(document.body),o=$('<div class="popup-overlay"></div>'),l=$('<div class="search-popup show"><div class="search-top"><div class="search-icon"><i class="icon icon-search"></i></div><div class="search-close"><i class="icon icon-cancel"></i></div><div class="search-input"><input type="text" placeholder="搜索"></div></div><div class="search-content"><h3 class="search-tip">没有内容</h3><div class="search-result"></div><nav class="search-pagination"></nav></div></div>');r.css("overflow","hidden").append(o).append(l);var p=l.find(".search-result"),h=l.find(".search-pagination"),u=l.find(".search-tip");l.find(".search-close").on("click",t),l.find("input").on(changeEvent,function(){n.call(this)}),l.find(".search-pagination").on("click","a",function(){e.call(this)})}function loadData(){return $.Deferred(function(t){if(Content)return void t.resolve(Content);$.get("/content.json",function(e){e?(Content=e,t.resolve(e)):t.reject(null)})})}function getResultRow(t){var e=new Date(t.date),n=e.getFullYear()+"/"+("0"+(e.getMonth()+1)).slice(-2)+"/"+("0"+e.getDate()).slice(-2),a='<a class="search-link" href="/{path}"><p class="search-title">{title}</p><p class="search-info"><time>{date}</time>&nbsp;';return a=a.replace(/{path}/g,t.path).replace(/{title}/g,t.titleStr||t.title).replace(/{date}/g,n),t.tagStr&&(a+='<i class="icon icon-tag"></i>&nbsp;<span>'+t.tagStr.replace(/@#/g,"</span>&nbsp;<span>")+"</span></p>"),a+="</a>"}function getPagination(t,e,n){if(!t)return"";var a=Math.ceil(t/n),i=[];if(a<=1)return"";for(var s=0;s<a;s++)0==s&&0!=e&&i.push('<a class="prev" href="javascript:;">Prev</a>'),s==e?i.push("<span>"+(s+1)+"</span>"):i.push('<a class="num" href="javascript:;">'+(s+1)+"</a>"),s==a-1&&e!=a-1&&i.push('<a class="next" href="javascript:;">Next</a>');return i.join("")}var Content=null,changeEvent="oninput"in window?"input":"onpropertychange"in window?"propertychange":"keyup";$("[data-tag=search]").on("click",popupSearch);
function init(){var e=getEnv(),t=$("#isPost").val(),s=location.protocol+"//"+location.host+location.pathname,i=$(".post-title").html(),o=i,a="";$(".share").on("click",function(n){if(n.stopPropagation(),n.preventDefault(),"true"==t&&("weixin"==e||"qq"==e))return void showShareOverlay();var r=$(this),c=r.attr("data-url"),l=c.replace(/\//g,"");sharePop=$("#"+l),article=r.parent().parent().parent(),offset=r.offset(),w=r.width(),h=r.height(),s=location.protocol+"//"+location.host+c,i=article.find(".post-title").html(),o=r.attr("data-desc");var p=article.find(".img-entry img");if(p.length&&(a=p.attr("src"),/^https?\/\//.test(a)||(a=location.origin+a)),sharePop.length)"block"==sharePop.css("display")?sharePop.css("display","none"):($(".share-popup").css("display","none"),sharePop.css({display:"block",top:offset.top+h+5,left:offset.left-150}));else{$(".share-popup").css("display","none");var d=$('<div id="'+l+'" class="share-popup" style="display: block;width:220px"> <div class="share-input"> <input type="text" value="'+s+'"> </div> <div class="share-icons"> <a class="weibo share-sns" href="javascript:;" data-type="weibo" title="weibo"> <i class="icon icon-weibo"></i> </a> <a class="weixin share-sns" href="javascript:;" data-type="weixin" title="wechat"> <i class="icon icon-wechat"></i> </a> <a class="qq share-sns" href="javascript:;" data-type="qq" title="qq"> <i class="icon icon-qq"></i> </a> <a class="qzone share-sns" href="javascript:;" data-type="qzone" title="qzone"> <i class="icon icon-star"></i> </a> </div> </div>');$(".container").append(d),d.css({top:offset.top+h+5,left:offset.left-150})}}),$(".container").on("click",".share-sns",function(e){handleClick($(this).attr("data-type"),{url:location.protocol+"//"+location.host,sUrl:s,sPic:a,sTitle:i,sDesc:o})})}function handleClick(e,t){"weibo"===e?generate("http://service.weibo.com/share/share.php?url={%sUrl%}&title={%sTitle%}&pic={%sPic%}",t):"qq"===e?generate("http://connect.qq.com/widget/shareqq/index.html?url={%sUrl%}&title={%sTitle%}&source={%sDesc%}",t):"douban"===e?generate("https://www.douban.com/share/service?image={%sPic%}&href={%sUrl%}&name={%sTitle%}&text={%sDesc%}",t):"qzone"===e?generate("http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={%sUrl%}&title={%sTitle%}&pics={%sPic%}&summary={%sDesc%}&desc={%sDesc%}&site={%url%}",t):"facebook"===e?generate("https://www.facebook.com/sharer/sharer.php?u={%sUrl%}",t):"twitter"===e?generate("https://twitter.com/intent/tweet?text={%sTitle%}&url={%sUrl%}&via={%url%}",t):"google"===e?generate("https://plus.google.com/share?url={%sUrl%}",t):"weixin"===e&&showWX(t)}function generate(e,t){var e=e.replace(/{%sUrl%}/g,encodeURI(t.sUrl)).replace(/{%sTitle%}/g,t.sTitle).replace(/{%sDesc%}/g,t.sDesc).replace(/{%sPic%}/g,encodeURIComponent(t.sPic)).replace(/{%url%}/g,encodeURIComponent(t.url));window.open(e)}function generateCode(e){$("#qrcode").empty();new QRCode("qrcode",{text:e,width:200,height:200,colorDark:"#000000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.M})}function showShareOverlay(){var e=$('<div class="share-overlay"><i class="share-arrow"></i><p class="share-tip">分享给好友&nbsp;</p></div>');$(document.body).css("overflow","hidden").append(e),e.on("click",function(){$(document.body).css("overflow",""),e.remove()})}function showWX(e){function t(){$(document.body).css("overflow",""),i.remove(),s.hide()}var s=$(".wxshare-popup"),i=$('<div class="popup-overlay"></div>');generateCode(e.sUrl),$(document.body).css("overflow","hidden").append(i),s.show(),i.on("click",t),s.find(".close").on("click",t)}function getEnv(){var e=navigator.userAgent.toLowerCase();return/micromessenger(\/[\d\.]+)*/.test(e)?"weixin":/qq\/(\/[\d\.]+)*/.test(e)||/qzone\//.test(e)?"qq":"h5"}function browser(){var e=window.navigator.userAgent;return{trident:e.indexOf("Trident")>-1,presto:e.indexOf("Presto")>-1,webKit:e.indexOf("AppleWebKit")>-1,gecko:e.indexOf("Gecko")>-1&&e.indexOf("KHTML")==-1,mobile:!!e.match(/AppleWebKit.*Mobile.*/),ios:!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:e.indexOf("Android")>-1||e.indexOf("Linux")>-1,iPhone:e.indexOf("iPhone")>-1||e.indexOf("Mac")>-1,iPad:e.indexOf("iPad")>-1,webApp:e.indexOf("Safari")==-1,weixin:e.indexOf("MicroMessenger")==-1}}init();
function hideEffect(){$("body").css("overflow",""),$(".header").removeClass("open-menu"),$(".main").removeClass("push"),setTimeout(function(){$(".container").removeClass("animate-prepare")},550)}function windowResize(){$(window).width()>960&&$(".container").hasClass("animate-prepare")&&hideEffect();var e=$(".main").width();$(".post-banner").css("backgroundSize",94e3/e+"%")}$(window).on("resize",windowResize),$(".container").on("click",function(){$(".share-popup").css("display","none"),$(this).hasClass("animate-prepare")&&hideEffect()}),$("#barBtn").on("click",function(e){e.stopPropagation(),e.preventDefault(),$(".share-popup").css("display","none"),$(".container").hasClass("animate-prepare")||$(".container").addClass("animate-prepare"),$(".header").hasClass("open-menu")?hideEffect():($("body").css("overflow","hidden"),$(".header").addClass("open-menu"),$(".main").addClass("push"))}),windowResize();
function setScrollTop(){var o=$(window).scrollTop(),s=$(document).height(),l=$(window).height(),h=$(".to-top"),e=$(".to-bottom");o>500?h.hasClass("hide")&&h.removeClass("hide").addClass("show"):h.hasClass("show")&&h.removeClass("show").addClass("hide"),s-l-o>500?e.hasClass("hide")&&e.removeClass("hide").addClass("show"):e.hasClass("show")&&e.removeClass("show").addClass("hide")}$(window).on("scroll",setScrollTop),$(".to-top").on("click",function(){window.scrollTo(0,0)}),$(".to-bottom").on("click",function(){window.scrollTo(0,$(document).height()-$(window).height())}),setScrollTop();