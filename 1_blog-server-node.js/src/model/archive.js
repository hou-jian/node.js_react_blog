const articleModel = require("./article")
const tagAndArticleModel = require('./tag&article.js')
const tagsModel = require('./tags.js')

const archiveModel = {}


// 获取某页的文章列表（包含文章的12个月/页） 
archiveModel.getPage = function(pageNumber) {
  // - 待返回数据
  const data = {
    message: '',
    data: []
  }

  // - 拿到文章数据
  const articlesDB = articleModel.throwArticlesData()

  // - 按照年月归类文章
  const yearMonthObj = {}  // 存放年月对应的文章数据

  for(const item of articlesDB) {
    // 获取键名，格式：2022-2
    const date = new Date(item.time)
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const key = y + '-' + m

    // 如没有该 key 初始化
    if(!yearMonthObj[key]) {
      yearMonthObj[key] = []
    }

    // 根据文章id拿到对应标签数据
    const tags = tagsModel.getTagsArrBasedOnTheArticleID(item.id)
    item.tags = tags

    // 不要 intro
    delete item.intro

    // 拿到 key 对应的数组，并 push 文章
    const articlesArr = yearMonthObj[key]
    articlesArr.push(item)
  }

  // - 按年月时间倒序排序，并push给yearMonthArr数组
  const yearMonthArr = []
  let yearMonthKeyArr = Object.keys(yearMonthObj)
  yearMonthKeyArr = yearMonthKeyArr.sort().reverse()
  for(const key of yearMonthKeyArr) {
    let o = {
      [key]: yearMonthObj[key]
    }
    yearMonthArr.push(o)
  }

  // - 最后截取对应页码数据，并返回
  // 计算截取范围
  const size = 6 // 6项/页
  const start = (pageNumber - 1) * size
  const end = start + size
  data.data = yearMonthArr.slice(start, end)
  data.message = '获取归档文章列表成功'
  return data
}

module.exports = archiveModel