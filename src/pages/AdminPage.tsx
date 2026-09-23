import { useState } from 'react'
import { useApp, type FoodTimings, type FoodCategoryKey } from '../context/AppContext'

const CATEGORIES: FoodCategoryKey[] = ['Morning Breakfast', 'Afternoon Food', 'Snack Food', 'Dinner Food']
const CATEGORY_ICONS: Record<FoodCategoryKey, string> = {
  'Morning Breakfast': '🌅',
  'Afternoon Food': '☀️',
  'Snack Food': '🫖',
  'Dinner Food': '🌙',
}

function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number)
  const ampm = h >= 12 ? 'PM' : 'AM'
  return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${ampm}`
}

export default function AdminPage() {
  const { foodTimings, updateFoodTimings, isCategoryAvailable, appointments, foodOrders } = useApp()
  const [timings, setTimings] = useState<FoodTimings>({ ...foodTimings })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateFoodTimings(timings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const update = (cat: FoodCategoryKey, field: string, value: string | boolean) =>
    setTimings(p => ({ ...p, [cat]: { ...p[cat], [field]: value } }))

  const pendingAppointments = appointments.filter(a => a.status === 'Confirmed').length
  const todayOrders = foodOrders.filter(o => o.status === 'Placed' || o.status === 'Preparing').length

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-primary text-white sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
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
                <p className="font-display text-base leading-none">Admin Panel</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wide">Carewell Hospital</p>
              </div>
            </div>
          </div>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Staff Access</span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Dashboard stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Appointments', value: appointments.length, icon: '📅', color: 'text-primary' },
            { label: 'Pending Appointments', value: pendingAppointments, icon: '⏳', color: 'text-amber-600' },
            { label: 'Total Food Orders', value: foodOrders.length, icon: '🍽', color: 'text-green-600' },
            { label: 'Active Food Orders', value: todayOrders, icon: '🔄', color: 'text-accent' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className={`font-display text-3xl ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Food Category Timing Config */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-primary text-2xl">Food Category Timings</h2>
              <p className="text-gray-500 text-sm mt-0.5">Configure when each food category is available for ordering.</p>
            </div>
            <button onClick={handleSave}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? 'bg-green-500 text-white' : 'bg-primary text-white hover:bg-primary-hover'}`}>
              {saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map(cat => {
              const t = timings[cat]
              const available = isCategoryAvailable(cat)
              return (
                <div key={cat} className={`rounded-xl border-2 p-5 transition-all ${t.enabled ? 'border-primary/20 bg-surface' : 'border-gray-200 bg-gray-50'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">{CATEGORY_ICONS[cat]}</span>
                      <div>
                        <p className="font-semibold text-gray-800">{cat}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs font-medium ${available ? 'text-green-600' : 'text-gray-400'}`}>
                            {available ? '● Currently Open' : '● Currently Closed'}
                          </span>
                          {t.enabled && (
                            <span className="text-xs text-gray-400">({fmtTime(t.startTime)} – {fmtTime(t.endTime)})</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-600">Start</label>
                        <input type="time" value={t.startTime}
                          onChange={e => update(cat, 'startTime', e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white" />
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-medium text-gray-600">End</label>
                        <input type="time" value={t.endTime}
                          onChange={e => update(cat, 'endTime', e.target.value)}
                          className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white" />
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => update(cat, 'enabled', !t.enabled)}
                          className={`w-10 h-6 rounded-full transition-colors relative cursor-pointer ${t.enabled ? 'bg-primary' : 'bg-gray-300'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${t.enabled ? 'left-5' : 'left-1'}`} />
                        </div>
                        <span className="text-xs text-gray-600 font-medium">{t.enabled ? 'Enabled' : 'Disabled'}</span>
                      </label>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex justify-end">
            <button onClick={handleSave}
              className={`px-7 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${saved ? 'bg-green-500 text-white shadow-green-500/20' : 'bg-primary text-white hover:bg-primary-hover shadow-primary/20'}`}>
              {saved ? '✓ Changes Saved Successfully!' : 'Save All Changes'}
            </button>
          </div>
        </div>

        {/* Quick navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'View All Appointments', href: '?page=history', icon: '📅' },
            { label: 'View Food Orders', href: '?page=history', icon: '🍽' },
            { label: 'Open Food Menu', href: '?page=food', icon: '🛒' },
          ].map(link => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center gap-3 hover:border-primary/30 hover:shadow-md transition-all">
              <span className="text-2xl">{link.icon}</span>
              <span className="font-medium text-gray-800 text-sm">{link.label} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
