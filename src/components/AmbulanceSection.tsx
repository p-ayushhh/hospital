import { useState } from 'react'

export default function AmbulanceSection() {
  const [form, setForm] = useState({
    patientName: '', contact: '', pickup: '', destination: '', emergency: 'Emergency', type: 'BLS Ambulance', time: '', requirements: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [requestId, setRequestId] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setRequestId('AMB-' + Math.random().toString(36).substring(2, 8).toUpperCase())
    setSubmitted(true)
  }

  return (
    <section id="ambulance" className="py-20 bg-red-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-red-500 text-sm font-semibold uppercase tracking-widest">Emergency Services</span>
          <h2 className="font-display text-primary text-4xl lg:text-5xl mt-2 mb-4">Ambulance Booking</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Our fleet of ACLS-equipped ambulances with trained paramedics covers all of Bengaluru and surrounding areas, 24/7.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-5">
            <div className="bg-red-600 rounded-2xl p-6 text-white">
              <div className="text-4xl mb-3">🚑</div>
              <h3 className="font-display text-2xl mb-2">Emergency?</h3>
              <p className="text-red-100 text-sm mb-4">For life-threatening emergencies, call immediately — do not wait for online booking.</p>
              <a href="tel:108" className="block w-full text-center bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors text-2xl">
                📞 108
              </a>
              <p className="text-red-200 text-xs mt-2 text-center">National Ambulance Service (Free)</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
              <h3 className="font-semibold text-gray-800">Our Ambulance Fleet</h3>
              {[
                { type: 'BLS Ambulance', desc: 'Basic life support for stable patients', icon: '🚑' },
                { type: 'ALS Ambulance', desc: 'Advanced life support with cardiac monitor', icon: '🚨' },
                { type: 'Neonatal', desc: 'Specialised incubator for newborns', icon: '👶' },
                { type: 'Air Ambulance', desc: 'Helicopter for remote or critical cases', icon: '🚁' },
              ].map(a => (
                <div key={a.type} className="flex items-start gap-3">
                  <span className="text-2xl">{a.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{a.type}</p>
                    <p className="text-xs text-gray-400">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-primary rounded-2xl p-5 text-white">
              <h4 className="font-semibold mb-2 text-sm">Response Times – Bengaluru</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-white/70">City Centre</span><span className="font-bold text-green-300">8–12 min</span></div>
                <div className="flex justify-between"><span className="text-white/70">Outer Ring Road</span><span className="font-bold text-yellow-300">15–20 min</span></div>
                <div className="flex justify-between"><span className="text-white/70">Peripheral Areas</span><span className="font-bold text-orange-300">25–35 min</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {!submitted ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h3 className="font-semibold text-gray-800 text-lg mb-6">Request an Ambulance</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient Name *</label>
                      <input required value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Number *</label>
                      <input required value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="+91 98XXX XXXXX" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Location *</label>
                      <input required value={form.pickup} onChange={e => setForm({ ...form, pickup: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Full address, landmark or GPS coordinates in Bengaluru" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Destination Hospital</label>
                      <input value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="Leave blank to transport to Carewell Hospital, Bengaluru" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Priority *</label>
                      <div className="flex gap-2">
                        {['Emergency', 'Non-Emergency'].map(opt => (
                          <button key={opt} type="button" onClick={() => setForm({ ...form, emergency: opt })}
                            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${form.emergency === opt ? (opt === 'Emergency' ? 'bg-red-500 text-white border-red-500' : 'bg-primary text-white border-primary') : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                            {opt === 'Emergency' ? '🚨' : '🏥'} {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Ambulance Type *</label>
                      <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white transition-all">
                        <option>BLS Ambulance</option>
                        <option>ALS Ambulance</option>
                        <option>Neonatal Ambulance</option>
                        <option>Air Ambulance</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time</label>
                      <input type="datetime-local" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requirements</label>
                      <input value={form.requirements} onChange={e => setForm({ ...form, requirements: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="e.g. wheelchair, oxygen, stretcher" />
                    </div>
                  </div>

                  <button type="submit"
                    className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-base hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                    🚑 Request Ambulance Now
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🚑</span>
                </div>
                <h3 className="font-display text-primary text-3xl mb-2">Request Confirmed!</h3>
                <p className="text-gray-500 mb-4">Your ambulance is being dispatched from Carewell Hospital</p>
                <div className="inline-block bg-red-50 border-2 border-red-200 rounded-2xl px-8 py-4 mb-6">
                  <p className="font-mono text-2xl font-bold text-red-600 tracking-widest">{requestId}</p>
                </div>
                <div className="text-left bg-surface rounded-2xl p-5 space-y-3 mb-6 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Patient</span><span className="font-semibold">{form.patientName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Pickup</span><span className="font-semibold">{form.pickup}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Type</span><span className="font-semibold">{form.type}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Priority</span>
                    <span className={`font-semibold ${form.emergency === 'Emergency' ? 'text-red-600' : 'text-primary'}`}>{form.emergency}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mb-6">Estimated arrival: <strong>8–15 minutes</strong></p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ patientName: '', contact: '', pickup: '', destination: '', emergency: 'Emergency', type: 'BLS Ambulance', time: '', requirements: '' }) }}
                  className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  New Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
