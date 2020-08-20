import http from 'http';

/**
 * 获取本机IP
 * @return {String} 返回本机IP
 */
export function getLocalIP() {
    const os = require('os');
    const osType = os.type();
    const ifaces = os.networkInterfaces();
    let locatIp = ifaces.en0[0].address;
    if (osType === 'Windows_NT') {
        for (let dev in ifaces) {
            if (dev === '本地连接' || dev === '以太网') {
                for (let j = 0; j < ifaces[dev].length; j++) {
                    if (ifaces[dev][j].family === 'IPv4') {
                        locatIp = ifaces[dev][j].address;
                        break;
                    }
                }
            }
        }
    }

    return locatIp;
}

/**
 * 获取公网IP
 * @param {Function} fn 异步获取结果后的回调函数
 */
export function getPublicIP(fn) {
    http.get('http://ip.taobao.com/service/getIpInfo.php?ip=myip', function (req, res) {
        typeof fn === 'function' && fn(res);
        console.info(res);
    });
}

export default {
    getLocalIP,
    getPublicIP
};