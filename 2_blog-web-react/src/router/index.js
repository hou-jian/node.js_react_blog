import HomePage from '../pages/HomePage'
import ArchivePage from '../pages/ArchivePage'
import TagsPage from '../pages/TagsPage'
import ArticlePage from '../pages/ArticlePage'
import Error404 from '../components/Error404'
import Test from '../pages/Test'

const router = [
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/article/page/:id',
    element: <HomePage />
  },
  {
    path: '/archive',
    element: <ArchivePage />
  },
  {
    path: '/archive/:id',
    element: <ArchivePage />
  },
  {
    path: '/tags',
    element: <TagsPage />
  },
  {
    path: '/tags/page/:tagName',
    element: <TagsPage />
  },
  {
    path: '/article/:id',
    element: <ArticlePage />
  },
  {
    path: '/404',
    element: <Error404 />
  },
  {
    path: '/test',
    element: <Test />
  },
  {
    path: '*',
    element: <Error404 />
  }
]

export default router