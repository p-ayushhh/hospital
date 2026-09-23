interface FooterProps {
  onFoodClick: () => void
  onAppointmentClick: () => void
}

export default function Footer({ onFoodClick, onAppointmentClick }: FooterProps) {
  const quickLinks = [
    { label: 'About Us', href: '#services' },
    { label: 'Our Doctors', href: '#doctors' },
    { label: 'Ambulance', href: '#ambulance' },
    { label: 'Make Payment', href: '#payment' },
    { label: 'Employee Directory', href: '#employees' },
  ]

  const specialties = ['Cardiology', 'Neurology', 'Paediatrics', 'Orthopaedics', 'Dermatology', 'Surgery', 'Radiology', 'Emergency Care']

  return (
    <footer id="footer" className="bg-primary text-white">
      {/* CTA strip */}
      <div className="bg-accent/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl">Ready to book your appointment?</h3>
              <p className="text-white/70 text-sm mt-1">Our specialists are available Monday through Saturday, 8 AM – 8 PM.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={onAppointmentClick}
                className="bg-white text-primary px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center gap-2">
                Book Appointment ↗
              </button>
              <button onClick={onFoodClick}
                className="bg-accent text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-sky-400 transition-colors flex items-center gap-2">
                🍽 Order Food ↗
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map — Bengaluru location */}
      <div className="w-full h-64 bg-primary/50">
        <iframe
          title="Carewell Hospital Location — Bengaluru"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.5746%2C12.9516%2C77.6146%2C12.9816&layer=mapnik&marker=12.9716%2C77.5946"
          className="w-full h-full border-0 grayscale opacity-80"
          loading="lazy"
        />
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">+</span>
              </div>
              <div>
                <p className="font-display text-white text-lg leading-none">Carewell Hospital</p>
                <p className="text-white/50 text-xs">Advanced Healthcare · Bengaluru</p>
              </div>
            </div>
            <p className="text-white/65 text-sm leading-relaxed mb-5">
              Delivering compassionate, evidence-based healthcare since 1994. NABH Accredited · ISO 9001:2015 Certified.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-3 text-white/70">
                <span>📍</span><span>MG Road, Bengaluru, Karnataka 560001</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span>📞</span><a href="tel:+918800100200" className="hover:text-white">+91 88001 00200</a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span>🚨</span><a href="tel:108" className="text-red-300 font-bold hover:text-red-200">108 (Emergency Ambulance)</a>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <span>✉</span><a href="mailto:info@carewellhospital.in" className="hover:text-white">info@carewellhospital.in</a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/65 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button onClick={onAppointmentClick} className="text-accent hover:text-sky-300 text-sm transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Book Appointment ↗
                </button>
              </li>
              <li>
                <button onClick={onFoodClick} className="text-accent hover:text-sky-300 text-sm transition-colors flex items-center gap-2 group">
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                  Food Booking ↗
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">Specialities</h4>
            <ul className="space-y-2.5">
              {specialties.map(s => (
                <li key={s}>
                  <a href="#doctors" className="text-white/65 hover:text-white text-sm transition-colors flex items-center gap-2 group">
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-5 uppercase tracking-wider text-xs">OPD Hours</h4>
            <div className="space-y-2 text-sm mb-7">
              <div className="flex justify-between text-white/70"><span>Mon – Fri</span><span className="text-white">8:00 AM – 8:00 PM</span></div>
              <div className="flex justify-between text-white/70"><span>Saturday</span><span className="text-white">9:00 AM – 5:00 PM</span></div>
              <div className="flex justify-between text-white/70"><span>Sunday</span><span className="text-white">Emergencies only</span></div>
              <div className="pt-2 border-t border-white/10">
                <span className="text-green-300 font-semibold text-xs">● Emergency & ICU — 24/7</span>
              </div>
            </div>

            <h4 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Follow Us</h4>
            <div className="flex gap-2.5">
              {[{ label: 'fb', name: 'Facebook' }, { label: 'ig', name: 'Instagram' }, { label: 'tw', name: 'Twitter' }, { label: 'yt', name: 'YouTube' }].map(s => (
                <a key={s.name} href="#" aria-label={s.name}
                  className="w-9 h-9 bg-white/10 hover:bg-accent rounded-lg flex items-center justify-center text-xs font-bold text-white transition-colors">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>© 2026 Carewell Hospital, Bengaluru. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">NABH Certificate</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
