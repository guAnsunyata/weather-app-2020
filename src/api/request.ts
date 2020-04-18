import axios from 'axios'

const request = axios.create()

// logger
request.interceptors.request.use((v) => {
  const tagStyle =
    'background: #7bd6ff; border-radius: 2px 0 0 2px; color: #fff; padding: 2px 6px;'
  const contentStyle = 'padding: 2px 6px;'
  console.log(`%cAPI Request:%c${v.url}`, tagStyle, contentStyle)

  return v
})

export default request
