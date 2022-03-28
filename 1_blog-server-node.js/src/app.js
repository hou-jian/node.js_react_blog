const express = require('express')
const expressJwt = require('express-jwt')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')

const { PUBLIC_KEY } = require('./constants/config.js')
// 路由
const authRouter = require('./routes/auth.js');
const articleRouter = require('./routes/article.js');
const tagsRouter = require('./routes/tags.js')
const commentRouter = require('./routes/comment.js');
const archiveRouter = require('./routes/archive.js')

const app = express()
const port = 3001

// 允许跨域
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});

app.use(express.json())
// token解析验证中间件
// 成功，把用户信息赋值 req.user
// 失败，直接报错
app.use(expressJwt({
  secret: PUBLIC_KEY,
  algorithms: ['RS256'],
}).unless({
  // 这些路径不解析、验证
  path: [
    { url: '/', method: ['GET'] },
    { url: '/favicon.ico', method: ['GET'] },
    { url: '/auth/register', methods: ['POST'] },
    { url: '/auth/login', methods: ['POST'] },
    { url: /^\/article\/\d+$/, methods: ['GET'] },
    { url: /^\/article\/page\/\d+$/, methods: ['GET'] },
    { url: /^\/comment$/, methods: ['POST'] },
    { url: /^\/comment\/\d+$/, methods: ['GET'] },
    { url: /^\/archive\/\d+$/, methods: ['GET'] },
    { url: '/tags/page', methods: ['GET'] },
    { url: '/test', methods: ['GET'] },
  ]
}))

// 日志
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// 路由
app.use('/auth', authRouter)
app.use('/article', articleRouter)
app.use('/tags', tagsRouter)
app.use('/comment', commentRouter)
app.use('/archive', archiveRouter)
// 测试接口
app.get('/test', function(req, res) {
  setTimeout(() => {
    const d = new Date()
    res.status(200).send('成功' + d.getTime());
  }, 1000);
})
app.get('*', function(req, res) {
  res.status(404).send();
})
// 错误处理
app.use(function(err, req, res, next) {
  console.dir('===全局错误===', err)
  // 默认值
  let status = 500
  let msg = '服务端错误'

  // 由于生产页面不需要鉴权，
  // 按现在的写法没带正确token express-jwt 会报错，这里暂时这样处理
  if(err.name === 'UnauthorizedError') {
    // 管理页面返回401
    status = 401
    msg = 'token已过期，请重新登录！'
    // 生产页面返回404
    // TODO:上线后替换来源网址为 https://blog.hou-jian.com
    if(req.headers.origin === 'http://localhost:3000') {
      status = 404
      msg = 'Not Found'
    }
  }

  res.status(status).send(msg)
})


app.listen(port, function() {
  console.log(`服务器启动成功, 运行在http://localhost:${port}`);
})
