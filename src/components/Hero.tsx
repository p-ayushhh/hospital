interface HeroProps {
  onAppointmentClick: () => void
}

const stats = [
  { value: '25,000+', label: 'Patients Served' },
  { value: '120+', label: 'Expert Doctors' },
  { value: '30+', label: 'Years of Care' },
  { value: '15+', label: 'Departments' },
]

export default function Hero({ onAppointmentClick }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600&h=900&fit=crop&auto=format"
          alt="Carewell Hospital"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/80 to-primary/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0" />
            Accepting New Patients — All Departments Open
          </div>

          {/* Heading */}
          <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-5">
            Advanced Care,<br />
            <span className="italic text-accent">Compassionate</span><br />
            Healing
          </h1>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
            Carewell Hospital, Bengaluru — delivering world-class healthcare through 120+ specialist physicians and cutting-edge medical technology.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button
              onClick={onAppointmentClick}
              className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:bg-sky-400 transition-colors shadow-lg shadow-accent/30 w-full sm:w-auto"
            >
              Book an Appointment
              <svg className="w-4 h-4 opacity-80 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <a
              href="#doctors"
              className="flex items-center justify-center bg-white/15 backdrop-blur-sm text-white border border-white/40 px-6 py-3.5 rounded-xl font-semibold text-sm sm:text-base hover:bg-white/25 transition-colors w-full sm:w-auto"
            >
              Meet Our Doctors
            </a>
          </div>

          {/* Quick action pills */}
          <div className="flex flex-wrap gap-2">
            <a href="#ambulance"
              className="flex items-center gap-1.5 bg-red-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-red-500 transition-colors">
              🚑 Ambulance: 108
            </a>
            <a href="tel:+918800100200"
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/25 transition-colors">
              📞 +91 88001 00200
            </a>
            <a href="#services"
              className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white border border-white/30 px-3 py-2 rounded-lg text-xs font-medium hover:bg-white/25 transition-colors">
              🏥 Our Services
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/95 backdrop-blur-sm border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className={`py-4 sm:py-5 px-4 sm:px-6 text-center ${i < stats.length - 1 ? 'border-r border-gray-200' : ''}`}>
                <p className="font-display text-primary text-2xl sm:text-3xl">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
