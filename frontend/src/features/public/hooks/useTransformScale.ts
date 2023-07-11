import { useCallback, useEffect, useState } from 'react'

import { WIDTH_A4 } from '~utils/htmlUtils'

export const calculateTransformScale = (viewportWidth: number): number =>
  // For viewports with width smaller than A4, we want the letter to take up 90% of the viewport
  Math.min(viewportWidth * 0.9, WIDTH_A4) / WIDTH_A4

export const useTransformScale = () => {
  const [transformScale, setTransformScale] = useState<number>(
    calculateTransformScale(window.innerWidth),
  )

  const handleResize = useCallback(() => {
    setTransformScale(calculateTransformScale(window.innerWidth))
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return transformScale
}
