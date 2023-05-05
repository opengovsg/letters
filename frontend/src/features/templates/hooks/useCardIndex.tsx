import { useState } from 'react'

export const useCardIndex = (initialIndex = 0, maxIndex = 2) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const nextIndex = () => {
    setCurrentIndex((currentIndex + 1) % (maxIndex + 1))
  }

  const prevIndex = () => {
    setCurrentIndex((currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1))
  }

  return [currentIndex, setCurrentIndex, nextIndex, prevIndex] as const
}
