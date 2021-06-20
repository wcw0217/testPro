export function setImg (file, fileName) {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('canvas') // 创建Canvas对象(画布)
    let context = canvas.getContext('2d')
    let img = new Image()
    img.src = file.content // 指定图片的DataURL(图片的base64编码数据)
    img.onload = () => {
      canvas.width = 400
      canvas.height = 300
      context.drawImage(img, 0, 0, 400, 300)
      file.content = canvas.toDataURL(file.file.type, 0.92) // 0.92为默认压缩质量
      resolve(dataURLtoFile(file.content, fileName))
    }
  })
}
function dataURLtoFile (dataurl, filename) { // 将base64转换为file文件
  let arr = dataurl.split(',')
  let mime = arr[0].match(/:(.*?);/)[1]
  let bstr = atob(arr[1])
  let n = bstr.length
  let u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}