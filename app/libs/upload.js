/**
 * 
 * 自定义文件上传
 */

class UpLoader {
    async upload(files) {
      let promise = []
      
      for (const file of files) {
        // ...
        promise.push(new Promise((resolve, reject) => {
          // 执行上传逻辑
          // resolve() or reject()
        }))
      }
  
      Promise.all(promises).then(res => {
        // ... 全部成功
      }).catch(e => {
        // ... 有上传失败的
      })
    }
  }