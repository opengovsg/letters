import { useState } from 'react'

export const useCardIndex = (initialIndex = 0, maxIndex = 2) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % (maxIndex + 1))
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + (maxIndex + 1)) % (maxIndex + 1))
  }

  return [currentIndex, setCurrentIndex, handleNext, handlePrev] as const
}
