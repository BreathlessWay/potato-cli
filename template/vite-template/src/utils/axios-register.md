# Axios-Register

## 使用方式

### 初始化
```javascript
// 在入口文件，eg：main.ts 中，调用 axios 之前进行初始化
import axiosRegister from '@/utils/axios-register';

axiosRegister({});
```

> 接受一个对象作为参数，对象包含以下属性

| 参数名 | 子属性  | 参数描述 
|  ---- | ----  |  ----  |
| `whitelist`  | `String[]` | 需要被全局错误处理函数忽略的请求url
| `authHook`  | `Object` | 权限处理方法，当不传递时会有默认处理行为但不推荐，传 `false` 关闭权限钩子
| `｜- authTokenHook` | `() => Promise<string>` |获取权限token函数
| `｜- authFailHook` | `(error: any) => Promise<void>` |权限校验失败 `401` 时处理函数
| `requestFailHook` | `(error: any) => Promise<void>` | 全局错误处理函数
| `其他axios支持的config` | `AxiosRequestConfig` | 会被合并到内部的 `config` 中，作为 `axios` 的初始配置

### 使用
```
import axios from 'axios'

axios.get('/url', {
	params: {
		...
	},
	ignoreFailCallback: false
	expire: 1000
})
```

> 添加了自定义配置参数

| 参数名 | 子属性  | 参数描述
|  ---- | ----  |  ----  |
| `ignoreFailCallback` | `Boolean` | 是否跳过全局错误处理函数
| `expire`  | `Number｜ String` | 当是 `axios.get` 请求时，对请求结果进行缓存一定时间，接受 `1d` / `1h` / `1m` / `1s` / `1ms` / `1` 格式的参数，没有单位时会被作为毫秒

### 其他

1. 对每个请求添加了 `cancelToken` ，当上一次请求未完成时所发生的重复请求，会取消上一次请求，重新开启请求