const Koa = require("koa");
const Router = require("koa-router");
const KoaBody = require("koa-body");
const Mock = require('mockjs')
KoaBody({ multipart: true });


const app = new Koa();
const router = new Router();

const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|10-20': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      title: '@sentence(10, 20)',
      'status|1': ['published', 'draft', 'deleted'],
      author: 'name',
      display_time: '@datetime',
      pageviews: '@integer(300, 5000)'
  }]
})

router.get("/mock", (ctx, next) => {
  ctx.body = {
    code: 200,
    data: data,
    msg: "mock 数据接口请求成功了",
  };
});

app.use(KoaBody()).use(router.routes()).use(router.allowedMethods());

// app.listen(3000);
app.listen(3000, () => {
  console.log('server is running on http://localhost:3000');
});
