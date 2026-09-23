import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export interface AppointmentRecord {
  appointmentId: string
  doctorId: string
  doctorName: string
  specialization: string
  appointmentDate: string
  appointmentTime: string
  bookingDate: string
  consultationFee: number
  status: 'Confirmed' | 'Completed' | 'Cancelled'
  paymentStatus: 'Pending' | 'Paid'
  transactionId?: string
  patientName: string
  patientPhone: string
  patientEmail: string
}

export interface TransactionRecord {
  transactionId: string
  appointmentId: string
  patientName: string
  amount: number
  paymentMethod: string
  paymentDate: string
  status: 'Success' | 'Failed'
  doctorName: string
  service: string
}

export interface FoodOrderItem {
  id: string
  name: string
  qty: number
  price: number
}

export interface FoodOrderRecord {
  orderId: string
  items: FoodOrderItem[]
  totalAmount: number
  orderDate: string
  orderTime: string
  patientName: string
  roomNumber: string
  phone: string
  notes: string
  status: 'Placed' | 'Preparing' | 'Delivered' | 'Cancelled'
  paymentStatus: 'Pending' | 'Paid'
  transactionId?: string
}

export interface FoodTransactionRecord {
  transactionId: string
  orderId: string
  patientName: string
  amount: number
  paymentMethod: string
  paymentDate: string
  status: 'Success' | 'Failed'
}

export interface FoodCategoryTiming {
  startTime: string
  endTime: string
  enabled: boolean
}

export type FoodCategoryKey = 'Morning Breakfast' | 'Afternoon Food' | 'Snack Food' | 'Dinner Food'

export type FoodTimings = Record<FoodCategoryKey, FoodCategoryTiming>

const defaultTimings: FoodTimings = {
  'Morning Breakfast': { startTime: '07:00', endTime: '10:30', enabled: true },
  'Afternoon Food': { startTime: '12:00', endTime: '15:00', enabled: true },
  'Snack Food': { startTime: '16:00', endTime: '18:00', enabled: true },
  'Dinner Food': { startTime: '19:00', endTime: '22:00', enabled: true },
}

interface AppContextType {
  appointments: AppointmentRecord[]
  transactions: TransactionRecord[]
  foodOrders: FoodOrderRecord[]
  foodTransactions: FoodTransactionRecord[]
  foodTimings: FoodTimings
  addAppointment: (a: AppointmentRecord) => void
  addTransaction: (t: TransactionRecord) => void
  addFoodOrder: (o: FoodOrderRecord) => void
  addFoodTransaction: (t: FoodTransactionRecord) => void
  updateFoodTimings: (timings: FoodTimings) => void
  updateAppointmentPayment: (appointmentId: string, transactionId: string) => void
  updateFoodOrderPayment: (orderId: string, transactionId: string) => void
  isCategoryAvailable: (category: FoodCategoryKey) => boolean
}

const AppContext = createContext<AppContextType | null>(null)

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback } catch { return fallback }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => load('cw_appointments', []))
  const [transactions, setTransactions] = useState<TransactionRecord[]>(() => load('cw_transactions', []))
  const [foodOrders, setFoodOrders] = useState<FoodOrderRecord[]>(() => load('cw_foodOrders', []))
  const [foodTransactions, setFoodTransactions] = useState<FoodTransactionRecord[]>(() => load('cw_foodTransactions', []))
  const [foodTimings, setFoodTimings] = useState<FoodTimings>(() => load('cw_foodTimings', defaultTimings))

  useEffect(() => { localStorage.setItem('cw_appointments', JSON.stringify(appointments)) }, [appointments])
  useEffect(() => { localStorage.setItem('cw_transactions', JSON.stringify(transactions)) }, [transactions])
  useEffect(() => { localStorage.setItem('cw_foodOrders', JSON.stringify(foodOrders)) }, [foodOrders])
  useEffect(() => { localStorage.setItem('cw_foodTransactions', JSON.stringify(foodTransactions)) }, [foodTransactions])
  useEffect(() => { localStorage.setItem('cw_foodTimings', JSON.stringify(foodTimings)) }, [foodTimings])

  const addAppointment = (a: AppointmentRecord) => setAppointments(p => [a, ...p])
  const addTransaction = (t: TransactionRecord) => setTransactions(p => [t, ...p])
  const addFoodOrder = (o: FoodOrderRecord) => setFoodOrders(p => [o, ...p])
  const addFoodTransaction = (t: FoodTransactionRecord) => setFoodTransactions(p => [t, ...p])
  const updateFoodTimings = (timings: FoodTimings) => setFoodTimings(timings)

  const updateAppointmentPayment = (appointmentId: string, transactionId: string) =>
    setAppointments(p => p.map(a => a.appointmentId === appointmentId ? { ...a, paymentStatus: 'Paid' as const, transactionId } : a))

  const updateFoodOrderPayment = (orderId: string, transactionId: string) =>
    setFoodOrders(p => p.map(o => o.orderId === orderId ? { ...o, paymentStatus: 'Paid' as const, transactionId } : o))

  const isCategoryAvailable = (category: FoodCategoryKey) => {
    const t = foodTimings[category]
    if (!t.enabled) return false
    const now = new Date()
    const cur = now.getHours() * 60 + now.getMinutes()
    const [sh, sm] = t.startTime.split(':').map(Number)
    const [eh, em] = t.endTime.split(':').map(Number)
    return cur >= sh * 60 + sm && cur <= eh * 60 + em
  }

  return (
    <AppContext.Provider value={{
      appointments, transactions, foodOrders, foodTransactions, foodTimings,
      addAppointment, addTransaction, addFoodOrder, addFoodTransaction,
      updateFoodTimings, updateAppointmentPayment, updateFoodOrderPayment, isCategoryAvailable,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
