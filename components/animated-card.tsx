'use client'

import { ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ children, className = '', delay = 0, hover = true }: AnimatedCardProps) {
  const delayClass = delay > 0 ? `stagger-${Math.min(Math.ceil(delay / 100), 6)}` : ''
  
  return (
    <div 
      className={`animate-fade-in-up ${delayClass} ${hover ? 'card-hover' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
