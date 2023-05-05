import { useState } from 'react'

export const useCardIndex = (initialIndex = 0, maxIndex = 2) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleNext = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex))
  }

  const handlePrev = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0))
  }

  return [currentIndex, setCurrentIndex, handleNext, handlePrev] as const
}
