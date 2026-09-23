import { useState } from 'react'
import { employees } from '../data/hospitalData'

export default function EmployeesSection() {
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('All')

  const departments = ['All', ...Array.from(new Set(employees.map(e => e.department)))]
  const filtered = employees.filter(e => {
    const matchDept = deptFilter === 'All' || e.department === deptFilter
    const matchSearch = search === '' || e.name.toLowerCase().includes(search.toLowerCase()) || e.designation.toLowerCase().includes(search.toLowerCase())
    return matchDept && matchSearch
  })

  return (
    <section id="employees" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Our Team</span>
          <h2 className="font-display text-primary text-4xl lg:text-5xl mt-2 mb-4">Hospital Staff Directory</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Meet the dedicated professionals who keep CareFirst running — from administration to clinical support.</p>
        </div>

        {/* Search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              placeholder="Search by name or designation..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${deptFilter === dept ? 'bg-primary text-white' : 'bg-surface text-gray-600 hover:bg-primary/10 hover:text-primary'}`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(emp => (
            <div key={emp.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-accent/30 transition-all duration-300 overflow-hidden">
              <div className="relative">
                <img src={emp.photo} alt={emp.name} className="w-full h-44 object-cover object-top" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {emp.status === 'Active' ? '● Active' : '● On Leave'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-accent font-bold tracking-wide mb-0.5 font-mono">{emp.id}</p>
                <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{emp.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{emp.designation}</p>
                <div className="space-y-1.5 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span>🏥</span><span>{emp.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎓</span><span>{emp.qualification}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📅</span><span>Joined {new Date(emp.joiningDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📞</span><a href={`tel:${emp.contact}`} className="text-primary hover:underline">{emp.contact}</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-medium">No staff members found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  )
}
