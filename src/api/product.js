import request from '@/utils/request'

export function fetchProductList(params) {
	return request({
		url: '/product/list',
		method: 'get',
		params
	})
}
export function fetchProductDetail(params) {
	return request({
		url: '/product/detail',
		method: 'get',
		params
	})
}