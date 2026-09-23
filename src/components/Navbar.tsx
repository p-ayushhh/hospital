import { useState, useEffect } from 'react'

interface NavbarProps {
  onFoodClick: () => void
  onAppointmentClick: () => void
  onHistoryClick?: () => void
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Doctors', href: '#doctors' },
  { label: 'Ambulance', href: '#ambulance' },
  { label: 'Employees', href: '#employees' },
]

export default function Navbar({ onFoodClick, onAppointmentClick, onHistoryClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}`}>
      {/* Emergency bar */}
      <div className="bg-primary text-white text-xs py-1.5 text-center px-4">
        <span>🚨 Emergency: </span>
        <a href="tel:108" className="font-bold hover:underline">108 (Ambulance)</a>
        <span className="mx-3">|</span>
        <a href="tel:+918800100200" className="hover:underline">+91 88001 00200</a>
        <span className="mx-3">|</span>
        <span>📍 MG Road, Bengaluru, Karnataka 560001</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white text-2xl font-bold leading-none">+</span>
            </div>
            <div>
              <p className="font-display text-primary text-lg leading-none">Carewell Hospital</p>
              <p className="text-[10px] text-gray-400 leading-none tracking-wide uppercase">Advanced Healthcare · Bengaluru</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-surface rounded-lg transition-all font-medium">
                {link.label}
              </a>
            ))}
            <a href="#payment" className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-surface rounded-lg transition-all font-medium">
              Payment
            </a>
            <button onClick={onFoodClick}
              className="px-3 py-2 text-sm text-accent font-semibold hover:bg-sky-50 rounded-lg transition-all flex items-center gap-1">
              🍽 Food ↗
            </button>
            {onHistoryClick && (
              <button onClick={onHistoryClick}
                className="px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-surface rounded-lg transition-all font-medium flex items-center gap-1">
                📋 My History ↗
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onAppointmentClick}
              className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm flex items-center gap-1.5"
            >
              Book Appointment
              <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>

          <button className="lg:hidden p-2 rounded-lg hover:bg-surface transition-colors" onClick={() => setIsOpen(!isOpen)}>
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-primary transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-primary transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-primary transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 shadow-lg">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              className="block px-3 py-2.5 text-gray-700 hover:text-primary hover:bg-surface rounded-lg font-medium transition-colors"
              onClick={() => setIsOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#payment" className="block px-3 py-2.5 text-gray-700 hover:text-primary hover:bg-surface rounded-lg font-medium transition-colors" onClick={() => setIsOpen(false)}>Payment</a>
          <button onClick={() => { onFoodClick(); setIsOpen(false) }}
            className="block w-full text-left px-3 py-2.5 text-accent font-semibold hover:bg-sky-50 rounded-lg transition-colors">
            🍽 Food Booking ↗
          </button>
          {onHistoryClick && (
            <button onClick={() => { onHistoryClick(); setIsOpen(false) }}
              className="block w-full text-left px-3 py-2.5 text-gray-700 hover:text-primary hover:bg-surface rounded-lg font-medium transition-colors">
              📋 My History ↗
            </button>
          )}
          <div className="pt-2 border-t border-gray-100">
            <button onClick={() => { onAppointmentClick(); setIsOpen(false) }}
              className="flex w-full items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors">
              Book Appointment ↗
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
