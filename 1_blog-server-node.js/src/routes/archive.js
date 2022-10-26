const express = require('express')
const archiveModel = require('../model/archive')
const router = express.Router()

router.get('/:page', (req, res) => {
  try {
    console.time('archive')
    const pageNumber = parseInt(req.params.page)
    const data = archiveModel.getPage(pageNumber)
    if(data.data.length <= 0) { // 没有数据返回404
      res.status(404).send('该页没有数据')
    } else {
      res.json(data)
    }
    console.timeEnd('archive')
  } catch (error) {
    console.log(error);
    res.status(500).json('获取归档文章列表出错，注意处理')
  }
})

module.exports = router