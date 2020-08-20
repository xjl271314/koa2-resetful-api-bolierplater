import svgCaptcha from 'svg-captcha'
import moment from 'moment'
import md5 from 'md5'
import webResult from '@libs/webResult'
import redis from '@libs/redis'
import { getLocalIP } from '@libs/getIp'

export default {
    async getCaptcha(ctx, next){
        const result = new webResult(ctx.request)
        let captcha = svgCaptcha.create({
          // 翻转颜色
          inverse: false,
          ignoreChars: '0o1ilILgq',
          color: true,
          noise: 5,
          width: 120,
          height: 40
        })
        /**
         * 这里目前是这样处理的 由于在本地调试目前的key为md5版本的本机ip
         */
        const token = md5(getLocalIP())
        if(redis.get(token)){
            redis.del(token)
        }
        redis.set(token, captcha.text.toLowerCase())
        // 设置2分钟后过期
        redis.expire(token, 60 * 2)
        ctx.cookies.set('captcha_token', token)
        result.setResult(captcha.data)

        ctx.body = result.toString()
    } 
}