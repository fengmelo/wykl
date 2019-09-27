import config from './config'

/**
 * 节流
 * @param {*} fn 
 * @param {*} threshold 
 */
export const throttle = function (fn, threshold = 250) {
	var last
	var timer

	return function () {
		let context = this
		let args = arguments
		var now = +new Date()
		if (last && now < last + threshold) {
			clearTimeout(timer)
			timer = setTimeout(function () {
				last = now
				fn.apply(context, args)
			}, threshold)
		} else {
			last = now
			fn.apply(context, args)
		}
	}
}

