import { useState, useEffect } from 'react'
import { doctors, type Doctor } from '../data/hospitalData'
import { useApp, type AppointmentRecord } from '../context/AppContext'
import HospitalLogo from '../components/HospitalLogo'

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM',
]

interface Form {
  patientName: string; email: string; phone: string; dob: string
  gender: string; address: string; date: string; timeSlot: string; reason: string
}

export default function AppointmentPage() {
  const { addAppointment } = useApp()
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [deptFilter, setDeptFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [bookingId, setBookingId] = useState('')
  const [form, setForm] = useState<Form>({
    patientName: '', email: '', phone: '', dob: '', gender: '', address: '', date: '', timeSlot: '', reason: '',
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const docId = params.get('doctorId')
    if (docId) {
      const doc = doctors.find(d => d.id === docId)
      if (doc) { setSelectedDoctor(doc); setStep(2) }
    }
    document.title = 'Book Appointment — Carewell Hospital'
  }, [])

  const departments = ['All', ...Array.from(new Set(doctors.map(d => d.department)))]
  const filteredDoctors = doctors.filter(d => {
    const matchDept = deptFilter === 'All' || d.department === deptFilter
    const matchSearch = searchQuery === '' || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
    return matchDept && matchSearch
  })

  const handlePatientSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(3)
  }

  const handleConfirm = () => {
    const id = 'APT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
    const now = new Date()
    const record: AppointmentRecord = {
      appointmentId: id,
      doctorId: selectedDoctor!.id,
      doctorName: selectedDoctor!.name,
      specialization: selectedDoctor!.specialization,
      appointmentDate: form.date,
      appointmentTime: form.timeSlot,
      bookingDate: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      consultationFee: selectedDoctor!.consultationFee,
      status: 'Confirmed',
      paymentStatus: 'Pending',
      patientName: form.patientName,
      patientPhone: form.phone,
      patientEmail: form.email,
    }
    addAppointment(record)
    setBookingId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Back
            </a>
            <span className="text-white/30">|</span>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 40 40" fill="none" className="w-5 h-5"><rect x="15" y="5" width="10" height="30" rx="2" fill="white" /><rect x="5" y="15" width="30" height="10" rx="2" fill="white" /><circle cx="20" cy="20" r="3" fill="#00B4D8" /></svg>
              </div>
              <div>
                <p className="font-display text-base leading-none">Carewell Hospital</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wide">Book an Appointment</p>
              </div>
            </div>
          </div>
          <a href="tel:+918800100200" className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
            📞 +91 88001 00200
          </a>
        </div>

        {/* Progress */}
        <div className="bg-primary-hover">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2 flex items-center gap-1">
            {[{ n: 1, label: 'Select Doctor' }, { n: 2, label: 'Patient Details' }, { n: 3, label: 'Confirmation' }].map(({ n, label }, i) => (
              <div key={n} className="flex items-center gap-1 flex-1">
                <div className={`flex items-center gap-1.5 ${step >= n ? 'text-white' : 'text-white/40'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${step > n ? 'bg-green-400 text-white' : step === n ? 'bg-accent text-white' : 'bg-white/20 text-white/50'}`}>
                    {step > n ? '✓' : n}
                  </span>
                  <span className="text-xs font-medium hidden sm:block">{label}</span>
                </div>
                {i < 2 && <div className={`flex-1 h-px mx-2 ${step > n ? 'bg-green-400' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="mb-6">
              <h2 className="font-display text-primary text-3xl mb-1">Choose Your Doctor</h2>
              <p className="text-gray-500">Board-certified specialists trained at AIIMS, PGI, JIPMER and premier Indian institutions.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name or specialization..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {departments.map(dept => (
                  <button key={dept} onClick={() => setDeptFilter(dept)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${deptFilter === dept ? 'bg-primary text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary hover:text-primary'}`}>
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDoctors.map(doctor => (
                <div key={doctor.id}
                  className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${selectedDoctor?.id === doctor.id ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100 hover:border-accent/40 hover:shadow-md'}`}>
                  <div className="relative">
                    <img src={doctor.photo} alt={doctor.name} className="w-full h-44 object-cover object-top" />
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                        {doctor.available ? '● Available' : '● Unavailable'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-primary text-lg mb-0.5">{doctor.name}</h3>
                    <p className="text-accent text-sm font-semibold mb-2">{doctor.specialization}</p>
                    <div className="space-y-1 text-xs text-gray-500 mb-3">
                      <div className="flex gap-2"><span>🎓</span><span>{doctor.qualification}</span></div>
                      <div className="flex gap-2"><span>⏱</span><span>{doctor.experience}</span></div>
                      <div className="flex gap-2"><span>📅</span><span>{doctor.availableDays.join(', ')} · {doctor.timings}</span></div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-400">Fee</p>
                        <p className="font-display text-primary text-lg">₹{doctor.consultationFee}</p>
                      </div>
                      <button disabled={!doctor.available}
                        onClick={() => { setSelectedDoctor(doctor); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                        className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && selectedDoctor && (
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h2 className="font-display text-primary text-3xl mb-1">Patient Information</h2>
              <p className="text-gray-500">Fill in your details to confirm the appointment.</p>
            </div>
            <div className="bg-surface rounded-2xl p-4 flex items-center gap-4 mb-6 border border-primary/10">
              <img src={selectedDoctor.photo} alt={selectedDoctor.name} className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{selectedDoctor.name}</p>
                <p className="text-sm text-gray-500">{selectedDoctor.specialization} · {selectedDoctor.department}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-display text-primary text-2xl">₹{selectedDoctor.consultationFee}</p>
                <p className="text-xs text-gray-400">Fee</p>
              </div>
              <button onClick={() => setStep(1)} className="text-xs text-primary underline ml-2 flex-shrink-0">Change</button>
            </div>
            <form onSubmit={handlePatientSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Patient Name *', value: form.patientName, key: 'patientName', type: 'text', placeholder: 'Full name', required: true },
                  { label: 'Email Address *', value: form.email, key: 'email', type: 'email', placeholder: 'you@example.com', required: true },
                  { label: 'Mobile Number *', value: form.phone, key: 'phone', type: 'text', placeholder: '+91 98XXX XXXXX', required: true },
                  { label: 'Date of Birth *', value: form.dob, key: 'dob', type: 'date', placeholder: '', required: true },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                    <input required={f.required} type={f.type} value={f.value}
                      onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender *</label>
                  <select required value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white">
                    <option value="">Select</option>
                    {['Male', 'Female', 'Other', 'Prefer not to say'].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date *</label>
                  <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                  <input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Your current address" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time Slot *</label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {timeSlots.map(slot => (
                    <button key={slot} type="button" onClick={() => setForm({ ...form, timeSlot: slot })}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all ${form.timeSlot === slot ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary hover:text-primary'}`}>
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chief Complaint</label>
                <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                  placeholder="Briefly describe your symptoms..." />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">← Back</button>
                <button type="submit" className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                  Review & Confirm
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && selectedDoctor && (
          <div className="max-w-2xl mx-auto">
            {!bookingId ? (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                <h2 className="font-display text-primary text-3xl mb-5">Review Appointment</h2>
                <div className="space-y-0 mb-7">
                  {[
                    ['Doctor', selectedDoctor.name],
                    ['Specialization', selectedDoctor.specialization],
                    ['Patient', form.patientName],
                    ['Mobile', form.phone],
                    ['Email', form.email],
                    ['Date', form.date],
                    ['Time', form.timeSlot],
                    form.reason ? ['Complaint', form.reason] : null,
                  ].filter((x): x is [string, string] => x !== null).map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                      <span className="text-gray-400">{label}</span>
                      <span className="font-semibold text-gray-800 text-right max-w-xs">{value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-3 text-sm">
                    <span className="text-gray-500">Consultation Fee</span>
                    <span className="font-display text-primary text-2xl">₹{selectedDoctor.consultationFee}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">← Edit</button>
                  <button onClick={handleConfirm} className="flex-1 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                    ✓ Confirm Appointment
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-10 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <HospitalLogo size="sm" className="justify-center mb-4" />
                <h2 className="font-display text-primary text-4xl mb-2">Appointment Booked!</h2>
                <p className="text-gray-500 mb-5">Your booking reference number</p>
                <div className="inline-block bg-surface border-2 border-primary/20 rounded-2xl px-10 py-4 mb-6">
                  <p className="font-mono text-2xl font-bold text-primary tracking-[0.2em]">{bookingId}</p>
                </div>
                <div className="text-left bg-surface rounded-2xl p-5 space-y-2.5 mb-6 text-sm">
                  <div className="flex justify-between"><span className="text-gray-400">Doctor</span><span className="font-semibold">{selectedDoctor.name}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Patient</span><span className="font-semibold">{form.patientName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Date & Time</span><span className="font-semibold">{form.date} at {form.timeSlot}</span></div>
                  <div className="flex justify-between"><span className="text-gray-400">Payment Status</span><span className="text-amber-600 font-semibold">Pending</span></div>
                  <div className="flex justify-between border-t border-gray-200 pt-2.5"><span className="text-gray-400">Fee Payable</span><span className="font-display text-primary text-xl">₹{selectedDoctor.consultationFee}</span></div>
                </div>
                <p className="text-sm text-gray-400 mb-6">Confirmation SMS sent to {form.phone}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button onClick={() => window.print()} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">🖨 Print</button>
                  <a href={`${window.location.pathname}?page=history`} target="_blank" rel="noreferrer"
                    className="px-5 py-2.5 bg-surface text-primary rounded-xl text-sm font-semibold hover:bg-primary/10">
                    View History ↗
                  </a>
                  <a href={`${window.location.pathname}?page=payment`} target="_blank" rel="noreferrer"
                    className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover">
                    Make Payment →
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
