import Koa from 'koa';
import moment from 'moment'
import requireDirectory from 'require-directory';
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import koaLogger from 'koa-logger'
import onError from 'koa-onerror'
import koaJson from 'koa-json'
import async from 'async';

class App {
  // 初始化
  static init() {
    App.app = new Koa()
    onError(App.app)
    App.initBodyParse();
    App.nextInfo();
    App.initConfigs();
    App.initLoadRoutes();
  }
  // 使用bodyParse解析请求
  static initBodyParse() {
    App.app.use(bodyParser())
    App.app.use(koaJson())
    App.app.use((ctx, next) => {
      ctx.body = '欢迎使用koa2后台模板'
      next()
    })
  }
  // 自动注入路由
  static initLoadRoutes() {
    // process.cwd() 获取绝对路径
    const appDirectory = `${process.cwd()}/app/api`
    // 使用 require-directory 提供的方法导入自动导入路由文件
    requireDirectory(module, appDirectory, {
      visit: whenLoadingModule
    })

    // 注册所有检测到的 Koa 路由
    function whenLoadingModule(obj) {
      if (obj instanceof Router) {
        // allowedMethods()中间件主要用于处理options请求，当前接口运行的method,响应405和501状态。
        App.app.use(obj.routes())
        App.app.use(obj.allowedMethods())
      }
    }
  }

  static initConfigs() {
    // 配置控制台日志中间件
    App.app.use(koaLogger((request) => {
      console.log(moment().format('YYYY-MM-DD HH:mm:SS'), request)
    }))
  }

  static nextInfo() {
    
  }
}

App.init()

module.exports = App.app




