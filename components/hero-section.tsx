'use client'

import { ReactNode } from 'react'

interface HeroSectionProps {
  tag: string
  title: string
  subtitle: string
  children?: ReactNode
  animated?: boolean
}

export function HeroSection({ tag, title, subtitle, children, animated = true }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center px-6 lg:px-8 bg-gradient-to-b from-card via-background to-background pt-20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto py-24 relative z-10">
        <div className={animated ? 'animate-fade-in-down' : ''}>
          <span className="text-[11px] font-semibold tracking-widest uppercase text-accent mb-6 block">
            {tag}
          </span>
        </div>
        
        <h1 className={`text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-foreground mb-8 leading-tight ${animated ? 'animate-fade-in-up stagger-1' : ''}`}>
          {title}
        </h1>
        
        <p className={`text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl font-light ${animated ? 'animate-fade-in-up stagger-2' : ''}`}>
          {subtitle}
        </p>

        {children && (
          <div className={animated ? 'animate-fade-in-up stagger-3 mt-12' : 'mt-12'}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
