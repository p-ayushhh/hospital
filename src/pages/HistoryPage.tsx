import { useState } from 'react'
import { useApp } from '../context/AppContext'
import HospitalLogo from '../components/HospitalLogo'

type Tab = 'appointments' | 'transactions' | 'food-orders' | 'food-payments'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'transactions', label: 'Appointment Payments', icon: '💳' },
  { id: 'food-orders', label: 'Food Orders', icon: '🍽' },
  { id: 'food-payments', label: 'Food Payments', icon: '🧾' },
]

function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Confirmed: 'bg-blue-100 text-blue-700',
    Completed: 'bg-green-100 text-green-700',
    Cancelled: 'bg-red-100 text-red-600',
    Pending: 'bg-amber-100 text-amber-700',
    Paid: 'bg-green-100 text-green-700',
    Success: 'bg-green-100 text-green-700',
    Failed: 'bg-red-100 text-red-600',
    Placed: 'bg-blue-100 text-blue-700',
    Preparing: 'bg-purple-100 text-purple-700',
    Delivered: 'bg-green-100 text-green-700',
  }
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

export default function HistoryPage() {
  const { appointments, transactions, foodOrders, foodTransactions } = useApp()
  const [activeTab, setActiveTab] = useState<Tab>('appointments')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
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
                <p className="font-display text-base leading-none">My History</p>
                <p className="text-white/50 text-[10px] uppercase tracking-wide">Carewell Hospital</p>
              </div>
            </div>
          </div>
        </div>
        {/* Tabs */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === t.id ? 'border-accent text-white' : 'border-transparent text-white/60 hover:text-white'}`}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Appointment History */}
        {activeTab === 'appointments' && (
          <div>
            <h2 className="font-display text-primary text-2xl mb-6">Appointment History</h2>
            {appointments.length === 0 ? (
              <Empty icon="📅" message="No appointments booked yet." />
            ) : (
              <div className="space-y-4">
                {appointments.map(a => (
                  <div key={a.appointmentId} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-accent font-bold">{a.appointmentId}</span>
                          <Badge status={a.status} />
                          <Badge status={a.paymentStatus} />
                        </div>
                        <h3 className="font-semibold text-gray-800 text-lg">{a.doctorName}</h3>
                        <p className="text-sm text-accent font-medium">{a.specialization}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display text-primary text-2xl">₹{a.consultationFee}</p>
                        <p className="text-xs text-gray-400">Consultation Fee</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
                      {[
                        ['Patient', a.patientName],
                        ['Mobile', a.patientPhone],
                        ['Appointment Date', a.appointmentDate],
                        ['Time', a.appointmentTime],
                        ['Booking Date', a.bookingDate],
                        a.transactionId ? ['Transaction ID', a.transactionId] : ['Transaction ID', 'Not paid yet'],
                      ].map(([label, value]) => (
                        <div key={label}>
                          <p className="text-xs text-gray-400">{label}</p>
                          <p className={`font-medium text-sm ${label === 'Transaction ID' && value === 'Not paid yet' ? 'text-amber-600' : 'text-gray-800'}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Appointment Transactions */}
        {activeTab === 'transactions' && (
          <div>
            <h2 className="font-display text-primary text-2xl mb-6">Appointment Payment History</h2>
            {transactions.length === 0 ? (
              <Empty icon="💳" message="No appointment payments recorded yet." />
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm bg-white">
                  <thead className="bg-surface border-b border-gray-100">
                    <tr>
                      {['Transaction ID', 'Appointment ID', 'Patient', 'Doctor', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {transactions.map(t => (
                      <tr key={t.transactionId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-accent">{t.transactionId}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{t.appointmentId}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{t.patientName}</td>
                        <td className="px-4 py-3 text-gray-600">{t.doctorName}</td>
                        <td className="px-4 py-3 font-display text-primary">₹{t.amount}</td>
                        <td className="px-4 py-3 text-gray-600">{t.paymentMethod}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{t.paymentDate}</td>
                        <td className="px-4 py-3"><Badge status={t.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Food Orders */}
        {activeTab === 'food-orders' && (
          <div>
            <h2 className="font-display text-primary text-2xl mb-6">Food Order History</h2>
            {foodOrders.length === 0 ? (
              <Empty icon="🍽" message="No food orders placed yet." />
            ) : (
              <div className="space-y-4">
                {foodOrders.map(o => (
                  <div key={o.orderId} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-5">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-accent font-bold">{o.orderId}</span>
                            <Badge status={o.status} />
                            <Badge status={o.paymentStatus} />
                          </div>
                          <p className="font-semibold text-gray-800">{o.patientName}</p>
                          <p className="text-sm text-gray-500">{o.roomNumber} · {o.orderDate} at {o.orderTime}</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-display text-primary text-2xl">₹{o.totalAmount}</p>
                          {o.transactionId && <p className="text-xs text-gray-400 font-mono">{o.transactionId}</p>}
                        </div>
                      </div>
                      <button onClick={() => setExpandedOrder(expandedOrder === o.orderId ? null : o.orderId)}
                        className="text-sm text-primary font-medium hover:underline">
                        {expandedOrder === o.orderId ? '▲ Hide items' : `▼ Show ${o.items.length} item(s)`}
                      </button>
                    </div>
                    {expandedOrder === o.orderId && (
                      <div className="border-t border-gray-100 bg-surface px-5 py-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-gray-400 text-xs">
                              <th className="text-left pb-2">Item</th>
                              <th className="text-center pb-2">Qty</th>
                              <th className="text-right pb-2">Unit Price</th>
                              <th className="text-right pb-2">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {o.items.map(item => (
                              <tr key={item.id}>
                                <td className="py-2 font-medium text-gray-800">{item.name}</td>
                                <td className="py-2 text-center text-gray-600">{item.qty}</td>
                                <td className="py-2 text-right text-gray-600">₹{item.price}</td>
                                <td className="py-2 text-right font-semibold text-gray-800">₹{item.price * item.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot>
                            <tr className="border-t border-gray-200">
                              <td colSpan={3} className="pt-2 font-bold text-gray-700">Total</td>
                              <td className="pt-2 text-right font-display text-primary text-lg">₹{o.totalAmount}</td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Food Payments */}
        {activeTab === 'food-payments' && (
          <div>
            <h2 className="font-display text-primary text-2xl mb-6">Food Payment History</h2>
            {foodTransactions.length === 0 ? (
              <Empty icon="🧾" message="No food payments recorded yet." />
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                <table className="w-full text-sm bg-white">
                  <thead className="bg-surface border-b border-gray-100">
                    <tr>
                      {['Transaction ID', 'Order ID', 'Patient', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {foodTransactions.map(t => (
                      <tr key={t.transactionId} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-accent">{t.transactionId}</td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{t.orderId}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{t.patientName}</td>
                        <td className="px-4 py-3 font-display text-primary">₹{t.amount}</td>
                        <td className="px-4 py-3 text-gray-600">{t.paymentMethod}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{t.paymentDate}</td>
                        <td className="px-4 py-3"><Badge status={t.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function Empty({ icon, message }: { icon: string; message: string }) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
      <p className="text-5xl mb-4">{icon}</p>
      <p className="text-gray-500 font-medium">{message}</p>
      <a href="/" className="mt-4 inline-block text-sm text-primary hover:underline">← Back to Carewell Hospital</a>
    </div>
  )
}
