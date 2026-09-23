import { useState, useEffect } from 'react'
import { foodItems, type FoodItem, type FoodCategory } from '../data/hospitalData'
import { useApp, type FoodOrderRecord, type FoodTransactionRecord } from '../context/AppContext'
import HospitalLogo, { HospitalLogoWhite } from '../components/HospitalLogo'

interface CartItem { item: FoodItem; qty: number }

const CATEGORIES: FoodCategory[] = ['Morning Breakfast', 'Afternoon Food', 'Snack Food', 'Dinner Food']

const CATEGORY_ICONS: Record<FoodCategory, string> = {
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

function InvoiceModal({ order, onClose }: { order: FoodOrderRecord; onClose: () => void }) {
  const txn = order.transactionId || 'N/A'
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto" id="food-invoice">
        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <HospitalLogo size="md" />
            <div className="text-right">
              <p className="font-bold text-gray-800 text-sm">FOOD INVOICE</p>
              <p className="text-xs text-gray-400 font-mono">{order.orderId}</p>
            </div>
          </div>
          <div className="h-px bg-gray-200 mb-5" />

          <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-0.5">Customer</p>
              <p className="font-semibold text-gray-800">{order.patientName}</p>
              <p className="text-gray-500 text-xs">{order.roomNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs mb-0.5">Order Date & Time</p>
              <p className="font-semibold text-gray-800">{order.orderDate}</p>
              <p className="text-gray-500 text-xs">{order.orderTime}</p>
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium mt-1">PAID</span>
            </div>
          </div>

          {/* Items table */}
          <div className="bg-surface rounded-xl overflow-hidden mb-5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 text-gray-500 text-xs font-medium">Item</th>
                  <th className="text-center p-3 text-gray-500 text-xs font-medium">Qty</th>
                  <th className="text-right p-3 text-gray-500 text-xs font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map(item => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-0">
                    <td className="p-3 font-medium text-gray-800">{item.name}</td>
                    <td className="p-3 text-center text-gray-600">{item.qty}</td>
                    <td className="p-3 text-right text-gray-800">₹{(item.price * item.qty).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-1.5 mb-5 text-sm">
            <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{order.totalAmount}</span></div>
            <div className="flex justify-between text-gray-500"><span>GST (0%)</span><span>₹0.00</span></div>
            <div className="flex justify-between font-bold text-gray-800 text-base pt-2 border-t border-gray-200">
              <span>Total Paid</span>
              <span className="font-display text-primary text-xl">₹{order.totalAmount}</span>
            </div>
          </div>

          <div className="bg-surface rounded-xl p-4 space-y-1.5 text-xs mb-6">
            <div className="flex justify-between text-gray-600"><span className="text-gray-400">Transaction ID</span><span className="font-mono">{txn}</span></div>
            <div className="flex justify-between text-gray-600"><span className="text-gray-400">Payment Status</span><span className="text-green-600 font-semibold">Paid in Full</span></div>
            <div className="flex justify-between text-gray-600"><span className="text-gray-400">Delivery To</span><span>{order.roomNumber}</span></div>
          </div>

          <p className="text-center text-xs text-gray-400 mb-5">Thank you for ordering from Carewell Hospital Dining Services</p>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50">Close</button>
            <button onClick={() => window.print()} className="flex-1 py-2.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover">🖨 Print</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FoodPage() {
  const { foodTimings, isCategoryAvailable, addFoodOrder, addFoodTransaction, updateFoodOrderPayment } = useApp()
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeCategory, setActiveCategory] = useState<FoodCategory>('Morning Breakfast')
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [showPayment, setShowPayment] = useState(false)
  const [currentOrder, setCurrentOrder] = useState<FoodOrderRecord | null>(null)
  const [showInvoice, setShowInvoice] = useState(false)
  const [delivery, setDelivery] = useState({ name: '', room: '', phone: '', notes: '' })
  const [payForm, setPayForm] = useState({ method: 'UPI', upiId: '', cardNumber: '', expiry: '', cvv: '' })
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [processing, setProcessing] = useState(false)

  useEffect(() => { document.title = 'Food & Dining — Carewell Hospital' }, [])

  const filtered = foodItems.filter(f => f.category === activeCategory)
  const cartTotal = cart.reduce((s, c) => s + c.item.price * c.qty, 0)
  const cartCount = cart.reduce((s, c) => s + c.qty, 0)

  const addToCart = (item: FoodItem) =>
    setCart(p => p.find(c => c.item.id === item.id) ? p.map(c => c.item.id === item.id ? { ...c, qty: c.qty + 1 } : c) : [...p, { item, qty: 1 }])

  const updateQty = (id: string, delta: number) =>
    setCart(p => p.map(c => c.item.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c).filter(c => c.qty > 0))

  const getQty = (id: string) => cart.find(c => c.item.id === id)?.qty ?? 0

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    const now = new Date()
    const order: FoodOrderRecord = {
      orderId: 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      items: cart.map(c => ({ id: c.item.id, name: c.item.name, qty: c.qty, price: c.item.price })),
      totalAmount: cartTotal,
      orderDate: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      orderTime: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      patientName: delivery.name,
      roomNumber: delivery.room,
      phone: delivery.phone,
      notes: delivery.notes,
      status: 'Placed',
      paymentStatus: 'Pending',
    }
    addFoodOrder(order)
    setCurrentOrder(order)
    setShowCheckout(false)
    setShowPayment(true)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    await new Promise(r => setTimeout(r, 1800))
    const txnId = 'FTXN-' + Date.now().toString(36).toUpperCase()
    const now = new Date()
    const txn: FoodTransactionRecord = {
      transactionId: txnId,
      orderId: currentOrder!.orderId,
      patientName: currentOrder!.patientName,
      amount: currentOrder!.totalAmount,
      paymentMethod: payForm.method,
      paymentDate: now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'Success',
    }
    addFoodTransaction(txn)
    updateFoodOrderPayment(currentOrder!.orderId, txnId)
    setCurrentOrder(prev => prev ? { ...prev, paymentStatus: 'Paid', transactionId: txnId } : prev)
    setProcessing(false)
    setShowPayment(false)
    setOrderConfirmed(true)
    setCart([])
  }

  const formatCard = (v: string) => v.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim()
  const formatExpiry = (v: string) => { const d = v.replace(/\D/g, '').substring(0, 4); return d.length >= 2 ? d.substring(0, 2) + '/' + d.substring(2) : d }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a href="/" className="flex items-center gap-1 text-gray-500 hover:text-primary text-sm transition-colors flex-shrink-0">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </a>
            <span className="text-gray-300">|</span>
            <HospitalLogo size="sm" />
          </div>
          <button onClick={() => setShowCart(true)}
            className="relative flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors flex-shrink-0">
            🛒 <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full text-white text-xs font-bold flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-primary text-white py-10 px-4 text-center">
        <HospitalLogoWhite size="sm" variant="icon" className="justify-center mb-3" />
        <h2 className="font-display text-3xl sm:text-4xl mb-2">Healthy Hospital Dining</h2>
        <p className="text-white/70 max-w-xl mx-auto text-sm sm:text-base">Nutritionist-approved Indian meals delivered to your room. Fresh, healthy and made with care.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Order confirmed banner */}
        {orderConfirmed && currentOrder && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">✅</div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-800">Order Placed & Payment Confirmed!</h3>
              <p className="text-green-600 text-sm">Order ID: <strong className="font-mono">{currentOrder.orderId}</strong> · Delivery to {currentOrder.roomNumber} in 30–45 minutes.</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button onClick={() => setShowInvoice(true)} className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700">Invoice</button>
              <button onClick={() => setOrderConfirmed(false)} className="text-green-400 hover:text-green-600 text-lg">✕</button>
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {CATEGORIES.map(cat => {
            const timing = foodTimings[cat]
            const available = isCategoryAvailable(cat)
            const active = activeCategory === cat
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all ${active ? 'border-primary bg-primary text-white shadow-lg' : 'border-gray-200 bg-white hover:border-primary/40'}`}>
                <div className="text-2xl mb-2">{CATEGORY_ICONS[cat]}</div>
                <p className={`font-semibold text-sm ${active ? 'text-white' : 'text-gray-800'}`}>{cat}</p>
                <p className={`text-xs mt-0.5 ${active ? 'text-white/80' : 'text-gray-400'}`}>
                  {fmtTime(timing.startTime)} – {fmtTime(timing.endTime)}
                </p>
                <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium ${available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'} ${active ? '!bg-white/20 !text-white' : ''}`}>
                  {available ? '● Open' : '● Closed'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Category closed notice */}
        {!isCategoryAvailable(activeCategory) && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-sm">
            <span className="text-2xl">⏰</span>
            <span className="text-amber-800">
              <strong>{activeCategory}</strong> is currently closed. Available {fmtTime(foodTimings[activeCategory].startTime)} – {fmtTime(foodTimings[activeCategory].endTime)}.
              You can still browse the menu.
            </span>
          </div>
        )}

        {/* Food grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(item => {
            const qty = getQty(item.id)
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all overflow-hidden">
                <div className="relative">
                  <img src={item.image} alt={item.name} className="w-full h-44 object-cover" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${item.isVeg ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {item.isVeg ? '🟢 Veg' : '🔴 Non-Veg'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs px-2 py-0.5 rounded-full text-gray-600 font-medium">
                    {item.calories} kcal
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-base">{item.name}</h3>
                    <span className="font-display text-primary text-lg ml-2 flex-shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-gray-400 text-xs mb-4 leading-relaxed">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-surface text-primary px-2.5 py-1 rounded-full font-medium">{item.category}</span>
                    {qty === 0 ? (
                      <button onClick={() => addToCart(item)}
                        className="bg-primary text-white px-4 py-1.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-surface text-primary font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center">−</button>
                        <span className="font-semibold text-gray-800 w-4 text-center text-sm">{qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full bg-primary text-white font-bold hover:bg-primary-hover transition-colors flex items-center justify-center">+</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Mobile sticky cart */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 left-4 right-4 z-30 sm:hidden">
            <button onClick={() => setShowCart(true)}
              className="w-full bg-primary text-white py-3.5 rounded-2xl shadow-xl font-semibold flex items-center justify-center gap-3">
              🛒 {cartCount} item{cartCount > 1 ? 's' : ''} · ₹{cartTotal}
            </button>
          </div>
        )}
      </div>

      {/* Cart sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40" onClick={() => setShowCart(false)} />
          <div className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display text-primary text-xl">Your Cart</h3>
              <button onClick={() => setShowCart(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 text-gray-400"><p className="text-4xl mb-3">🛒</p><p>Your cart is empty</p></div>
              ) : cart.map(c => (
                <div key={c.item.id} className="flex items-center gap-3">
                  <img src={c.item.image} alt={c.item.name} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{c.item.name}</p>
                    <p className="text-primary text-sm font-display">₹{c.item.price * c.qty}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => updateQty(c.item.id, -1)} className="w-6 h-6 rounded-full bg-surface text-primary font-bold hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-xs">−</button>
                    <span className="text-sm font-semibold w-4 text-center">{c.qty}</span>
                    <button onClick={() => updateQty(c.item.id, 1)} className="w-6 h-6 rounded-full bg-primary text-white font-bold hover:bg-primary-hover transition-colors flex items-center justify-center text-xs">+</button>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-gray-100">
                <div className="flex justify-between mb-3">
                  <span className="text-gray-500 text-sm">Total ({cartCount} items)</span>
                  <span className="font-display text-primary text-lg">₹{cartTotal}</span>
                </div>
                <button onClick={() => { setShowCart(false); setShowCheckout(true) }}
                  className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout modal */}
      {showCheckout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display text-primary text-2xl">Delivery Details</h3>
              <button onClick={() => setShowCheckout(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">✕</button>
            </div>
            <form onSubmit={handlePlaceOrder} className="p-6 space-y-4">
              {[
                { label: 'Patient Name *', value: delivery.name, key: 'name', placeholder: 'Full name' },
                { label: 'Room / Ward *', value: delivery.room, key: 'room', placeholder: 'e.g. Room 304, Ward B' },
                { label: 'Contact Number *', value: delivery.phone, key: 'phone', placeholder: '+91 98XXX XXXXX' },
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                  <input required value={f.value} onChange={e => setDelivery({ ...delivery, [f.key]: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder={f.placeholder} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Dietary Notes / Allergies</label>
                <textarea value={delivery.notes} onChange={e => setDelivery({ ...delivery, notes: e.target.value })}
                  rows={2} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none"
                  placeholder="e.g. no nuts, diabetic-friendly, low sodium" />
              </div>
              <div className="bg-surface rounded-xl p-4 space-y-1.5 text-sm">
                {cart.map(c => (
                  <div key={c.item.id} className="flex justify-between text-gray-600">
                    <span>{c.item.name} × {c.qty}</span><span>₹{c.item.price * c.qty}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-gray-800 pt-2 border-t border-gray-200">
                  <span>Total</span><span className="font-display text-primary text-lg">₹{cartTotal}</span>
                </div>
              </div>
              <button type="submit" className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20">
                Proceed to Payment · ₹{cartTotal}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Payment modal */}
      {showPayment && currentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-display text-primary text-2xl">Food Payment</h3>
              <button onClick={() => setShowPayment(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600">✕</button>
            </div>
            <form onSubmit={handlePayment} className="p-6 space-y-4">
              <div className="bg-surface rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order {currentOrder.orderId}</p>
                  <p className="font-semibold text-gray-800">{currentOrder.items.length} item(s)</p>
                </div>
                <p className="font-display text-primary text-2xl">₹{currentOrder.totalAmount}</p>
              </div>

              {/* Payment method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {['UPI', 'Card', 'Net Banking'].map(m => (
                    <button key={m} type="button" onClick={() => setPayForm({ ...payForm, method: m })}
                      className={`py-2 rounded-xl text-sm font-medium border transition-all ${payForm.method === m ? 'bg-primary text-white border-primary' : 'border-gray-200 text-gray-600 hover:border-primary'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {payForm.method === 'UPI' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">UPI ID *</label>
                  <input required value={payForm.upiId} onChange={e => setPayForm({ ...payForm, upiId: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="yourname@upi" />
                </div>
              )}

              {payForm.method === 'Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number *</label>
                    <input required value={payForm.cardNumber} onChange={e => setPayForm({ ...payForm, cardNumber: formatCard(e.target.value) })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry *</label>
                      <input required value={payForm.expiry} onChange={e => setPayForm({ ...payForm, expiry: formatExpiry(e.target.value) })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="MM/YY" maxLength={5} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV *</label>
                      <input required value={payForm.cvv} onChange={e => setPayForm({ ...payForm, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                        placeholder="•••" maxLength={4} />
                    </div>
                  </div>
                </div>
              )}

              {payForm.method === 'Net Banking' && (
                <div className="bg-surface rounded-xl p-4 text-sm text-gray-600 text-center">
                  You will be redirected to your bank's portal after confirming.
                </div>
              )}

              <button type="submit" disabled={processing}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-semibold hover:bg-primary-hover disabled:opacity-70 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                {processing ? (
                  <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Processing...</>
                ) : <>🔒 Pay ₹{currentOrder.totalAmount}</>}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice modal */}
      {showInvoice && currentOrder && (
        <InvoiceModal order={currentOrder} onClose={() => setShowInvoice(false)} />
      )}
    </div>
  )
}
