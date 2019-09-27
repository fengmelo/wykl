import axios from 'axios'


// create an axios instance
const service = axios.create({
	baseURL: process.env.VUE_APP_BASE_API,
	// withCredentials: true, // send cookies when cross-domain requests
	timeout: 5000 // request timeout
})


service.interceptors.request.use(
	config => config,
	error => {
		return Promise.reject(error)
	}
)

service.interceptors.response.use(
	response => response.data,
	error => {
		return Promise.reject(new Error(res.message || 'Error'))
	}
)

export default service