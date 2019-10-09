/**
 * 节流
 * @param {*} fn 
 * @param {*} threshold 
 */
export const throttle = function(fn,interval){
	let __self = fn,timer,firstTime = true;
	return function(){
			var args = arguments,__me = this;
			if(firstTime){
					__self.apply(__me,args);
					return firstTime = false;
			}
			if(timer){
					return false;
			}
			//先执行了一次，firstTime是false,然后500毫秒之后利用定时器再次执行。
			timer = setTimeout(function(){
					clearTimeout(timer);
					timer = null;
					__self.apply(__me,args);
			},interval||500)
	}
}


export const isiOS = () => {
	var u = navigator.userAgent;
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
}