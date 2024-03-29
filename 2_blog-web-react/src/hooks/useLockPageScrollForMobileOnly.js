import { useCallback, useEffect } from "react";
import { useMedia } from 'react-use'

import { LargeScreenWidth } from '../common/constant'

export default function useLockPageScrollForMobileOnly(lock) {
  const isLargeScreenWidth = useMedia(LargeScreenWidth)

  const fn = useCallback(e => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    if(lock) {
      // 大屏特殊处理
      if(!isLargeScreenWidth) {
        document.body.removeEventListener('touchmove', fn)
        return
      }
      // 阻止滚动
      document.body.addEventListener('touchmove', fn, { passive: false });
    } else {
      // 恢复滚动
      document.body.removeEventListener('touchmove', fn);
    }

  }, [lock, isLargeScreenWidth, fn])
}