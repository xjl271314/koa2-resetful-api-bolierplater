import controls from '@controllers/commont'
import router from 'koa-router'
const Router = new router({
  prefix:'/api/'
})

Router
  .get('commont/getCaptcha', controls.getCaptcha)

module.exports = Router