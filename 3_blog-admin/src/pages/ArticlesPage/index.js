import React, { memo, useCallback, useEffect, useState } from 'react'
import { Card, Space, Modal, message } from 'antd'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import hjRequest from '../../services/request';

import ArticlesOperate from './ArticlesOperate';
import ArticlesList from './ArticlesList';
import ArticlesEditor from '../../components/ArticleEditor';

const ArticlesPage = memo(() => {
  const [dataSource, setDataSource] = useState([]) // dataSource：用于展示的文章列表数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]) //选中的行，key数组
  const [isEditorOpen, setIsEditorOpen] = useState(false) //控制文章编辑组件打开
  const [editorTitle, setEditorTitle] = useState('')
  const [articleKey, setArticleKey] = useState(1)

  const navigate = useNavigate()
  const { id } = useParams() // 当前页码
  const currentIndex = parseInt(id) || 1


  const { data, mutate, error } = useSWR(`/article/page/${currentIndex}`, (url) => {
    return hjRequest.get(url).then(res => res)
  })

  const isLoading = !data && !error //SWR是否有数据正在请求(不包含重新验证)

  useEffect(() => { // 格式化 data=>dataSource
    if(!data) return
    const dataSource = []
    // 处理数据为 Table 需要的格式
    for(const article of data.data) {
      const tags = []
      for(const tag of article.tags) {
        tags.push(tag.tagName)
      }
      dataSource.push({
        key: article.id,
        title: article.title,
        views: article.views,
        tags: tags,
        time: dayjs(article.time).format('YYYY-MM-DD HH:mm:ss')
      })
    }
    setDataSource(dataSource)
  }, [data])

  const changePageIndex = useCallback((index) => {
    navigate(`/articles/page/${index}`)
    document.querySelector('.content').scrollTop = 0
  }, [navigate])

  function delArticles(articleIDArr) { // 删除文章
    if(articleIDArr.length === 0) {
      message.info('未选择文章')
      return
    }
    Modal.confirm({
      content: '确定要删除文章吗？',
      maskClosable: true,
      onOk: async () => {
        const res = await hjRequest.delete('/article/batch', {
          articlesID: articleIDArr
        })

        if(res.message === '批量删除文章成功') {
          let newData = data.data
          for(const articleID of articleIDArr) {
            newData = newData.filter(item => {
              return item.id !== articleID
            })
          }

          mutate(
            { ...data, data: newData },
            //禁止重新验证
            { revalidate: false },
          )
          message.success('删除文章成功')
        } else {
          message.error(res.message || '未知错误')
        }
      }
    })


  }

  function addArticle() {
    setEditorTitle('新建文章')
    setIsEditorOpen(true)
  }

  function editorArticle(articleKey) {
    setEditorTitle('编辑文章')
    setArticleKey(articleKey)
    setIsEditorOpen(true)
  }
  return (
    <Card title='文章管理'>
      <Space
        direction='vertical'
        style={{
          display: 'flex',
        }}
      >
        <ArticlesOperate
          delArticles={delArticles}
          selectedRowKeys={selectedRowKeys}
          addArticle={addArticle}
        />
        <ArticlesList
          dataSource={dataSource}
          delArticles={delArticles}
          currentIndex={currentIndex}
          changePageIndex={changePageIndex}
          totalArticles={data?.totalArticles}
          setSelectedRowKeys={setSelectedRowKeys}
          editorArticle={editorArticle}
          isLoading={isLoading}
        />
        {
          isEditorOpen ? <ArticlesEditor
            title={editorTitle}
            isopen={isEditorOpen}
            setIsopen={setIsEditorOpen}
            articleKey={articleKey}
            mutate={mutate}
          /> : ''
        }

      </Space>
    </Card>
  )
})

export default ArticlesPage