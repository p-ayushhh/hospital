import { useState } from 'react'
import { doctors, type Doctor } from '../data/hospitalData'

interface DoctorsSectionProps {
  onBookAppointment: (doctorId: string) => void
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  )
}

function DoctorCard({ doctor, onBook }: { doctor: Doctor; onBook: (id: string) => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img src={doctor.photo} alt={doctor.name}
          className="w-full h-52 object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
            {doctor.available ? '● Available' : '● Unavailable'}
          </span>
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-2 py-1 rounded-lg">
          {doctor.id}
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-primary text-xl mb-0.5">{doctor.name}</h3>
        <p className="text-accent font-semibold text-sm mb-1">{doctor.specialization}</p>
        <StarRating rating={doctor.rating} />

        <div className="mt-3 space-y-1.5 text-sm text-gray-600">
          <div className="flex items-start gap-2">
            <span className="w-4 text-center flex-shrink-0 mt-0.5">🎓</span>
            <span className="text-xs">{doctor.qualification}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-center">🏥</span>
            <span>{doctor.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-center">⏱</span>
            <span>{doctor.experience} experience</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 text-center">📅</span>
            <span className="text-xs">{doctor.availableDays.join(', ')} · {doctor.timings}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">Consultation Fee</p>
            <p className="font-display text-primary text-xl">₹{doctor.consultationFee}</p>
          </div>
          <button
            onClick={() => onBook(doctor.id)}
            disabled={!doctor.available}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5"
          >
            Book Now
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DoctorsSection({ onBookAppointment }: DoctorsSectionProps) {
  const [filter, setFilter] = useState('All')
  const departments = ['All', ...Array.from(new Set(doctors.map(d => d.department)))]
  const filtered = filter === 'All' ? doctors : doctors.filter(d => d.department === filter)

  return (
    <section id="doctors" className="py-20 bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Our Panel</span>
          <h2 className="font-display text-primary text-4xl lg:text-5xl mt-2 mb-4">Meet Our Specialists</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Board-certified Indian physicians trained at premier institutions — AIIMS, PGI, JIPMER, and more.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {departments.map(dept => (
            <button key={dept} onClick={() => setFilter(dept)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === dept ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
              {dept}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} onBook={onBookAppointment} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-gray-500 text-sm mb-4">Want to book an appointment directly?</p>
          <button
            onClick={() => onBookAppointment('')}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
          >
            Book an Appointment ↗
          </button>
        </div>
      </div>
    </section>
  )
}
