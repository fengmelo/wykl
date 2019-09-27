export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}


let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }
	console.log('vendor=',vendor)
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
export function getStyle(obj , name){

	if(window.getComputedStyle){
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj , null)[name];
	}else{
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}
	
}