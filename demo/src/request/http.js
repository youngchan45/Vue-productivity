import axios from 'axios'
 
axios.defaults.timeout = 7000;   //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';        //配置请求头
axios.defaults.baseURL = 'http://itlead.vicp.net:9905/archive';   //配置接口地址
 
//添加请求拦截器
axios.interceptors.request.use(
    config => {
      config.data = JSON.stringify(config.data);
      config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
      }
      return config;
    },
    err => {
        console.log('错误的传参')
      return Promise.reject(err);
    }
  );

 
//返回状态判断(添加响应拦截器) 
axios.interceptors.response.use(
    res => {
        //对响应数据做些事
    if(!res.data.success){
        return Promise.resolve(res);
    }
      return res;
    },
    err => {
        console.log('网络异常')
      return Promise.reject(err)
    }
  )

//返回一个Promise(发送post请求)
export function fetchPost(url, data={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(res.data);
            }, err => {
                reject(err);
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//返回一个Promise(发送get请求)
export function fetchGet(url, params={}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params: params})
            .then(res => {
                resolve(res.data)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    fetchPost,
    fetchGet,
}