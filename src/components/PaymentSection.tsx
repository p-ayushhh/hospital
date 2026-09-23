import { useState } from 'react'

interface InvoiceData {
  invoiceNumber: string
  transactionId: string
  patientName: string
  patientId: string
  service: string
  doctorName: string
  appointmentDate: string
  amount: string
  paymentMethod: string
  paymentDate: string
}

export default function PaymentSection() {
  const [form, setForm] = useState({
    patientName: '', patientId: '', service: '', doctorName: '', appointmentDate: '',
    cardNumber: '', expiry: '', cvv: '', cardHolder: '', amount: '',
  })
  const [showInvoice, setShowInvoice] = useState(false)
  const [invoice, setInvoice] = useState<InvoiceData | null>(null)
  const [processing, setProcessing] = useState(false)

  const services = ['Consultation', 'Lab Tests', 'Imaging / X-Ray', 'Surgery', 'Emergency Care', 'Physiotherapy', 'Pharmacy', 'Other']

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    await new Promise(r => setTimeout(r, 2000))
    const inv: InvoiceData = {
      invoiceNumber: 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      transactionId: 'TXN-' + Date.now().toString(36).toUpperCase(),
      patientName: form.patientName,
      patientId: form.patientId || 'P-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      service: form.service,
      doctorName: form.doctorName,
      appointmentDate: form.appointmentDate,
      amount: form.amount,
      paymentMethod: `Card ending ****${form.cardNumber.replace(/\s/g, '').slice(-4)}`,
      paymentDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    }
    setInvoice(inv)
    setProcessing(false)
    setShowInvoice(true)
  }

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, '').substring(0, 16)
    return digits.replace(/(\d{4})/g, '$1 ').trim()
  }

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').substring(0, 4)
    if (digits.length >= 2) return digits.substring(0, 2) + '/' + digits.substring(2)
    return digits
  }

  return (
    <section id="payment" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Secure Payments</span>
          <h2 className="font-display text-primary text-4xl lg:text-5xl mt-2 mb-4">Online Payment</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Pay for consultations, lab tests, surgeries, and other hospital services securely online. A detailed invoice is generated instantly. UPI, Cards & Net Banking accepted.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Payment form */}
          <div className="lg:col-span-3">
            <form onSubmit={handlePayment} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-surface rounded-full flex items-center justify-center text-primary text-sm font-bold">1</span>
                  Patient & Service Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient Name *</label>
                    <input required value={form.patientName} onChange={e => setForm({ ...form, patientName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Full name" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Patient ID</label>
                    <input value={form.patientId} onChange={e => setForm({ ...form, patientId: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="e.g. P-00123" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Service *</label>
                    <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 bg-white transition-all">
                      <option value="">Select service</option>
                      {services.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Doctor / Specialist</label>
                    <input value={form.doctorName} onChange={e => setForm({ ...form, doctorName: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Doctor name" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Appointment Date</label>
                    <input type="date" value={form.appointmentDate} onChange={e => setForm({ ...form, appointmentDate: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (INR) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">₹</span>
                      <input required type="number" min="1" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="0.00" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
                  <span className="w-7 h-7 bg-surface rounded-full flex items-center justify-center text-primary text-sm font-bold">2</span>
                  Payment Details
                  <span className="ml-auto flex items-center gap-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><span>🔒</span> SSL Secured</span>
                  </span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number *</label>
                    <input required value={form.cardNumber} onChange={e => setForm({ ...form, cardNumber: formatCard(e.target.value) })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Cardholder Name *</label>
                    <input required value={form.cardHolder} onChange={e => setForm({ ...form, cardHolder: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                      placeholder="Name as on card" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry *</label>
                      <input required value={form.expiry} onChange={e => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV *</label>
                      <input required value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                        placeholder="•••" maxLength={4} />
                    </div>
                  </div>
                </div>
              </div>

              <button type="submit" disabled={processing}
                className="w-full bg-primary text-white py-4 rounded-xl font-semibold text-base hover:bg-primary-hover disabled:opacity-70 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                {processing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>🔒 Pay {form.amount ? `₹${form.amount}` : 'Now'}</>
                )}
              </button>
            </form>
          </div>

          {/* Info panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-surface rounded-2xl p-6">
              <h4 className="font-semibold text-gray-800 mb-3">Why Pay Online?</h4>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {['No waiting at billing counters', 'Instant invoice generation', 'Secure SSL-encrypted transactions', 'Multiple payment methods accepted', 'Email confirmation sent instantly'].map(item => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-primary rounded-2xl p-6 text-white">
              <h4 className="font-semibold mb-2">Need Help?</h4>
              <p className="text-white/80 text-sm mb-4">For billing inquiries or payment assistance, contact our billing department.</p>
              <a href="tel:+918800100201" className="flex items-center gap-2 text-accent font-semibold text-sm hover:underline">📞 +91 88001 00201</a>
              <a href="mailto:billing@carewellhospital.in" className="flex items-center gap-2 text-accent font-semibold text-sm hover:underline mt-1.5">✉ billing@carewellhospital.in</a>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">We Accept</h4>
              <div className="flex flex-wrap gap-2">
                {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'].map(card => (
                  <span key={card} className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600">{card}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && invoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              {/* Invoice header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white text-lg font-bold">+</div>
                    <span className="font-display text-primary text-lg">CareFirst Medical Center</span>
                  </div>
                  <p className="text-xs text-gray-400">123 Medical Drive, Healthcare City, HC 45678</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">INVOICE</p>
                  <p className="text-xs text-gray-400 font-mono">{invoice.invoiceNumber}</p>
                </div>
              </div>

              <div className="w-full h-px bg-gray-200 mb-5" />

              <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
                <div>
                  <p className="text-gray-400 text-xs mb-0.5">Billed To</p>
                  <p className="font-semibold text-gray-800">{invoice.patientName}</p>
                  <p className="text-gray-500 font-mono text-xs">{invoice.patientId}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-xs mb-0.5">Payment Date</p>
                  <p className="font-semibold text-gray-800">{invoice.paymentDate}</p>
                  <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium mt-0.5">PAID</span>
                </div>
              </div>

              <div className="bg-surface rounded-xl overflow-hidden mb-5">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left p-3 text-gray-500 text-xs font-medium uppercase tracking-wider">Description</th>
                      <th className="text-right p-3 text-gray-500 text-xs font-medium uppercase tracking-wider">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">
                        <p className="font-medium text-gray-800">{invoice.service}</p>
                        {invoice.doctorName && <p className="text-xs text-gray-400">{invoice.doctorName}</p>}
                        {invoice.appointmentDate && <p className="text-xs text-gray-400">{invoice.appointmentDate}</p>}
                      </td>
                      <td className="p-3 text-right font-semibold text-gray-800">${invoice.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-2 mb-5 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${invoice.amount}</span></div>
                <div className="flex justify-between text-gray-500"><span>Tax (0%)</span><span>₹0.00</span></div>
                <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-200">
                  <span>Total Paid</span>
                  <span className="font-display text-primary text-xl">${invoice.amount}</span>
                </div>
              </div>

              <div className="bg-surface rounded-xl p-4 space-y-1.5 text-xs mb-6">
                <div className="flex justify-between text-gray-600"><span className="text-gray-400">Payment Method</span><span>{invoice.paymentMethod}</span></div>
                <div className="flex justify-between text-gray-600"><span className="text-gray-400">Transaction ID</span><span className="font-mono">{invoice.transactionId}</span></div>
                <div className="flex justify-between text-gray-600"><span className="text-gray-400">Invoice Status</span><span className="text-green-600 font-semibold">Paid in Full</span></div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowInvoice(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">Close</button>
                <button onClick={() => window.print()} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">🖨 Print Invoice</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
