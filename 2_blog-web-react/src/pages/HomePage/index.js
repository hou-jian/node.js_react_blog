import React, { memo, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  HomeWrapper,
  ArticlesList,
} from './style'

const HomePage = memo(() => {

  return (
    <div>
      <HomeWrapper>
        <ArticlesList>
          <ul>
            <li>
              <Link to='/article/1'>文章1</Link>
            </li>
          </ul>
        </ArticlesList>
      </HomeWrapper>

    </div>
  )
})

export default HomePage