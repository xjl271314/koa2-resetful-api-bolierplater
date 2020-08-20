import Redis from 'ioredis';

const redis = new Redis({
    host: 'localhost',//安装好的redis服务器地址
    port: 6379,　//端口
    prefix: 'ppt',//存诸前缀
    ttl: 60 * 60 * 23,//过期时间
    db: 0
});

redis.on('error', (err) => {
    if (err) {
        throw(err)
        process.exit(1);
    }
})

export default redis