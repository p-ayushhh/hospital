import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import DoctorsSection from './components/DoctorsSection'
import PaymentSection from './components/PaymentSection'
import AmbulanceSection from './components/AmbulanceSection'
import EmployeesSection from './components/EmployeesSection'
import Footer from './components/Footer'
import FoodPage from './pages/FoodPage'
import AppointmentPage from './pages/AppointmentPage'
import HistoryPage from './pages/HistoryPage'
import AdminPage from './pages/AdminPage'

type Page = 'main' | 'food' | 'appointment' | 'history' | 'admin'

export default function App() {
  const [page, setPage] = useState<Page>('main')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const p = params.get('page')
    if (p === 'food') setPage('food')
    else if (p === 'appointment') setPage('appointment')
    else if (p === 'history') setPage('history')
    else if (p === 'admin') setPage('admin')
  }, [])

  const openFoodPage = () => {
    window.open(`${window.location.origin}${window.location.pathname}?page=food`, '_blank')
  }

  const openAppointmentPage = (doctorId?: string) => {
    const url = `${window.location.origin}${window.location.pathname}?page=appointment${doctorId ? `&doctorId=${doctorId}` : ''}`
    window.open(url, '_blank')
  }

  const openHistoryPage = () => {
    window.open(`${window.location.origin}${window.location.pathname}?page=history`, '_blank')
  }

  if (page === 'food') return <FoodPage />
  if (page === 'appointment') return <AppointmentPage />
  if (page === 'history') return <HistoryPage />
  if (page === 'admin') return <AdminPage />

  return (
    <div className="min-h-screen bg-white">
      <Navbar onFoodClick={openFoodPage} onAppointmentClick={() => openAppointmentPage()} onHistoryClick={openHistoryPage} />
      <main>
        <Hero onAppointmentClick={() => openAppointmentPage()} />
        <Services />
        <DoctorsSection onBookAppointment={openAppointmentPage} />
        <PaymentSection />
        <AmbulanceSection />
        <EmployeesSection />
      </main>
      <Footer onFoodClick={openFoodPage} onAppointmentClick={() => openAppointmentPage()} />
    </div>
  )
}
