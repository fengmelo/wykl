import request from '@/utils/request'

export function userLogin(data) {
	return request({
		url: '/fuser/login',
		method: 'post',
		data
	})
}