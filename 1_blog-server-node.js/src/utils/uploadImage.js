const fs = require("fs")
const FormData = require("form-data")
const axios = require('axios')

const { SMMS_TOKEN } = require("../constants/config")

const token = SMMS_TOKEN
const url = 'https://smms.app/api/v2/upload'

// sm.ms仅支持单图片的上传
async function uploadImageToSMMS(imgPath) {
  try {
    let imgUrl = ''
    const formData = new FormData()
    const file = fs.createReadStream(imgPath)
    formData.append('smfile', file)
    const res = await axios.post(url, formData, {
      headers: {
        ...formData.getHeaders(),
        Authorization: token
      }
    }).then(r => r.data)

    if(res.success) {
      imgUrl = res.data.url
    }
    if(res.code === 'image_repeated') { //图片重复也当它成功
      imgUrl = res.images
    }
    return imgUrl
  } catch(error) {
    throw new Error(error.message)
  }
}

// 多图片上传
// 参数 ["/imgs/bird.png","/imgs/cat.jpg"]
// 参数传递文件的绝对路径，可在该函数的模块通过path.resolve(__dirname, "./imgs/bird.png")拼接
async function uploadImagesToSMMS(imgPathArr) {
  try {
    const resArr = await Promise.all(
      imgPathArr.map(path => uploadImageToSMMS(path))
    )
    return resArr
  } catch(error) {
    throw new Error(error.message)
  }
}

module.exports = uploadImagesToSMMS

