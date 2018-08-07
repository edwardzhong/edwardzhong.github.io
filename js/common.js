/**
 * 滚动事件统一控制器
 * @param    {String}  fn  返回：false 表示反复执行，true 用于达到某条件后不再执行
 * @Author   jeffzhong(p_jdjfzhong)
 * @DateTime 2016-07-14T15:06:16+0800
 */
var scrollEventCtr=(function(){
    var eventArr=[],//事件列表
        eventIsLoads=[];//是否加载的标志列表
    $(window).on('scroll', function() {
        eventArr.forEach(function(fn,i){
            if(eventIsLoads[i]){return true;}//标志已经加载过，不需要反复执行
            if(typeof fn =='function'){
                eventIsLoads[i]=fn(); 
            }
        });
    });
    return function(fn){
        eventIsLoads.push(false);
        eventArr.push(fn);
        if(typeof fn =='function'){//滚动事件触发前先运行一次
            eventIsLoads[eventIsLoads.length-1]=fn();
        }
    };
}());